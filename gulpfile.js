var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var csso = require('gulp-csso');

gulp.task('styles', function(){

	var injectmaterialize = gulp.src('sources/materialize-src/sass/materialize.scss', {read: false});

	function transformFilepath(filepath) {
	    return '@import "' + filepath + '";';
	}
	 
	var injectAppOptions = {
	    transform: transformFilepath,
	    starttag: '// inject:materialize',
	    endtag: '// endinject',
	    addRootSlash: false
	};

  	gulp.src('scss/main.scss')
  	.pipe(inject(injectmaterialize, injectAppOptions))
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('public_html/css'))
});