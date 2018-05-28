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
var ttf2woff = require('gulp-ttf2woff');


// generate icon svg sprite
//-------------------------------------------------

gulp.task('svgstore', function () {
    var svgs = gulp
        .src('build/sprite/*.svg')
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
        .src('html/app/foundations/iconography.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('html/app/foundations/'));
});


// Create woff out of a ttf
//-------------------------------------------------
gulp.task('ttf2woff', function(){
  gulp.src(['html/assets/fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('html/assets/fonts/'));
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
