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
    coffeeSources,
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

coffeeSources = ['components/coffee/tagline.coffee'];
jsSources = [
    'components/lib/jquery.min.js',
    'components/lib/angular.min.js',
	'components/lib/angular-ui-router.min.js',
	'components/scripts/main.js',
	'components/scripts/tagline.coffee',
	'components/scripts/template.js'
];
sassSources = ['components/sass/style.scss'];
htmlSources = [ outputDir + '*.html'];
jsonSources = [ outputDir + 'js/*.json'];

gulp.task('coffee', function() {
	gulp.src(coffeeSources)
	  .pipe(coffee({ bare: true })
	  	.on('error', gutil.log))
	  .pipe(gulp.dest('components/scripts'))  
});

gulp.task('js', function() {
	gulp.src(jsSources)
	  .pipe(concat('script.js'))
	  .pipe(browserify())
	  .pipe(gulpif(env === 'production', uglify()))
	  .pipe(gulp.dest( outputDir + 'js'))
	  .pipe(connect.reload())
});

/* I need to replace gulp-compass as I cannot get it to work properly*/
gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDir + 'images',
      style: sassStyle,
      sourcemap: true,
      debug: true,
      comments: true
    })
    .on('error', gutil.log))
    .pipe(gulp.dest( outputDir + 'css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['html']);
	gulp.watch('builds/development/js/*.json', ['json']);
});

gulp.task('default', ['html', 'coffee', 'js', 'json', 'compass', 'connect', 'watch']);

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


