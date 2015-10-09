var bouncingMarker = null;
var map;
var infoWnd;

$(document).ready(function(){
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);
});

// A google map object
var gMap = function(center){
    //var self = this; removed as per code review
    var mapOptions = {
        zoom: 10,
        center: center
        };
    element =  $('#map')[0];
    map = new google.maps.Map(element,mapOptions);
    return map;
};//added semicolon as per code review

// A single location object
var Location = function(name,phone,website,address,coordinates,provider){
	this.name = ko.observable(name);
	this.phone = ko.observable(phone);
	this.website = ko.observable(website);
    this.address = ko.observable(address);
	this.coordinates = ko.observable(coordinates);
	this.provider = ko.observable(provider); //this is yelp, meetup etc.
};

// One neighborhood search object
var HoodSearch = function(zipCode, searchStr){
	var self = this;
	self.zipCode = ko.observable(zipCode);
	self.searchStr = ko.observable(searchStr);
    //the locations in this neighbourhood for this search
    //will contain an array of Locations
    //placeholder for locations
	self.locations = ko.observableArray([]);
	//self.latLng = '';//will contain the google latLng object
};

// our main view model
var ViewModel = function(){
	var self = this;
    var markers = ko.observableArray([]);
    var center = new google.maps.LatLng(37.253, -122.051); // 95070
    //variable to track state of zipCode and searchStr
    var hasChanged = false;
    infoWnd = new google.maps.InfoWindow();


    self.init = function(){
        map = gMap(center);
        // event listener for resize window
        google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });

        //initiate the first model - default settings
        self.hoodSearch = new HoodSearch('95070','books');

        //subscribe to changes in zipCode and searchStr, track in hasChanged
        // http://stackoverflow.com/questions/13306415/previous-value-of-observable-variable
        self.hoodSearch.searchStr.subscribe(setHasChanged, self, "beforeChange");
        self.hoodSearch.zipCode.subscribe(setHasChanged, self, "beforeChange");

        // get yelp search results
        getYelpData(self.hoodSearch);
    };

    //Check if google maps loaded. if not show an error
    //http://stackoverflow.com/questions/9228958/how-to-check-if-google-maps-api-is-loaded
    if (typeof google !== 'object' || typeof google.maps !== 'object') {
        $('#search-summary').text("Could not load Google Maps API");
    }
    else{
        //console.log('loaded fine');
    }

    //function to set the hasChanged variable which tracks changes in search terms
    var setHasChanged = function(){
        hasChanged = true;
    };

    //convert address to latlng - geocode address
    var googleGeoCodeAddress = function(map){
        var geoBaseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="+self.hoodSearch.zipCode()+"&key=AIzaSyBzuACUkJySquLnpuEBXe51AUgfoF8x3FY";
        $.ajax(geoBaseUrl).done(function(data){
            center = data.results[0].geometry.location;
            map.panTo(center);
        });
    };

	//function to update model
	var updateModel = function(obj){
		self.hoodSearch = obj;
		//console.log('Updated the model');
        addMarkersToMap();
	};

	//function to initiate a new view when zip or search change and submit button was hit
	this.updateHoodSearch = function(){
		// check if search params have actually changed or if submit was hit jlt
        //changed to strict equality operator as per code review
		if (hasChanged === true){	//some param changed
            //convert zipcode to latlng and move map there
            googleGeoCodeAddress(map);
            if (infoWnd) {
                infoWnd.close();
            }
            //clear bouncing marker
            bouncingMarker = null;
            //clear old locations
            self.hoodSearch.locations(null);
            //delete all the markers
            deleteMarkers();
            //redo the yelp search to get new list
			getYelpData(self.hoodSearch);
			hasChanged = false;
		}
		else{
			//params not changed - ignore
			console.log('Ignoring submit - params not changed');
		}
	};

    //function for yelp callback given zip code and search string
	//from https://forum.jquery.com/topic/hiding-oauth-secrets-in-jquery
	var getYelpData = function (obj){
		var auth={
			consumerKey: 'NfTfKiQ-p4yTBPabsgUaaw',
			consumerSecret: 'tKyDFmQuhQ08ZXXgXjym3VTrQSU',
			accessToken: 'xl64BB_BCPqzf9RpuNu_XaWexw8k7kz1',
			accessTokenSecret:'bu3L4T7SBMJa0K_PDHUu93DyqcI',
			serviceProvider: {
				signatureMethod: "HMAC-SHA1"
			}
		};
		var terms = obj.searchStr();
		var near = obj.zipCode() ;
        var limit = 10;
		var accessor = {
			consumerSecret: auth.consumerSecret,
			tokenSecret: auth.accessTokenSecret
		};
		parameters = [];
		parameters.push(['term', terms]);
        parameters.push(['limit', limit]);

		parameters.push(['location', near]);

		parameters.push(['callback', 'cb']);
		parameters.push(['oauth_consumer_key', auth.consumerKey]);
		parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
		parameters.push(['oauth_token', auth.accessToken]);
		parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
		var message = {
			'action': 'http://api.yelp.com/v2/search',
			'method': 'GET',
			'parameters': parameters
		};
		OAuth.setTimestampAndNonce(message);
		OAuth.SignatureMethod.sign(message, accessor);
		var parameterMap = OAuth.getParameterMap(message.parameters);
		parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

		var yelpTimeout = setTimeout(function(){
			//console.log("Can't reach yelp currently.");
            $('.pure-menu-heading').html('<h2>Sorry! Cannot load yelp data</h2>'); //added semicolon as per code review
		},8000);

		$.ajax({
			'url': message.action,
			'data': parameterMap,
			'cache': true,
			'dataType': 'jsonp',
			'jsonpCallback': 'cb',
			'success': function(data){
				//clear error timeout
				clearTimeout(yelpTimeout);
				//call function to parse the data into usable form
				parseYelpData(data.businesses,obj);
			}
		});
	};

	//Parse the yelp data in data.businesses object into locations
	var parseYelpData = function(data,obj){
		var locs=[];
		data.forEach(function(value){
			var name = value.name;
			var phone = value.phone;
			var website = value.url;
			var address = value.location.display_address;
			var coordinates = value.location.coordinate;
			var provider = 'Yelp';
			var g = new Location(name,phone,website,address,coordinates,provider);
			locs.push(g);
		});
		obj.locations(locs);
		//update the model with new locations
		updateModel(obj);
	};

    var addMarkersToMap = function(){
        var items = self.hoodSearch.locations();
        for (var item in items){
            var that = items[item];
            if ( items[item].provider() == 'Yelp'){
                var image = {
                    url: "http://yelp-images.s3.amazonaws.com/assets/map-markers/annotation_48x64.png",
                    scaledSize: new google.maps.Size(18,24)//(24, 32)
                }
            } //removed semicolon as per code review
            nmarker = new google.maps.Marker({
                map:map,
                title:that.name(),
                animation: google.maps.Animation.DROP,
                icon: image,
                position: new google.maps.LatLng(that.coordinates().latitude,that.coordinates().longitude),
                website: that.website(),
                address: that.address(),
                phone: that.phone(),
                provider: that.provider()
            });
            //add listener to make the marker bounce when clicked on it
            nmarker.addListener('click',function(){
                e = this;
                markerBounce(e);
                showInfo(e);
            });
            markers.push(nmarker);
        }
    };

    //bouncing marker - http://stackoverflow.com/questions/8247626/bouncing-marker
    function markerBounce(mark){
        console.log("Hi! I was clicked. My name is "+ mark.title);
        console.log(mark.title);
        if (bouncingMarker)
            bouncingMarker.setAnimation(null);
        if (bouncingMarker != mark) {
            mark.setAnimation(google.maps.Animation.BOUNCE, mark);
            setTimeout(function (){
                mark.setAnimation(null);
            },(1400)); //stop after 2 bounces
            bouncingMarker = mark;
        }
        else
            bouncingMarker = null;
    }

    // show infowindow with store name and website link
    var showInfo = function(mark){
        var infoContent = '<a href="'+mark.website+'">'+mark.title+'</a><br>';
        if (this.phone)
            infoContent += 'Ph: '+ mark.phone.substr(0,3) +'-'+ mark.phone.substr(3,3) +'-'+ mark.phone.substr(6,4) +'<br>';

        infoContent += mark.address[0]+'<br>'+mark.address[1];
        infoWnd.setContent(infoContent);
        infoWnd.open(map,mark);
    };

    var clearMarkers = function() {
        setMapOnAll(null);
    }; //added semicolon as per code review

    var deleteMarkers = function(){
        clearMarkers();
    };

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers().length; i++) {
            markers()[i].setMap(map);
        }
    };

    self.currentFilter = ko.observable();
    self.filter = function(){
        self.currentFilter(this.name());
    };

    self.filterLocation = ko.computed(function(){
        if (!self.currentFilter()){
            //console.log('dont do anything');
        }
        else{
            console.log('do something');
            len = markers().length;
            for (var i=0, len = markers().length; i<len; i++){
                if ((markers()[i].title) == self.currentFilter()){
                    console.log('Match Found');
                    var a = markers()[i];
                    //console.log(a);
                    markerBounce(a);
                    showInfo(a);
                }
            }
        }
    });

	//initiate
	self.init();

};


	//yelp api for book stores - done
	//bibliocommons api for libraries -todo
	//meetup api for meetups - todo


