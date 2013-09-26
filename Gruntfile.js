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
		    	'vendor/jquery-2.0.3.js',
		    	'vendor/google_maps.js', 
		    	'vendor/underscore.js',
		    	'vendor/backbone.js',
		    	'src/*/**/*.js',
		    	'src/main.js'
		    ],
		    // the location of the resulting JS file
		    dest: './public/scripts/app.min.js'
		  }
		}
	});

	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat']);


}