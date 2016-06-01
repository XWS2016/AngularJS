module.exports = function(grunt) {

  var dirsConfig = {
      client:'client',
      dist:'dist',
      distClient:'dist/client',
      server:'server',
      bowerComponents:'bower_components',
      distBowerComponents:'dist/bower_components',
      testUnit:'test/unit',
      testE2E:'test/e2e'
    };

  grunt.initConfig({
    dirs: dirsConfig,

    jshint: {
      all: ['<%= dirs.client %>/**/*.js']
    },

    wiredep: {
      task: {
        src: ['<%= dirs.distClient %>/index.html'],
        ignorePath: '../'
      },
      test: {
        src: '<%= dirs.testUnit %>/karma.conf.js',
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },

    injector: {
      options: {
        transform: function (filepath) {
          function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
          }
          filepath = filepath.replace('/'+dirsConfig.distClient+'/','');
          if(endsWith(filepath,'.js')){
            return '<script src="'+filepath+'"></script>';
          }
          else if(endsWith(filepath,'.css')){
            return '<link rel="stylesheet" href="'+filepath+'">';
          }
          else if(endsWith(filepath,'.html')){
            return '<link rel="import" href="'+filepath+'">';
          }
        }
      },
      local_dependencies: {
        files: {
          '<%= dirs.distClient %>/index.html': ['<%= dirs.distClient %>/**/*.js', '<%= dirs.distClient %>/**/*.css']
        }
      }
    },

    clean: {
      server: [ '<%= dirs.server %>/client/','<%= dirs.server %>/bower_components/'],
      dist: ['<%= dirs.dist %>/'],
      client: {
        files: {src: ['<%= dirs.distClient %>/*','!<%= dirs.distClient %>/app.js','!<%= dirs.distClient %>/index.html']}
      }
    },

    copy: {
      prepare: {
        files: [
        {expand: true, cwd:'<%= dirs.client %>/', src: ['**/*'], dest: '<%= dirs.distClient %>'}
        ]
      },
      app:{
        files: [
        {expand: true, cwd:'<%= dirs.dist %>/', src: ['**/*'], dest: '<%= dirs.server %>/'}
        ]
      }
    },

    bower: {
      dev: {
        options: {
          expand: true
        },
        dest: '<%= dirs.distBowerComponents %>'
      }
    },

    uglify: {
      app: {
        files: {
          '<%= dirs.distClient %>/app.js': ['<%= dirs.distClient %>/**/*.js']
        }
      }
    },

    ngAnnotate: {
        dist: {
            files: [{
                    expand: true,
                    src: ['<%= dirs.client %>/**/*.js', '!/<%= dirs.client %>**/*.annotated.js'],
                    ext: '.js',
                    extDot: 'last'
                }],
        }
    },

    html2js: {
      options: {
        base: '<%= dirs.distClient %>',
        useStrict: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
          }
        },
        main: {
          src: ['<%= dirs.distClient %>/**/*.html','!<%= dirs.distClient %>/index.html'],
          dest: '<%= dirs.distClient %>/templates.js'
        }
      },

    nodemon: {
      dev: {
        script: '<%= dirs.server %>/app.js'
      }
    },

    karma: {
      options: {
        configFile: '<%= dirs.testUnit %>/karma.conf.js',
      },
      unit: {
        singleRun: true
      }
    },
    
    mongobackup: {
      options: {
        host : 'localhost',
        port: '27016',
        db : 'blogApp',
        dump:{
          out : './dbdump',
        },    
        restore:{
          path : './dbdump/blogApp',          
          drop : true
        }
      }
    },
    
    protractor: {
      e2e: {
        options: {
          configFile: "<%= dirs.testE2E %>/protractor.conf.js",
          keepAlive: false,
        },
      }
    }

  });

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-wiredep');
grunt.loadNpmTasks('grunt-injector');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-bower');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-nodemon');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-ng-annotate');
grunt.loadNpmTasks('grunt-html2js');
grunt.loadNpmTasks('grunt-karma');
grunt.loadNpmTasks('grunt-mongo-backup');
grunt.loadNpmTasks('grunt-protractor-runner');
grunt.loadNpmTasks('grunt-force-task');

grunt.registerTask('build-dev',
  [ 'jshint',
    'clean:dist',
    'copy:prepare',
    'wiredep',
    'injector',
    'bower',
    'clean:server',
    'copy:app',
    'nodemon'
  ]);

grunt.registerTask('test-ui:unit',
  [
    'clean:dist',
    'copy:prepare',
    'wiredep:test',
    'html2js',
    'karma:unit'
  ]);
  
grunt.registerTask('dump-db',
  [
    'mongobackup:dump'
  ]);
  
grunt.registerTask('test-ui:e2e',
  [
    'mongobackup:restore',
    'force:protractor',
  ]);

grunt.registerTask('default',
  [ 'jshint',
    'clean:dist',
    'copy:prepare',
    'html2js',
    'uglify',
    'wiredep',
    'clean:client',
    'injector',
    'bower',
    'clean:server',
    'copy:app',
    'nodemon'
  ]);

};