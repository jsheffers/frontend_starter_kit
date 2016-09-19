var gulp = require('gulp');
var del = require('del');
// Access plugins like this: $.autoprefixer()
var $ = require('gulp-load-plugins')({camelize: true});
var sass_path = 'scss/**/*.scss';
var sass_dest = 'processed/css';

/**
 * Sass task
 * - Compiles Sass into CSS 
 * - Includes node-neat
 */
gulp.task('sass', function() {
  gulp.src(sass_path)
  .pipe($.sass({
    outputStyle: 'expanded', // compressed, expanded
    errLogToConsole: true,
    sourceComments: true,
  }))
  .pipe(gulp.dest(sass_dest))
  .pipe($.notify({
    onLast: true,
    message: function () {
      return 'Sass compiled :)';
    }
  }));
});


/**
 * Styleguide task
 * - This tasks points hologram to your project level config file
 * - Dependency - sass 
 */
gulp.task('styleguide', ['sass'], function() {
  gulp.src('./styleguide/hologram_config.yml')
    .pipe($.hologram({logging:true}));
});


/**
 * Clears out the processed files.
 */
gulp.task('clear', function() {
  del([sass_dest], { 'force': true });
});

/**
 * Watch task
 * - Watches for changes on Sass and runs the styleguide task
 */
gulp.task('watch', function() {
  gulp.watch(sass_path, ['styleguide']); 
});

gulp.task('default', ['styleguide', 'watch']);