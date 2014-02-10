module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
		  scripts: {
		    files: ['./src/js/**/*.js'],
		    tasks: ['default']
		  },

		  b:{
		  	files: ['./src/js/**/*.js', '!./src/js/turissiniio.js'],
		  	tasks:['b']
		  }
		},

		browserify: {
		  dist: {
		    src: 'src/js/server.js',
		    dest: 'build/dist/turissiniio.js'
		  }
		},

		uglify:{
			dist:{
				src:'build/dist/turissiniio.js',
				dest:'build/dist/turissiniio.min.js'
			}
		},

		copy:{
			dist:{
				src:'build/dist/turissiniio.js',
				dest:'./src/js/turissiniio.js'
			}
		}

	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['browserify', 'uglify', 'copy']);
	grunt.registerTask('b', ['browserify', 'copy']);

}