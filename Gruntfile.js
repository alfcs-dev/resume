'use strict';
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
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
      build: {
        files: {
          'dist/js/app.min.js': ['.tmpjs/src/js/app.module.annotated.js',
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
      }
    },
    clean: {
      all: ['.tmpjs', '.tmpcss']
    },
    connect: {
      server: {
        options: {
          port: 9001,
          keepalive: true
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
        files: ['resources/languages/**/**/*.json',
          '!resources/languages/locale-es_DO.json'
        ],
        tasks: ['concat:locales', 'copy:devLang', 'beep:3']
      }
    },
  });
  grunt.registerTask('js', ['ngAnnotate', 'concat:dev', 'clean']);
  grunt.registerTask('css', ['sass', 'cssmin', 'clean']);
}
