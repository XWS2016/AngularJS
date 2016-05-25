module.exports = function(grunt) {

  var dirsConfig = {
      client:'client',
      dist:'dist',
      distClient:'dist/client',
      server:'server',
      bowerComponents:'bower_components',
      distBowerComponents:'dist/bower_components'
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