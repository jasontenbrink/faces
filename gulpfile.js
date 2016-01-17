var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('merge', function() {
    gulp.src('./client/scripts/*.js')
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('./server/public/assets/scripts/'));

    gulp.src('./client/scripts/factories/*.js')
      .pipe(concat('factories.min.js'))
      .pipe(gulp.dest('./server/public/assets/scripts/'));

    gulp.src('./client/scripts/directives/*.js')
      .pipe(concat('directives.min.js'))
      .pipe(gulp.dest('./server/public/assets/scripts/'));

    gulp.src('./client/scripts/controllers/*.js')
      .pipe(concat('controllers.min.js'))
      .pipe(gulp.dest('./server/public/assets/scripts/'));
});

//only used for deploying to a public domain
gulp.task('uglify', function() {
  gulp.src('./server/public/assets/scripts/**')
    .pipe(uglify())
    .pipe(gulp.dest('./server/public/assets/scripts/'));
});

gulp.task('copy', function () {
  gulp.src('./node_modules/angular/angular.min.js')
  .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./node_modules/angular/angular.min.js.map')
  .pipe(gulp.dest('./server/public/vendors/'));

  gulp.src('./node_modules/angular/angular-animate.min.js')
  .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./node_modules/angular/angular-animate.min.js.map')
  .pipe(gulp.dest('./server/public/vendors/'));

  gulp.src('./node_modules/angular/angular-route.min.js')
  .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./node_modules/angular/angular-route.min.js.map')
  .pipe(gulp.dest('./server/public/vendors/'));

  gulp.src('./node_modules/angular/ui-grid.min.js')
  .pipe(gulp.dest('./server/public/vendors/'));
  gulp.src('./node_modules/angular/ui-grid.min.css')
  .pipe(gulp.dest('./server/public/vendors/'));

  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
  .pipe(gulp.dest('./server/public/vendors/'));

  gulp.src('./client/styles/*.css')
  .pipe(gulp.dest('./server/public/assets/styles/'));

  gulp.src('./client/views/**/*.*')
  .pipe(gulp.dest('./server/public/assets/views/'));

  // gulp.src('./client/views/')
  // .pipe(gulp.dest('./server/public/assets/views/'));
});


gulp.task('watch', function () {
  gulp.watch('./client/**/**/*.*', ['copy', 'merge']);
});

gulp.task('default', ['merge', 'copy', 'watch']);
