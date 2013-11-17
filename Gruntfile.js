module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
		  scripts: {
		    files: ['./src/**/*.js'],
		    tasks: ['default']
		  },
		},
		'foo': {
			scripts: {
				src: [
					'src/**/*.js',
					'!src/application/initializers/server.js'
				]
			}
		}
	});


	grunt.registerMultiTask('foo', 'My "foo" task.', function() {
		var concat = '';

		this.files.forEach(function (filePair) {
			
			filePair.src.forEach(function (src) {
				var moduleName = src.replace('src/', '').replace('.js', '');
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

		grunt.file.write('./public/scripts/app.min.js', concat);
		
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.registerTask('default', ['foo']);


}