'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');
var scssFiles = [
  './scss/main.scss'
];

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./js/**/*.js', gulp.series('js:dev'));
  gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});

gulp.task('sass:dev', function() {
  return gulp.src(scssFiles)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browserlist: ['last 2 versions'],
      cacade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});

gulp.task('sass', function() {
  return gulp.src(scssFiles)
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(sass())
  .pipe(gulp.dest('dist/css'));
});

gulp.task('js:dev', function() {
  return gulp.src('./js/*.js')
  .pipe(sourcemaps.init())
  .pipe(jshint())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist/js'))
  .pipe(livereload());
});

gulp.task('js', function () {
  return gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('twig', function() {
  return gulp.src('./template/**/*/html.twig')
  .pipe(livereload());
});

gulp.task('images', function() {
  return gulp.src('./images/*')
  .pipe(gulp.dest('./dist/images'));
});

gulp.task('dev', gulp.parallel('sass:dev', 'images', 'js:dev'));
gulp.task('default', gulp.parallel('sass', 'images', 'js'));
