module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    'public/css/lib/*'
                ],
                dest: 'public/css/style.css'
            },
            js: {
                src: [
                    'public/components/lib/jquery/jquery.js',
                    'public/components/lib/underscore/underscore.js',
                    'public/components/lib/bootstrap/dist/js/bootstrap.js',
                    'public/components/lib/backbone/backbone.js'
                ],
                dest: 'public/js/main.js'
            }
        },
        cssmin: {
            css: {
                src: [
                	'public/components/lib/bootstrap/dist/css/bootstrap.css',
                	'public/css/lib/*.css'
                ],
                dest: 'public/css/style.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'public/js/main.min.js': ['public/js/main.js']
                }
            }
        },
        watch: {
    		files: ['public/css/lib/*', 'public/js/lib/*'],
      		tasks: ['concat', 'cssmin', 'uglify']
   		}
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    //Defualt
    grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);
    //CSS
    grunt.registerTask('css', ['concat:css','cssmin:css']);
    //JS
    grunt.registerTask('js', ['concat:js','uglify:js']);
};