module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-version');
	grunt.initConfig({
		version: {
			project: {
				src: ['package.json', 'package-lock.json', 'composer.json', 'composer.lock']
			}
		}
	});


};