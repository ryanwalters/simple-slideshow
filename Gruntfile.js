'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: ['src/css/*'],
                dest: 'dist/slideshow.css'
            },
            js: {
                src: ['src/js/*'],
                dest: 'dist/slideshow.js'
            }
        },
        cssmin: {
            css: {
                src: 'dist/slideshow.css',
                dest: 'dist/slideshow.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/slideshow.min.js': ['dist/slideshow.js']
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['concat:css', 'concat:js', 'cssmin:css', 'uglify:js']);
};