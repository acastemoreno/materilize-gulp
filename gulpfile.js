var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var csso = require('gulp-csso');
var fontmin = require('gulp-fontmin');
var ttf2woff2 = require('gulp-ttf2woff2');

gulp.task('styles', function(){

	var injectmaterialize = gulp.src('sources/materialize-src/sass/materialize.scss', {read: false});

	var injectscss = gulp.src('scss/styles/*.scss', {read: false});

	function transformFilepath(filepath) {
	    return '@import "' + filepath + '";';
	}
	 
	var injectMaterializeOptions = {
	    transform: transformFilepath,
	    starttag: '// inject:materialize',
	    endtag: '// endinject',
	    addRootSlash: false
	};

	var injectAppOptions = {
	    transform: transformFilepath,
	    starttag: '// inject:styles',
	    endtag: '// endinject',
	    addRootSlash: false
	};

  	gulp.src('scss/main.scss')
  	.pipe(inject(injectmaterialize, injectMaterializeOptions))
  	.pipe(inject(injectscss, injectAppOptions))
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('public_html/css'));
});

gulp.task('styles', function(){
	 gulp.src('sources/materialize-src/font/roboto/*.ttf')
    .pipe(ttf2woff2())
    .pipe(fontmin())
    .pipe(gulp.dest('public_html/font/roboto'));
});