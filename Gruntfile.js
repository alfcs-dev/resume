'use strict()';
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  grunt.initConfig({
    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      build: {
        expand: true,
        src: ['src/**/*.js', '!App/**/*.spec.js'],
        dest: '.tmpjs/',
        ext: '.annotated.js',
        extDot: 'last',
      },
    },
    concat: {
      options: {
        separator: '\n',
        stripBanners: 'false'
      },
      dev: {
        files: {
          'dist/js/app.min.js': ['.tmpjs/src/js/app.module.annotated.js',
            '.tmpjs/src/js/app.config.annotated.js',
            '.tmpjs/src/js/**/*.annotated.js'
          ]
        }
      }
    },
    uglify: {
      vendor: {
        files: {
          'dist/js/vendor.js': [require('wiredep')().js]
        }
      },
      vendorProd: {
        files: {
          'html/dist/js/vendor.js': [require('wiredep')().js]
        }
      },

      build: {
        files: {
          'html/dist/js/app.min.js': ['.tmpjs/src/js/app.module.annotated.js',
            '.tmpjs/src/js/app.config.annotated.js',
            '.tmpjs/src/js/**/*.annotated.js'
          ]
        }
      }
    },
    sass: {
      dist: {
        files: {
          '.tmpcss/styles.css': "src/sass/styles.scss"
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*\n <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      dist: {
        files: {
          'dist/css/styles.min.css': ['.tmpcss/styles.css']
        }
      },
      prod: {
        files: {
          'html/dist/css/styles.min.css': ['.tmpcss/styles.css']
        }
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/views',
          src: '**/*.html',
          dest: 'dist/views'
        }]
      },
      prod: {
        files: [{
          expand: true,
          cwd: 'src/views',
          src: '**/*.html',
          dest: 'html/dist/views'
        }]
      }
    },
    imagemin: {
      dev: {
        files: [{
          expand: true,
          src: '**/*',
          cwd: 'src/img',
          dest: 'dist/img'
        }]
      },
      prod: {
        files: [{
          expand: true,
          src: '**/*',
          cwd: 'src/img',
          dest: 'html/dist/img'
        }]
      }
    },
    clean: {
      all: ['.tmpjs', '.tmpcss'],
      js: ['.tmpjs'],
      css: ['.tmpcss'],
    },
    connect: {
      run: {
        options: {
          port: 9011,
          keepalive: true
        }
      },
      build: {
        options: {
          port: 9011,
          open: true
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['js']
      },
      css: {
        files: ['src/sass/**/*.scss', '!.sass-cache/**/*.scssc'],
        tasks: ['css']
      },
      html: {
        files: ['src/views/**/*.html'],
        tasks: ['htmlmin']
      },
      locales: {
        files: ['src/resources/translations/*.json'],
        tasks: ['copy:locales']
      }
    },
    copy: {
      locales: {
        files: [{
          expand: true,
          src: ['resources/translations/*.json'],
          dest: 'dist/',
          cwd: 'src'
        }]
      },
      resourceProd: {
        files: [{
          expand: true,
          src: ['resources/translations/*.json'],
          dest: 'html/dist/',
          cwd: 'src'
        }, {
          src: ['index.html'],
          filter: 'isFile',
          dest: 'html/'
        }]
      }

    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('js', ['ngAnnotate', 'concat:dev', 'clean:js']);
  grunt.registerTask('jsProd', ['ngAnnotate', 'uglify:vendorProd', 'uglify:build', 'clean:js']);
  grunt.registerTask('css', ['sass', 'cssmin:dist', 'clean:css']);
  grunt.registerTask('cssProd', ['sass', 'cssmin:prod', 'clean:css']);
  grunt.registerTask('default', ['uglify:vendor', 'js', 'css', 'htmlmin:build',
    'imagemin:dev', 'connect:build', 'watch'
  ]);
  grunt.registerTask('prod', ['jsProd', 'cssProd', 'htmlmin:prod', 'imagemin:prod', 'copy:resourceProd']);
};