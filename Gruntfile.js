// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// $Id$
// $URL$
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* global module */
module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Sass to CSS
		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		sass: {
			dev: {
				files: [{
					expand: true,
					cwd: 'src/scss',
					src: ['*.scss'],
					dest: 'fileadmin/Corporate/Public/css',
					ext: '.css'
				}],
				options: {
					sourceMap: true,
					outputStyle: 'nested',
					includePaths: [
						'/home/' + grunt.option('user') + '/.gem/ruby/1.9.1/gems/susy-2.2.2/sass/',
						'/home/' + grunt.option('user') + '/.gem/ruby/1.9.1/gems/breakpoint-2.5.0/stylesheets'
					]
				},
			},

			prod: {
				files: [{
					expand: true,
					cwd: 'src/scss',
					src: ['*.scss'],
					dest: 'fileadmin/Corporate/Public/css',
					ext: '.css'
				}],
				options: {
					sourceMap: false,
					outputStyle: 'compressed',
					includePaths: [
						'/home/' + grunt.option('user') + '/.gem/ruby/1.9.1/gems/susy-2.2.2/sass/',
						'/home/' + grunt.option('user') + '/.gem/ruby/1.9.1/gems/breakpoint-2.5.0/stylesheets'
					]
				},
			},
		},

		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// watch
		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		watch: {
			scss: {
				files: ['src/scss/*.scss','src/scss/**'],
				tasks: ['sass:dev', 'copy'],
				options: {
					interrupt: true,
					livereload: true
				}
			},
			html: {
				files: ['templates/**'],
				options: {
					interrupt: true,
					livereload: true
				}
			}
		},

		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// copy
		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		copy: {
			main: {
				files: [
					//copy all images to public folder
					{
						expand: true,
						cwd: 'src/images',
						src: ['**'],
						dest: 'fileadmin/Corporate/Public/images',
					},
					//copy all self-written scripts to public folder
					{
						expand: true,
						cwd: 'src/scripts',
						src: ['**'],
						dest: 'fileadmin/Corporate/Public/scripts',
					}
					//You need to add another object for each vendor script
					//that you add to the site. Here's an example for jquery:
					//(Install via bower: bower install jquery --save-dev)
					//
					//{
					//	expand: true,
					//	cwd: 'bower_components/jquery/dist/',
					//	src: 'jquery.min.js',
					//  dest: 'fileadmin/Corporate/Public/scripts',
					//}
					//
				],
			}
		},

	});

	//load tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');

	//watch sass as default task
	grunt.registerTask('default', ['show_usage_instructions']);

	//compile for dev and production
	grunt.registerTask('compile:dev', ['sass:dev','copy']);
	grunt.registerTask('compile:prod', ['sass:prod','copy']);

	//copy assets from private to public folder
	grunt.registerTask('publishAssets', ['copy']);

	grunt.registerTask('show_usage_instructions', 'Print Usage instructions', function (){
		//check if name has been set using set_user
			grunt.log.writeln();
			grunt.log.writeln('/*****************************************************************/'['green'].bold);
			grunt.log.writeln('/* Command line usage:                                           */'['green'].bold);
			grunt.log.writeln('/* 1) watch files and compile:                                   */'['green'].bold);
			grunt.log.writeln('/*    You must specify the user option for the sass task:        */'['green'].bold);
			grunt.log.writeln('/*    e.g. grunt watch --user=fuehne                             */'['green'].bold);
			grunt.log.writeln('/*                                                               */'['green'].bold);
			grunt.log.writeln('/* 2) Publish assets to TYPO3 installation:                      */'['green'].bold);
			grunt.log.writeln('/*    Use grunt publishAssets to copy the assets                 */'['green'].bold);
			grunt.log.writeln('/*****************************************************************/'['green'].bold);
	});

};