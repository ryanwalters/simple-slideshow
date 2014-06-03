'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: ['src/*'],
                dest: 'dist/slideshow.min.css'
            },
            js: {
                src: ['src/*'],
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
            }
        },
        watch: {
            files: ['src/*'],
            tasks: ['concat', 'cssmin', 'uglify']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['concat:css', 'concat:js', 'cssmin:css', 'uglify:js']);
};