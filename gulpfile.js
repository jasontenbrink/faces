var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('vendorjs', function(){
  gulp.src(['./node_modules/angular/angular.min.js',
   './node_modules/angular-animate/angular-animate.min.js',
   './node_modules/angular-route/angular-route.min.js',
   './node_modules/angular-ui-grid/ui-grid.min.js',
   'node_modules/angular-aria/angular-aria.min.js',
   'node_modules/angular-material/angular-material.min.js',
   'node_modules/react/dist/react.min.js',
   'node_modules/react-dom/dist/react-dom.min.js',
   'node_modules/ngreact/ngReact.min.js'
  ])
   .pipe(concat('vendors.js'))
   .pipe(gulp.dest('./server/public/vendors/'));
});

gulp.task('copy', function () {
  gulp.src('./client/images/*.*')
  .pipe(gulp.dest('./server/public/assets/images/'))

  gulp.src('./client/styles/*.css')
  .pipe(gulp.dest('./server/public/assets/styles/'));

  gulp.src('./client/views/**/*.*')
  .pipe(gulp.dest('./server/public/assets/views/'));

  gulp.src('node_modules/angular-material/angular-material.min.css')
  .pipe(gulp.dest('./server/public/vendors/'));
});


gulp.task('watch', function () {
  gulp.watch([
    './client/**/**/*.html', 
    './client/**/*.css',
  ], 
  ['copy', 'vendorjs']);
});

gulp.task('default', ['copy', 'vendorjs']);
