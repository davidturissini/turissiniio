module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
		  options: {
		    // define a string to put between each file in the concatenated output
		    separator: ';'
		  },
		  dist: {
		    // the files to concatenate
		    src: [
		    	'vendor/require.js', 
		    	'vendor/google_maps.js', 
		    	'vendor/underscore.js',
		    	'vendor/backbone.js',
		    	'src/*/**/*.js',
		    	'src/main.js'
		    ],
		    // the location of the resulting JS file
		    dest: './../Travel-Blog/public/scripts/traveladdict.min.js'
		  }
		}
	});

	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat']);


}