var gulp = reqiuire ('gulp'),

    /** Utilities **/
    rename = require('gulp-rename'),
    size = require('gulp-filesize')

    /** CSS **/
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),

    /** Paths **/
    paths = require ('../package.json').paths;

/** CSS Build **/
module.exports = function buildCss(){
    return gulp.src(paths.css.src + 'main.scss')
        .pipe(sass({
            includePaths: [paths.sass.src], //Tell sass where to look for files
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(minifyCss())
        .pipe(remane({extname: '.min.css'}))
        .pipe(size()) // Logs minified size to the console
        .pipe(gulp.dest(paths.css.dest));
};
