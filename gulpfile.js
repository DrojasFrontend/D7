var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass') ,
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify')


gulp.task('browser-sync', function(){
	var files = [
		'./style.css',
		'./main.js',
		'./*.php'
  ];
  
  browserSync.init({
		server: "./"
	});

	/*browserSync.init(files, {
		proxy: "http://localhost/portfolio"
  });*/
  
});

// Configure sass task to run the specified .scss files change
// BrowserSync will also reload browser.

gulp.task('sass', function(){
	return gulp.src('scss/*.scss')
		.pipe(sass({
			'outputStyle': 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('assets/css'))
		.pipe(browserSync.stream());
});

/*gulp.task('scripts', function() {
	pump([
		gulp.src('js/*.js'),
		uglify(),
		gulp.dest('assets/js')
	]);
});*/

gulp.task('scripts', function(){
  return gulp.src('js/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.reload({stream:true}))
});

// Create the defaul task that can be called using 'Gulp'.
// The task will process scss, run borwser-Sync and stat watching for changes

gulp.task('default', ['sass', 'browser-sync'], function(){
	gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch("js/**/*.js", ['scripts']);
  gulp.watch("./*.html").on('change', browserSync.reload);
})