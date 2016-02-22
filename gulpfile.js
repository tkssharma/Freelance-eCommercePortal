var gulp = require('gulp'),
	gutil = require('util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minHTML = require('gulp-htmlmin'),
	minJson = require('gulp-jsonminify'),
	concat = require('gulp-concat');

var env,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    ouputDir,
    sassStyle;


var env = process.env.NODE_ENV || 'production';


if (env==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}


jsSources = [
    'js/jquery.min.js',
    'js/angular.min.js',
	'js/angular-ui-router.min.js',
	'js/scripts/main.js'
];
htmlSources = [ outputDir + '*.html'];



gulp.task('js', function() {
	gulp.src(jsSources)
	  .pipe(concat('script.js'))
	  .pipe(browserify())
	  .pipe(gulpif(env === 'production', uglify()))
	  .pipe(gulp.dest( outputDir + 'js'))
	  .pipe(connect.reload())
});


gulp.task('watch', function() {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['html']);
	gulp.watch('builds/development/js/*.json', ['json']);
});

gulp.task('default', ['html', 'js', 'json', 'compass', 'connect', 'watch']);

gulp.task('connect', function() {
	connect.server({
		root: 'builds/development',
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('builds/development/js/*.html')
	.pipe(gulpif(env === 'production', minHTML({collapseWhitespace: true})))
	.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
	.pipe(connect.reload())
});

gulp.task('json', function () {
	gulp.src('builds/development/js/*.json')
	.pipe(gulpif(env === 'production', minJson()))
	.pipe(gulpif(env === 'production', gulp.dest('builds/production/js')))
	.pipe(connect.reload())
});


