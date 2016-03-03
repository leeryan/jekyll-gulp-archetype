var exec = require('child_process').exec,

    /** Utilities **/
    gutil = require('gulp-util');

// Gulp tasks get passed a callback first so the secondary arg
// MUST be the second arg. Succesful processes return callback(null)
module.exports = function buildJekyll(callback, env){

        var cmd = 'jekyll build --config ';
        cmd += (env === 'prod' ? '_config.build.yml': '_config.yml');

        // https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
        return exec(cmd, function(error, stdout, stderror){

            gutil.log(stdout) // Log the output to the console
            return callback(error !== null ? 'ERROR: Jekyll process exited with code: ' + error.code : null);
        })
};
