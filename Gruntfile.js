module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
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
            all: [
                'Gruntfile.js',
                'src/*.js',
                'tests/specs/*Spec.js'
            ],
            options: {
                expr: true,
                node: true
            }
        },
        jasmine: {
            src: [
                'src/**/*.js'
            ],
            options: {
                specs: 'tests/specs/*Spec.js',
                vendor: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
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