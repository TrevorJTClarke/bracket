var fs = require('fs');

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            main: {
                src: [
                    'src/**/*.js'
                ],
                options: {
                    specs: 'tests/**/*.js',
                    outfile: 'tests/specs.html',
                    keepRunner: true
                }
            }
        },
        sass: {
            main: {
                files: {
                    'dist/css/bracket.css': 'public/css/main.scss'
                }
            }
        },
        concat: {
            main: {
                src: [
                    'config/start.js',
                    'public/js/**/*.js',
                    'config/end.js'
                ],
                dest: 'dist/js/bracket.js'
            }
        },
        watch: {
            sass: {
                files: [
                    'public/css/**/*.scss'
                ],
                tasks: ['sass']
            },
            concat: {
                files: [
                    'public/js/**/*.js'
                ],
                tasks: ['concat']
            }
        }
    });

    // test the codes
    grunt.registerTask('test', [
        // 'jasmine'
    ]);

    grunt.registerTask('dev', [
        'sass',
        'concat',
        'watch',
        // 'jasmine'
    ]);
};