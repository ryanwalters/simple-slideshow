describe('Slideshow', function () {
    var fixture;

    beforeEach(function () {
        fixture = $('<div>Hello world!</div>');
    });

    it('should use an inline fixture', function () {
        expect(fixture).toContainHtml('Hello world!');
    });

});