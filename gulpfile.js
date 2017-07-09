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
		src: 'html/*.html' && 'html/app/basics/*.html' && 'html/app/components/*.html'
	}
};
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var $ = { sass: require('gulp-sass'), }
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var ttf2woff = require('gulp-ttf2woff');


// generate icon font icons outline
//-------------------------------------------------

var fontNameIconsOutline = 'icons-outline';

gulp.task('icons-outline', function(){
  gulp.src(['build/sprite/icons-outline/*.svg'])
    .pipe(iconfontCss({
      fontName: fontNameIconsOutline,
			formats: ['ttf', 'eot'],
      path: 'build/tpl/_icons-outline.scss',
      targetPath: '../../../../build/sass/basics/_icons-outline.scss',
      fontPath: '../fonts/icons/'
    }))
    .pipe(iconfont({
      fontName:	fontNameIconsOutline,
			appendCodepoints: true,
			normalize:true,
			fontHeight:512,
      descent:    64
     }))
    .pipe(gulp.dest('html/assets/fonts/icons/'));
});


// generate icon font icons solid
//-------------------------------------------------

var fontNameIconsSolid = 'icons-solid';

gulp.task('icons-solid', function(){
  gulp.src(['build/sprite/icons-solid/*.svg'])
    .pipe(iconfontCss({
      fontName: fontNameIconsSolid,
      path: 'build/tpl/_icons-solid.scss',
      targetPath: '../../../../build/sass/basics/_icons-solid.scss',
      fontPath: '../fonts/icons/'
    }))
    .pipe(iconfont({
      fontName: fontNameIconsSolid
     }))
    .pipe(gulp.dest('html/assets/fonts/icons/'));
});


// generate icon font icons solid
//-------------------------------------------------

gulp.task('ttf2woff', function(){
  gulp.src(['html/assets/fonts/icons/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('html/assets/fonts/icons/'));
});


// default task runner
//-------------------------------------------------
gulp.task('default', ['serve']);


// start browser sync and server task
//-------------------------------------------------

// Compile sass files
gulp.task('sass', function () {
	gulp.src(paths.sass.src)
	.pipe($.sass({ includePaths : [paths.sass.src] }).on('error', $.sass.logError))
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
