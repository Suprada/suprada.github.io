Project Name: Udacity FEND Project 6 - Feed Reader Testing using Jasmine

# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.


# Tests Added

1. In "RSS Feeds " test suite -  test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty, and that the URL is valid
2. In "RSS Feeds " test suite -  test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
3. In "The Menu" test suite - a test that ensures the menu element is hidden by default.
4. In "The Menu" test suite - a test that ensures the menu changes visibility when the menu icon is clicked This test has two expectations: the menu should display when clicked and should hide when clicked again.
5. In "Initial Entries" test suite - a test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
6. In "New Feed Selection" test suite - a test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.

* How to Run

- Download or clone the repository
- open it in your browser locally. All needed Jasmine libraries are included
- You will see a section below the page showing the test results.

