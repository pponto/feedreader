/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /** 
         * Test each feed item in allFeeds object has a URL defined and is not empty.
         */
        it('URLs are defined', () => {
            allFeeds.forEach(feed => {
                const url = feed.url;
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            });
        });
        /**
         * Test each feed item has a name defined and is not empty.
         */
        it('names are defined', () => {
            allFeeds.forEach(feed => {
                const name = feed.name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            });
        });
    });


    /**
     * Test suite named "The menu".
     */
    describe('The Menu', () => {
        /**
         * Test that ensures the menu element is hidden by default.
         */
        /* Looking for a specific body class using jQuery's .hasClass */
        it('is hidden by default', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /**
         * Test that ensures the menu changes visibility when the menu icon is clicked.
         */
        it('is visible when clicked', () => {
            /* Use the same const from app.js */
            const menuIcon = $('.menu-icon-link');
            /* Click event */
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);;
        });
    });

    /**
     * Test suite named "Initial Entries".
     */
    describe('Initial Entries', () => {
        /* beforeEach and asynchronous done() function. */
        beforeEach((done) => {
            loadFeed(0, done);
        });
        /**
         * Test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
         */
        it('has at least one entry element', () => {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /**
     * Test suite named "New Feed Selection"
     */
    describe('New Feed Selection', () => {
        let feedOne,
            feedTwo;

        beforeEach((done) => {
            loadFeed(0, () => {
                /* current content */
                feedOne = $('.feed').html();
                loadFeed(1, () => {
                    /* new content */
                    feedTwo = $('.feed').html();
                    done();
                })
            })
        });

        /**
         * Test that ensures when a new feed is loaded by the loadFeed function that the content actually changes
         */
        it('is loaded when the content changes', () => {
            expect(feedOne).not.toEqual(feedTwo);
        });
    });

}());