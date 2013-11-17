module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
		  options: {
		    // define a string to put between each file in the concatenated output
		    separator: ''
		  },
		  dist: {
		    // the files to concatenate
		    src: [
		    	'./dist/**/*.js',
		    	'./public/scripts/application/initializers/browser.js',
		    ],
		    // the location of the resulting JS file
		    dest: './public/app.min.js'
		  }
		},
		watch: {
		  scripts: {
		    files: ['./public/scripts/**/*.js'],
		    tasks: ['default']
		  },
		},
		foo: {
			scripts: {
				src: [
					'public/scripts/**/*.js',
					'!public/scripts/vendor/**/*.js',
					'!public/scripts/application/initializers/server.js'
				]
			}
		}
	});


	grunt.registerMultiTask('foo', 'My "foo" task.', function() {
		var concat = '';

		this.files.forEach(function (filePair) {
			
			filePair.src.forEach(function (src) {
				var moduleName = src.replace('public/scripts/', '').replace('.js', '');
				var str = 'define(\'' + moduleName + '\', ';
				var variableNames = [];
				var variableValues = [];
				
				var fileContents = grunt.file.read(src);




				var variableMatches = fileContents.match(/var\s(.)+\s\=\srequire\(\'(.)+\'\)(;)?/g);
				fileContents = fileContents.replace(/var\s(.)+\s\=\srequire\(\'(.)+\'\)(;)?/g, '');
				
				if (variableMatches === null) {
					variableMatches = [];
				}

				variableMatches.forEach(function (match) {
					var split = match.split(' = ');

					var variableName = split[0].replace('var ', '');
					var variableValue = split[1].replace(/require\(\'/, '').replace(/\'\)(;)?/, '');

					variableNames.push(variableName);
					variableValues.push('\'' + variableValue + '\'');

				});


				str += '[' + variableValues.join(',') + '], ';
				str += 'function (' + variableNames.join(',') + ') {';

				fileContents = fileContents.replace('define(function (require) {', str);


				

				concat += fileContents;


			});


		});

		grunt.file.write('./public/app.min.js', concat);
		
	});

	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.registerTask('default', ['foo']);


}