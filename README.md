# Simple Slideshow [![Build Status](https://travis-ci.org/ryanwalters/simple-slideshow.svg?branch=master)](https://travis-ci.org/ryanwalters/simple-slideshow)

A tiny jQuery slideshow plugin (466 bytes gzipped!).

###Usage:

`$('.slideshow').slideshow(options);`

    options = {
        delay: 0,       // delay between slides in ms; 0 = off
        height: null,   // if set, overrides ratio
        pause: true,    // pause on hover
        ratio: 0.5625,  // width:height ratio; 1600x900 assumed
        speed: 400,     // default slide speed in ms
        startSlide: 0   // 0-based; e.g. 0 is the first slide
    }

###Demo:

- http://ryanwalters.github.io/simple-slideshow

###Author:

- Ryan Walters
- http://ryanwalters.co