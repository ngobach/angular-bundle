/**
 * @ ThanBaiKS
 *
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var minify = require('gulp-uglify');
var serve = require('gulp-serve');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var flatten = require('gulp-flatten');
var gulpif = require('gulp-if');

/**
 * Copy depencies
 *
 */
gulp.task('dep', function() {
	gulp.src("com/**/*.min.js")
		.pipe(flatten())
		.pipe(gulp.dest("public/js/"));
	gulp.src("com/**/*.min.css")
		.pipe(flatten())
		.pipe(gulp.dest("public/css/"));
});

var build = function(release){
	return function() {
		gulp.src('src/**/*.js')
			.pipe(gulpif(release,plumber()))
			.pipe(gulpif(release,jshint()))
			.pipe(gulpif(release,jshint.reporter('jshint-stylish')))
			.pipe(concat("main.js"))
			.pipe(gulpif(release,minify()))
			.pipe(gulp.dest("public/js/"));
		
		gulp.src('src/**/*.css')
			.pipe(concat('main.css'))
			.pipe(gulpif(release,csso()))
			.pipe(gulp.dest('public/css/'));
			
	  	gulp.src(['src/**/*','!src/**/*.{css,js}'])
	  		.pipe(gulp.dest('public/'));
	}
}


/**
 * Copy and build src files
 *
 */
gulp.task('build',build(false));
gulp.task('build:dest',build(true));
gulp.task('serve', serve('public'));

gulp.task('watch',function(){
	gulp.watch('src/**/*',['build']);
});

gulp.task('open',function(){
	require('open')('http://localhost:3000/');
	gutil.log('Serve on port [3000]');
});

gulp.task('default',['serve','build','watch','open']);