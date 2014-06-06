/*!
 * Simple Slideshow - v0.1.4
 * http://ryanwalters.github.io/simple-slideshow
 *
 * Copyright (c) 2014 Ryan Walters <shout@ryanwalters.co>
 * Licensed under the MIT License
 */

;(function ($, window, document, undefined) {
    'use strict';

    var pluginName = 'slideshow',
        defaults = {
            delay: 4000,    // delay between slides in ms; 0 = off
            height: null,   // if set, overrides ratio
            pause: true,    // pause on hover
            ratio: 0.5625,  // width:height ratio; 1600x900 assumed
            speed: 400,     // default slide speed in ms
            startSlide: 0   // 0-based; e.g. 0 is the first slide
        };

    function Slideshow(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._init();
    }

    $.extend(Slideshow.prototype, {
        _init: function () {

            // Create the necessary DOM elements and classes

            $(this.element).toggleClass('ui-slideshow', true)
                .wrap('<div class="ui-slideshow-wrapper" />')
                .children().not('nav').toggleClass('ui-slide', true)
                .siblings('nav').toggleClass('ui-controls', true);

            // Local vars

            var $controls = $('.ui-controls'),
                $slides = $('.ui-slide'),
                $slideshow = $('.ui-slideshow'),
                $wrap = $('.ui-slideshow-wrapper'),
                currentSlide = this.options.startSlide,
                length = $slides.length,
                options = this.options,
                resizeTimeout,
                slideInterval,
                width = 0;

            // Add controls to the slideshow

            if ($controls.length === 0 || $controls.is(':empty')) {
                if ($controls.length === 0) $controls = $('<nav class="ui-controls" />');
                for (var i = 0; i < length; i++) {
                    $controls.append('<div class="ui-control default" />');
                }
            } else {
                $controls.children().toggleClass('ui-control', true);
            }

            $controls.insertAfter($slideshow);

            // Initial setup

            var _setup = function () {
                _stopInterval();
                width = $wrap.width();
                $wrap.height(options.height || width * options.ratio);
                $slideshow.width(width * length);
                $slides.width(width);
                $controls.width(width).children().eq(currentSlide).trigger('click');
                _startInterval();
            };

            // Slide timing functionality

            var _startInterval = function () {
                if (options.delay > 0) {
                    slideInterval = window.setInterval(function () {
                        currentSlide < length - 1 ? currentSlide++ : currentSlide = 0;
                        $controls.children().eq(currentSlide).trigger('click');
                    }, options.delay);
                }
            };

            var _stopInterval = function () {
                if (options.pause) window.clearInterval(slideInterval);
            };    // Events

            // Navigate slides

            $controls.children().on('click', function () {
                var $this = $(this),
                    idx = $this.index(),
                    left = idx * width * -1;
                $.support.transition ?
                    $slideshow.css({ 'left': left, 'transition': options.speed + 'ms all' }) :
                    $slideshow.animate({ 'left': left }, options.speed);
                $controls.children().toggleClass('active', false);
                $this.toggleClass('active', true);
                currentSlide = idx;
            });

            // Start/stop slide delay

            $wrap.on({
                'mouseover': _stopInterval,
                'mouseout': _startInterval
            });

            // Resize the show when window does

            $(window).on('resize', function () {
                window.clearTimeout(resizeTimeout);
                resizeTimeout = window.setTimeout(_setup, 250);
            });

            // Navigate on swipe (works alongside ryanwalters/simple-swipes)

            $wrap.on('swipe', function (e) {
                if (e.originalEvent.detail.direction === 'LEFT') ++currentSlide >= length ? currentSlide = 0 : null;
                else if (e.originalEvent.detail.direction === 'RIGHT') --currentSlide < 0 ? currentSlide = length - 1 : null;
                $controls.children().eq(currentSlide).trigger('click');
            });

            // Run setup the first time

            _setup();

        }
    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Slideshow(this, options));
            }
        });
    };

    // Detect transition support

    $.support.transition = (function(){
        var b = document.body || document.documentElement, s = b.style;
        return s.transition !== undefined || s.WebkitTransition !== undefined || s.MozTransition !== undefined || s.MsTransition !== undefined || s.OTransition !== undefined;
    })();

})(jQuery, window, document);