	/* Modules */
let gulp 			= require('gulp'),
	uglify 			= require('gulp-uglify'),
	pump			= require('pump'),
	csso 			= require('gulp-csso'),
	concat 			= require('gulp-concat'),
	cleanCSS 		= require('gulp-clean-css');
	sass			= require('gulp-sass'),
	watch 			= require('gulp-watch'),
	browserSync 	= require('browser-sync');
	/* */

	/* Pathes */
let projectFolder	= './site',
	htmlPath 		= './site/*.html',
	sassPath 		= './site/sass/**/*.sass',
	scssPath 		= './site/sass/**/*.scss',
	cssFiles 		= './site/css/modules',
	cssModulesPath	= './site/css/modules/**/*.css',
	cssMinFile 		= './site/css/styles.min.css',
	cssMinPath 		= './site/css/styles.min.css',
	jsPath 			= './site/js',
	jsPathFiles		= './site/js/**/*.js',
	commonJsPath	= './site/js/app.min.js';
	/* */


gulp.task('default', ['browser-sync', 'devCSS', 'devJS'], () => {
	gulp.watch(cssModulesPath, ['devCSS']);
	gulp.watch(jsPathFiles, ['devJS']);
});

gulp.task('watch-css', ['browser-sync', 'devCSS'], () => {
	gulp.watch(cssModulesPath, ['devCSS']);
});

gulp.task('watch-sass', ['sass'], () => {
	gulp.watch(scssPath, ['sass']);
});

gulp.task('watch-js', ['devJS'], () => {
	gulp.watch(jsPathFiles, ['devJS']);
});

gulp.task('devCSS', function() {
  return gulp.src(cssModulesPath)
    .pipe(concat(cssMinFile))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(csso())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('min-css', () => {
  return gulp.src(cssModulesPath)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', () => {
	return gulp.src(scssPath)
		.pipe(sass())
		.pipe(gulp.dest(cssFiles));
});

gulp.task('devJS', (cb) => {
	let scripts = [
		'./site/js/core/app.class.js',
		'./site/js/core/user.class.js',
		'./site/js/core/message.class.js',
		'./site/js/app.js'
	];
	return gulp.src(scripts)
	.pipe(concat(commonJsPath))
	.pipe(uglify())
	.pipe(gulp.dest('./'));
});

gulp.task('browser-sync', () => {
	var files = [htmlPath, cssMinPath, commonJsPath];

	browserSync.init(files, {
		server: {
		  baseDir: projectFolder
		},
		notify: false
	});
});