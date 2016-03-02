var gulp = require ('gulp'),

  /** Utils **/
  requireDir = require('require-dir'),
  gulpAutoTask = require('gulp-auto-task'),
  browsersync = require('browser-sync'),
  watch = require('gulp-watch'),
  runSequence = require('run-sequence'),

  /** Config **/
  paths = require('./package.json').paths;

/** Import main tasks **/
//Require modules so they can be called as functions

var utils = requireDir('gulp-tasks'); // ex utils.buildJekyll

//Automatically setup tasks
gulpAutoTask('{*,**/*}.js', {
  base: paths.tasks,
  gulp: gulp
});

/** Helper tasks **/
gulp.task('build', function(callback){
    return utils.buildJekyll('callback', serve);
});

gulp.task('build:prod', function(callback){
    return utils.buildJekyll('callback', prod);
});

gulp.task('build:assets', ['buildCss', 'buildJs', 'optimizeImg']);

/** Browser sync **/
//Init server to build directory
gulp.task('browser', function(){
  browserSync.init({
    server: './' + paths.build
  });
});

//Force reload across all devices
gulp.task('browser:reload', function(){
  browserSync.reload();
});

/** Main build **/
gulp.task('serve', ['browser'], function(){
    runSequence('build', ['build:assets']);

    //SCSS/CSS
    watch([
        paths.src + 'fonts/*',
        paths.sass.src + '*.scss',
        paths.css.src + 'main.css',
        paths.sass.src + '**/*.scss'
    ], function(){
        runSequence('buildCss', ['browser:reload']);
    });

    //JS
    watch([paths.js.src + '*.js', paths.vendor.src + '*.js'], function(){
        runSequence('buildJs', ['browser:reload']);
    });

    //Images
    watch([paths.img.src + '*', paths.img.src + '**/*'], function(){
        runSequence('optimizeImg', ['browser:reload']);
    });

    //Markup, posts, data
    watch([
        paths.src +'*',
        paths.src +'_data/*',
        paths.src +'_plugins/*',
        paths.src +'**/*.md',
        paths.src +'**/*.html',
        paths.src +'**/*.markdown',
        paths.src +'_includes/**/*.md',
        paths.src +'_includes/**/*.svg',
        paths.src +'_includes/**/*.html',
    ], function(){
        runSequence('build', ['build:assets', 'browser:reload']);
    });

    gutil.log('Watching for changes...');

});

gulp.task('deploy', function(){
    runSequence('build:prod', ['build:assets']);
});
