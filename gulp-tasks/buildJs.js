var gulp = require('gulp'),

    /** Utilities **/
    rename = require('gulp-rename'),
    size = require('gulp-size')

    /** JS **/
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),

    /** Paths **/
    paths = require('../package.json').paths;

/** JS build **/

module.exports = function buildJs(){

    //Build vendor files
    gulp.src(paths.vendor.src + '*.js')
    //Concat files
        .pipe(concat('vendor.js'))
        //Minify combined file and rename
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(size())
        .pipe(gulp.dest(paths.vendor.dest));

    return gulp.src(paths.js.src + '*.js')
    //Concat files
        .pipe(concat('main.js'))
        //Lint file
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        //Minify files and rename
        .pipe(uglify())
        .pipe(rename(extname: '.min.js'))
        .pipe(size())
        .pipe(gulp.dest(paths.js.dest));
};
