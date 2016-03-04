var gulp = require ('gulp'),

    /** Paths **/
    paths = require ('../package.json').paths;

/** CSS Build **/
module.exports = function importBowerCss(){

    return gulp.src(paths.bower + 'normalize-scss/_normalize.scss')
        .pipe(gulp.dest(paths.sass.vendor))
};
