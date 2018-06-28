	/* Modules */
let gulp 			= require('gulp'),
	sass			= require('gulp-sass'),
	babel 			= require('gulp-babel'),
	autoprefixer	= require('gulp-autoprefixer'),
	htmlmin			= require('gulp-htmlmin'),
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
let app_rootFolder 		= 'app',
	app_indexHTML		= 'app/index.html',
	app_cssFiles		= 'app/public/css/**/*.css',
	app_cssFilesFolder	= 'app/public/css',
	app_sassFiles		= 'app/public/sass/**/*.scss',
	app_jsFiles			= 'app/public/js/**/*.js',
	app_jsFilesFolder	= 'app/public/js',

	project_rootFolder	= '../project',
	project_allFiles	= '../project/**/*.*',
	project_indexHTML	= '../project/index.html',
	project_styleMinCSS	= '../project/public/css/style.min.css',
	project_scriptMinJS	= '../project/public/js/script.min.js';

	/* */
gulp.task('default', ['browser-sync', 'html', 'sass', 'css', 'js'], () => {
	gulp.watch(app_indexHTML, ['html']);
	gulp.watch(app_sassFiles, ['sass']);
	gulp.watch(app_cssFiles, ['css']);
	gulp.watch(app_jsFiles, ['js']);
});




gulp.task('watch-html', ['browser-sync', 'html'], () => {
	gulp.watch(app_indexHTML, ['html']);
});

gulp.task('html', () => {
	return gulp.src(app_indexHTML)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(project_rootFolder));
});




gulp.task('watch-css', ['browser-sync', 'css'], () => {
	gulp.watch(app_cssFiles, ['css']);
});

gulp.task('css', () => {
	return gulp.src(app_cssFiles)
		.pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
		.pipe(concat(project_styleMinCSS))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(csso())
		.pipe(gulp.dest('./'));
		//.pipe(browserSync.reload({stream: true}));
});




gulp.task('watch-sass', ['browser-sync', 'sass'], () => {
	gulp.watch(app_sassFiles, ['sass']);
});

gulp.task('sass', () => {
	return gulp.src(app_sassFiles)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(app_cssFilesFolder));
		//.pipe(browserSync.reload({stream: true}));
})




gulp.task('watch-js', ['browser-sync', 'js'], () => {
	gulp.watch(app_jsFiles, ['js']);
});

gulp.task('js', () => {
	let scripts = [
		app_jsFilesFolder + '/core/app.class.js',
		app_jsFilesFolder + '/app.js'
	];
	return gulp.src(scripts)
		.pipe(babel({
        	presets: ['env']
        }))
		.pipe(concat(project_scriptMinJS))
		.pipe(uglify())
		.pipe(gulp.dest('./'));
});




gulp.task('browser-sync', () => {
	//var files = [htmlPath, cssMinPath, commonJsPath];
	browserSync.init(project_allFiles, {
		server: {
		  baseDir: project_rootFolder
		},
		notify: false
	});
});