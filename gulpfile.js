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

/**
 * Copy depencies
 *
 */
gulp.task('dep', function() {
	gulp.src([
		"com/angular/*.min.js",
		"com/angular-route/*.min.js",
		"com/angular-base64/*.min.js",
		"com/angular-bootstrap/*.min.js",
		"com/bootstrap/dist/js/*.min.js",
		"com/jquery/dist/*.min.js",
		])
		.pipe(gulp.dest("public/js/"));

	gulp.src([
		"com/bootstrap/dist/css/*.min.css"
		])
		.pipe(gulp.dest("public/css/"));
});

var build = function(release){
	return function(){
		var _ = gulp.src('src/**/*.js');
		if (release){
			_
				.pipe(plumber())
				.pipe(jshint())
				.pipe(jshint.reporter('jshint-stylish'));
		}
		_
			.pipe(concat("main.js"))
			.pipe(minify())
			.pipe(gulp.dest("public/js/"));
		_ = gulp.src('src/**/*.css');
		if (release){
			_
				.pipe(csso());
		}
		_
			.pipe(concat("main.css"))
			.pipe(gulp.dest("public/css/"));
		// Others
	  	gulp.src([
		    'src/**/*',
		    '!src/**/*.{css,js}'
		  	])
	  		.pipe(gulp.dest('public/'));

	}
}
/**
 * Copy and build src files
 *
 */
gulp.task('build',build(false));

gulp.task('build:dest',build(true));

gulp.task('serve',serve('public'));
gulp.task('watch',function(){
	gulp.watch('src/**/*',['build']);
});
gulp.task('open',function(){
	require('open')('http://localhost:3000/');
	gutil.log('Serve on port [3000]');
});
gulp.task('default',['serve','build','watch','open']);