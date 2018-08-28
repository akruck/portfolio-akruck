// variables
//-------------------------------------------------
var basePaths = {
 src: 'build/',
 dest: 'html/assets/',
};
var paths = {
 sass: {
  src: basePaths.src + 'sass/**/*.scss',
  dest: basePaths.dest + 'css/'
 },
 html: {
  src: 'html/*.html' && 'html/app/foundations/*.html' && 'html/app/components/*.html'
 }
};
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var $ = {
 sass: require('gulp-sass'),
}

// var to create svg sprite
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var inject = require('gulp-inject');


// generate icon svg sprite
//-------------------------------------------------

gulp.task('svgstore', function () {
    var svgs = gulp
        .src('build/sprite/svg/*.svg')
        .pipe(svgmin(function(file) {
         return {
          plugins: [{
           cleanupIDs: {
            minify: true
           }
          }]
         }
        }))
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src('html/index.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('html/'));
});


// Create woff out of a ttf
//-------------------------------------------------
var ttf2woff = require('gulp-ttf2woff');

gulp.task('ttf2woff', function(){
  gulp.src(['html/assets/fonts/Exo_2/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('html/assets/fonts/Exo_2/'));
});


// Create woff out of a ttf
//-------------------------------------------------
var ttf2eot = require('gulp-ttf2eot');

gulp.task('ttf2eot', function(){
  gulp.src(['html/assets/fonts/Exo_2/*.ttf'])
    .pipe(ttf2eot())
    .pipe(gulp.dest('html/assets/fonts/Exo_2/'));
});

// default task runner
//-------------------------------------------------
gulp.task('default', ['serve']);


// start browser sync and server task
//-------------------------------------------------

// Compile sass files
gulp.task('sass', function() {
 gulp.src(paths.sass.src)
  .pipe($.sass({
   includePaths: [paths.sass.src]
  }).on('error', $.sass.logError))
  .pipe(gulp.dest(paths.sass.dest))
  .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

 browserSync.init({
  server: "./html"
 });

 //if any scss changes, create create new sass
 gulp.watch(paths.sass.src, ['sass']);
 gulp.watch(paths.html.src).on('change', browserSync.reload);
});
