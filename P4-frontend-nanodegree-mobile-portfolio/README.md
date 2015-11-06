	Resources Used
	
	1. Translate3d - vs xy vs. CSS Left - https://jsperf.com/translate3d-vs-xy/4
	2. Added requestAnimationFrame when scrolling as per http://www.html5rocks.com/en/tutorials/speed/animations/
	3. FEND Office Hours - https://plus.google.com/events/c8eah6f0d0t9eretebpm7dqi0ok?authkey=CKaNhtb0quvqKA
	4. Udacity courses - Website Performance Optimization, Browser Performance Optimization
	5. Udacity Github repo - https://github.com/udacity/frontend-nanodegree-mobile-portfolio
	6. FEND Office Hour notes - https://github.com/udacity/fend-office-hours/tree/master/Web%20Optimization/Effective%20Optimizations%20for%2060%20FPS
	7. Sublime Text 3 package Minify - https://github.com/tssajo/Minify

	Optimizations Made 
	
	Part 1: Optimize PageSpeed Insights score for index.html
		1. Resized pizzeria.jpg
		2. Added async attribute to all JS external scripts
		3. Move the google analytics scripts to below the footer, both inline and external
		4. Removed Google Fonts
		5. Add media attributes to print stylesheet
		6. inlined style.css - critical styles
		7. Minified CSS, JavaScript, HTML

	Part 2: Optimize Frames per Second in pizza.html
		1. Change Pizza Sizes slider optimization as per the Browser Performance optimization course
	Lines 423 - 455
	 	a. removed determineDX function
	 	b. changed the changePizzaSizes to calculate the percent and just change the pizza width
	 	c. changed document.querySelectorAll to more efficient document.getElementsByClassName  
	 
		2. Scrolling optimizations
    		a. Added requestAnimationFrame when scrolling as per http://www.html5rocks.com/en/tutorials/speed/animations/
	Lines 485 - 500, 512-518, 548-550
    		b. Optimized the updatePositions function - Lines 508 - 536
	  	c. Added requestAnimationFrame - Lines 512-518
	  	d. moved DOM query outside the loop - Lines 491
	  	e. changed document.querySelectorAll to more efficient document.getElementsByClassName - Lines 518

Additional changes after submission as per code review
views/js/main.js
1. Line 444 - saved array length in a variable and using it in the for loop
2. Line 462 - moved the DOM query outside the for loop and saved it into a variable
4. Line 552 - moved variable declaration outside the loop
5. Line 559 - using translateX for consistency, as per code review
6. Lines 554, 564 - moving DOM query outside  loop and initializing local variable
7. Line 526 - Calculate the phases outside the loop
8. Line 530 - Fixed typo


views/css/style.css
Lines 37,38-   performance improvement - as per code review


## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>
