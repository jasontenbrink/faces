var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('bundle', function(){
  gulp.src('./client/index.js')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./server/public/'));
});

gulp.task('vendorjs', function(){
  gulp.src(['./node_modules/angular/angular.min.js',
   './node_modules/angular/angular-animate.min.js',
   './node_modules/angular/angular-route.min.js',
   './node_modules/angular-ui-grid/ui-grid.min.js',
   'node_modules/angular-aria/angular-aria.min.js',
   'node_modules/angular-material/angular-material.min.js'])
   .pipe(concat('vendors.js'))
   .pipe(gulp.dest('./server/public/vendors/'));
});

gulp.task('copy', function () {
  // gulp.src('./node_modules/angular/angular.min.js')
  // .pipe(gulp.dest('./server/public/vendors/'));
  // gulp.src('./node_modules/angular/angular.min.js.map')
  // .pipe(gulp.dest('./server/public/vendors/'));

  // gulp.src('./node_modules/angular/angular-animate.min.js')
  // .pipe(gulp.dest('./server/public/vendors/'));
  // gulp.src('./node_modules/angular/angular-animate.min.js.map')
  // .pipe(gulp.dest('./server/public/vendors/'));

  // gulp.src('./node_modules/angular/angular-route.min.js')
  // .pipe(gulp.dest('./server/public/vendors/'));
  // gulp.src('./node_modules/angular/angular-route.min.js.map')
  // .pipe(gulp.dest('./server/public/vendors/'));

  // gulp.src('./node_modules/angular-ui-grid/ui-grid.min.js')
  // .pipe(gulp.dest('./server/public/vendors/'));
  // gulp.src('./node_modules/angular-ui-grid/ui-grid.min.css')
  // .pipe(gulp.dest('./server/public/vendors/'));

  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
  .pipe(gulp.dest('./server/public/vendors/'));

  gulp.src('./client/styles/*.css')
  .pipe(gulp.dest('./server/public/assets/styles/'));

  gulp.src('./client/views/**/*.*')
  .pipe(gulp.dest('./server/public/assets/views/'));
});


gulp.task('watch', function () {
  gulp.watch('./client/**/**/*.*', ['copy', 'vendorjs', 'bundle']);
});

gulp.task('default', ['bundle', 'copy', 'vendorjs', 'watch']);
