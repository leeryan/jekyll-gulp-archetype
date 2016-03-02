var gulp = require ('gulp'),

  /** Utils **/
  requiredir = require('requiredir'),
  gulpAutoTask = require('gulp-auto-task'),
  browsersync = require('browser-sync'),

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
