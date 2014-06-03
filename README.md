# Simple Slideshow

A 1.9KB slideshow plugin.

###Usage:

`$('.slideshow').slideshow(options);`

    options = {
        delay: 0,       // delay between slides; 0 = off
        height: null,   // if set, overrides ratio
        pause: true,    // pause on hover
        ratio: 0.5625,  // width:height ratio; 1600x900 assumed
        speed: 400,     // default slide speed in ms
        startSlide: 0   // 0-based; e.g. 0 is the first slide
    }

###Author:

- Ryan Walters
- http://ryanwalters.co