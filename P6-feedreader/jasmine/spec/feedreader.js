/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    var body = $('body');
    var feed = $('.feed');
    var entry = $('.entry');

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         /* Added testing for valid url */
         it('all feed item urls are defined, url not empty, and valid url string', function(){
            // http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url
            // https://gist.github.com/searls/1033143
            // regex for valid url from above two links
            var urlCheck = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

            allFeeds.map( function(item){
                expect(item.url).toBeDefined();
                expect(item.url).toBeTruthy();
                expect(urlCheck.exec(item.url)).not.toBeNull();
            });
         });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('all feed item names are defined and not empty', function(){
            allFeeds.map(function(item){
                expect(item.name).toBeDefined();
                expect(item.name).toBeTruthy();
            });
         });
    });


    /* Write a new test suite named "The menu" */
    describe("The menu", function(){
        var icon = $('.menu-icon-link');
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function(){
            expect(body.hasClass('menu-hidden')).toBeTruthy();
         });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('is seen when menu icon is clicked and hides on clicking again', function(){
            icon.click();//menu should be seen now
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            icon.click();//menu should disappear now
            expect(body.hasClass('menu-hidden')).toBeTruthy();
          });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
                loadFeed(0, function(){
                    done();
                });
         });
         it('should have at least one .entry within the .feed container', function(done){
            expect(feed.children(entry).length).toBeGreaterThan(0);
            done();
         });
    });

    /* Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         var origContent,
            newContent;
         beforeEach(function(done){
                loadFeed(0, function(){
                    origContent = feed.first(entry).html();
                    loadFeed(1,function(){
                        newContent = feed.first(entry).html();
                        done();
                    });
                });
         });
         it('should change content of feed entry', function(done){
            expect(origContent).not.toEqual(newContent);
            done();
         });
    });
}());
