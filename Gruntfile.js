module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        htmlmin: {
          dist: {
            options: {

            },
            files: [{
              src: ['**/*.html', 'partials/**/*.html'],
              dest: 'dest/'
            }]
          }
        },
        less: {
            development: {
                options: {
                    paths: ["css/*.css"]
                },
                files: {
                    "css/style.css": "css/*.less"
                }
            }
        },
        concat: {
            js: {

                src: ['js/libs/jquery-1.11.2.js','js/libs/bootstrap-3.3.2-dist.js','js/libs/angular-1.4.0.js','js/libs/angular-ui-router.js','js/controllers.js'], 
                dest: '_temp/deletable/<%= pkg.name %>.js'
            },
            css: {
                src: 'css/*.css',
                dest: '_temp/deletable/<%= pkg.name %>.css'
            }
        }, 
        cssmin: {
            add_banner: {
                options: {
                    banner: '/* My minified css file */'
                },
                files: {
                    'dest/css/style.min.css': ['_temp/deletable/<%= pkg.name %>.css']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dest: {
                files: {
                    'dest/js/app.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        watch: {
            files: ['css/**/*.less', 'css/**/*.css','js/**/*.js','*.html'],
            tasks: ['newer:less', 'newer:concat', 'newer:htmlmin', 'newer:uglify', 'cssmin'],
            livereload: {
                options: { livereload: true },
                files: ['dest/**/*.html','dest/**/*.css','dest/**/*.js'],
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['newer:less', 'newer:concat', 'newer:htmlmin', 'newer:uglify', 'cssmin']);
    grunt.registerTask('watchme', ['watch']);
};

/*
1. "newer:less"       -> Converting LESS file to CSS in folder /css;
2. "newer:concat"     -> Concatenating the JS and CSS files to only 1 file each, from folder /js and /css, and sending them to folder dest/deletable;
3. "newer:htmlmin"    -> Minifying the .html files and send them to folder /dest;
4. "newer:uglify"     -> Minifying the JS files from folder dest/deletable to folder dest/js;
5. "cssmin"           -> Minifying the tidy CSS file; 

WATCH: will monitor for changes in all the files mentioned in the watch task, and will execute some task when changes were made to the monitored files;
NEWER: will only trigger a grunt task if the source file is newer than the destination files;
*/