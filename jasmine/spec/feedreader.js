/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against  application.
 */
/* We're placing all tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is  first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in  application.
     */
    describe('RSS Feeds', function() {
        /* This is  first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* it tests the each feed
         * in the allFeeds object to make sure that feed has a URL defined
         * and that the URL is not empty.
         */
        it('all URLs are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* it tests the each feed
         * in the allFeeds object to make sure that feed has a name defined
         * and that the name is not empty.
         */
        it('a name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });     
    });

    /* This suite is all about the menu. 
     */
    describe('The menu', function() {
        /* This test ensures that the menu element is
         * hidden by default.
         */
        it('is hidden', function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

        /* This test ensures that  the menu changes
         * visibility when the menu icon is clicked. This test
         * have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
            menuIcon.click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
    });

    /* This suite is all about the Initial Entries. 
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test ensures that  when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('has at least 1 entry in feed container', function() {
            expect($('.feed').children().length).not.toBe(0);
        });
    });

    /* This suite is all about the "New Feed Selection"
     */
    describe('New Feed Selection', function() {
        var html0, html1;
        beforeEach(function(done) {
            loadFeed(0, function() {
                html0 = $('.feed').html();
                loadFeed(1, function() {
                    html1 = $('.feed').html();
                    done();
                });
            });
        });
        
        /* This test ensures that  when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('the content actually changes', function(done) {
            expect(html0).not.toBe(html1);
            done();
        });
    });
}());