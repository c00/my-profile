module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-ng-constant');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.initConfig({
		'meta': {
			'jsFilesForTesting': [
			'dev/components/**/*.js',
			'dev/shared/**/*.js',
			'dev/app.module.js',
			'dev/app.routes.js',
			'dev/settings.js'
			]
		},
		
		jshint: {
			'beforeconcat': ['dev/components/**/*.js',
			'dev/shared/**/*.js',
			'dev/app.module.js',
			'dev/app.routes.js',
			'dev/settings.js'],
		},

		copy: {
			dist: {
				files: [
				/* Main project files (No Js) */
				{ expand: true, cwd: 'dev/', src: ['*.html', 'data/**', 'components/**/*.html', 'img/**', 'shared/**/*.html'], dest: 'dist/' },
				/* Non-CDN css */
				{ expand: true, cwd: 'dev/css/', src: ['bootstrap.min.css'], dest: 'dist/css' },
				{ expand: true, cwd: 'dev/bower_components/bootstrap-social/', src: ['bootstrap-social.css'], dest: 'dist/css' },
				{ expand: true, cwd: 'dev/bower_components/angular-ui-notification/dist/', src: ['angular-ui-notification.min.css'], dest: 'dist/css/' },
				{ expand: true, cwd: 'dev/bower_components/ngImgCrop/compile/minified/', src: ['ng-img-crop.css'], dest: 'dist/css/' },
				{ expand: true, cwd: 'dev/bower_components/angular-bootstrap-lightbox/dist/', src: ['angular-bootstrap-lightbox.min.css'], dest: 'dist/css/' },
				/* Non-CDN JS Dependencies */
				{ expand: true, cwd: 'dev/bower_components/angular-ui-router/release/', src: ['angular-ui-router.min.js'], dest: 'dist/js/' },
				{ expand: true, cwd: 'dev/bower_components/a0-angular-storage/dist/', src: ['angular-storage.min.js'], dest: 'dist/js/' },
				{ expand: true, cwd: 'dev/bower_components/lodash/', src: ['lodash.min.js'], dest: 'dist/js/' },
				{ expand: true, cwd: 'dev/bower_components/angular-bootstrap/', src: ['ui-bootstrap.min.js', 'ui-bootstrap-tpls.min.js'], dest: 'dist/js/' },
				{ expand: true, cwd: 'dev/bower_components/ng-file-upload/', src: ['ng-file-upload.min.js'], dest: 'dist/js/' },
				{ expand: true, cwd: 'dev/bower_components/ng-file-upload/', src: ['ng-file-upload-shim.min.js'], dest: 'dist/js/' },
				{ expand: true, cwd: 'dev/bower_components/angular-ui-notification/dist/', src: ['angular-ui-notification.min.js'], dest: 'dist/js/' },
				{ expand: true, cwd: 'dev/bower_components/ngImgCrop/compile/minified/', src: ['ng-img-crop.js'], dest: 'dist/js/' },
				{ expand: true, cwd: 'dev/bower_components/angular-bootstrap-lightbox/dist/', src: ['angular-bootstrap-lightbox.min.js'], dest: 'dist/js/' },
				/* .htaccess */
				{ expand: true, cwd: 'htaccess/dist', src: ['.htaccess'], dest: 'dist/' }
				]
			},
			'dist-local': {
				files: [
				/* Main project files */
				{ expand: true, cwd: 'dev/', src: ['*.html', 'data/**', 'components/**/*.html', 'img/**', 'shared/**/*.html'], dest: 'dist-local/' },
				/* Non-CDN css */
				{ expand: true, cwd: 'dev/css/', src: ['bootstrap.min.css'], dest: 'dist-local/css' },
				{ expand: true, cwd: 'dev/bower_components/bootstrap-social/', src: ['bootstrap-social.css'], dest: 'dist-local/css' },
				{ expand: true, cwd: 'dev/bower_components/angular-ui-notification/dist/', src: ['angular-ui-notification.min.css'], dest: 'dist-local/css/' },
				{ expand: true, cwd: 'dev/bower_components/ngImgCrop/compile/minified/', src: ['ng-img-crop.css'], dest: 'dist-local/css/' },
				{ expand: true, cwd: 'dev/bower_components/angular-bootstrap-lightbox/dist/', src: ['angular-bootstrap-lightbox.min.css'], dest: 'dist-local/css/' },
				/* Non-CDN  JS dependencies */
				{ expand: true, cwd: 'dev/bower_components/angular-ui-router/release/', src: ['angular-ui-router.min.js'], dest: 'dist-local/js/' },
				{ expand: true, cwd: 'dev/bower_components/a0-angular-storage/dist/', src: ['angular-storage.min.js'], dest: 'dist-local/js/' },
				{ expand: true, cwd: 'dev/bower_components/lodash/', src: ['lodash.min.js'], dest: 'dist-local/js/' },
				{ expand: true, cwd: 'dev/bower_components/angular-bootstrap/', src: ['ui-bootstrap.min.js', 'ui-bootstrap-tpls.min.js'], dest: 'dist-local/js/' },
				{ expand: true, cwd: 'dev/bower_components/ng-file-upload/', src: ['ng-file-upload.min.js'], dest: 'dist-local/js/' },
				{ expand: true, cwd: 'dev/bower_components/ng-file-upload/', src: ['ng-file-upload-shim.min.js'], dest: 'dist-local/js/' },
				{ expand: true, cwd: 'dev/bower_components/angular-ui-notification/dist/', src: ['angular-ui-notification.min.js'], dest: 'dist-local/js/' },
				{ expand: true, cwd: 'dev/bower_components/ngImgCrop/compile/minified/', src: ['ng-img-crop.js'], dest: 'dist-local/js/' },
				{ expand: true, cwd: 'dev/bower_components/angular-bootstrap-lightbox/dist/', src: ['angular-bootstrap-lightbox.min.js'], dest: 'dist-local/js/' },
				/* .htaccess */
				{ expand: true, cwd: 'htaccess/local', src: ['.htaccess'], dest: 'dist-local/' }
				]
			}
		},

		sass: {
			xp: {
				options: {
					style: 'expanded'
				},
				files: {
					'dev/css/compiled.css': 'dev/scss/.build/build.scss'
				}
			},
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'dist/css/compiled.css': 'dev/scss/.build/build.scss'
				}
			},
			'dist-local': {
				options: {
					style: 'expanded'
				},
				files: {
					'dist-local/css/compiled.css': 'dev/scss/.build/build.scss'
				}
			},
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'dev/css/compiled.css': 'dev/scss/.build/build.scss'
				}
			}
		},

		processhtml: {
			/*options: { strip: true },*/
			dist: {
				files: {
					'dist/index.html' : ['dev/index.html']
				}
			},
			local: {
				files: {
					'dist-local/index.html' : ['dev/index.html']
				}
			}
		},
		
		ngconstant: {
			// Options for all targets
			options: {
				space: '	',
				wrap: '{%= __ngModule %}',
				name: 'settings', /* Module name */
			},
			// Environment targets
			dev: {
				options: {
					dest: 'dev/settings.js'
				},
				constants: {
					settings: {
						"environment": "development",
						"logLevel": "debug",
						"app": "my-profile",
						"debug": true,
						"pictureFolder": "img/profiles/",
						"subjectPictureFolder": "img/subjects/",
					}
				}
			},
			dist: {
				options: {
					dest: 'dist/settings.js'
				},
				constants: {
					settings: {
						"environment": "production",
						"logLevel": "warning",
						"app": "my-profile",
						"debug": false,
						"pictureFolder": "img/profiles/",
						"subjectPictureFolder": "img/subjects/",
					}
				}
			},
			'dist-local': {
				options: {
					dest: 'dist-local/settings.js'
				},
				constants: {
					settings: {
						"environment": "local distribution test",
						"logLevel": "debug",
						"app": "my-profile",
						"debug": false,
						"pictureFolder": "img/profiles/",
						"subjectPictureFolder": "img/subjects/",
					}
				}
			}
		},

		watch: {
			sass: {
				files: ['dev/scss/*'],
				tasks: ['css']
			}
		},

		concat: {
			options: {

			},
			css: {
				src: ['dev/scss/*.scss'],
				dest: 'dev/scss/.build/build.scss',
			},
			jsdistlocal: {
				src: [
				'dev/app.*.js',
				'dev/components/**/*.js',
				'dev/shared/**/*.js',
				],					
				dest: 'dist-local/js/ndt.js',
			},
			jsdist: {
				src: [
				'dev/app.*.js',
				'dev/components/**/*.js',
				'dev/shared/**/*.js',
				],					
				dest: 'dist/js/ndt.js',
			}
		},


	});

grunt.registerTask('build-dist', ['jshint', 'concat:jsdist', 'copy:dist', 'sass:dist', 'processhtml:dist', 'ngconstant:dist']);
grunt.registerTask('build-local', ['jshint', 'concat:jsdistlocal', 'copy:dist-local', 'sass:dist-local', 'processhtml:local', 'ngconstant:dist-local']);
grunt.registerTask('build', ['build-dist', 'build-local']);
grunt.registerTask('css', ['concat:css', 'sass:dev']);

};