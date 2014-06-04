'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: ['src/*.css'],
                dest: 'dist/slideshow.min.css'
            },
            js: {
                src: ['src/*.js'],
                dest: 'dist/slideshow.min.js'
            }
        },
        cssmin: {
            css: {
                src: 'dist/slideshow.min.css',
                dest: 'dist/slideshow.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/slideshow.min.js': ['dist/slideshow.min.js']
                }
            },
            options: {
                report: 'gzip'
            }
        },
        watch: {
            files: ['src/*'],
            tasks: ['concat', 'cssmin', 'uglify']
        },
        jshint: {
            all: ['src/*.js'],
            options: {
                expr: true
            }
        },
        jasmine: {
            src: [
                'src/**/*.js'
            ],
            options: {
                specs: 'tests/specs/SlideshowSpec.js',
                vendor: [
                    'node_modules/jquery/dist/jquery.js',
                    //'node_modules/jasmine-jquery/lib/jasmine-jquery.js' // won't work until jasmine-jquery@>=2
                    '//cdn.rawgit.com/velesin/jasmine-jquery/2.0.3/lib/jasmine-jquery.js'
                ],
                styles: 'src/**/*.css',
                outfile: 'tests/SpecRunner.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['concat', 'cssmin', 'uglify']);
    grunt.registerTask('test', ['jshint', 'jasmine']);
};