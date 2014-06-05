describe('Slideshow', function () {
    jasmine.getFixtures().fixturesPath = 'fixtures/';

    var $slideshow;

    beforeEach(function () {
        loadFixtures('slideshow.html');
        $slideshow = $('.slideshow-1');
    });

    it('should be in the DOM', function () {
        $slideshow.slideshow();
        expect($('.ui-slideshow-wrapper')).toBeInDOM();
    });

    it('should have a height of 400px', function () {
        $slideshow.slideshow({ height: 400 });
        expect($slideshow).toHaveCss({ height: '400px' });
    });

});