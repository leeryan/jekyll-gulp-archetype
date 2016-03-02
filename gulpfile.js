var gulp = require ('gulp'),

  /** Utils **/
  requiredir = require('requiredir'),
  gulpAutoTask = require('gulp-auto-task')

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
