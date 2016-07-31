"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');
var image = require('gulp-image');
var del = require('del');
var gutil = require('gulp-util');

 // CONCAT AND MINIFY SCRIPTS
gulp.task("concatScripts", function() {
    return gulp.src([
        'js/jquery.js'
        , 'js/fastclick.js'
        , 'js/foundation.js'
        , 'js/foundation.equalizer.js'
        , 'js/foundation.reveal.js'
        , 'js/scripts.js'
    ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/app.js")
    .pipe(uglify()
        .on('error', function(e){
            console.log(e);
         })
     )
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

// CONCAT AND MINIFY CSS
gulp.task("concatCSS", function() {
    return gulp.src([
        'css/normalize.css'
        , 'css/foundation.css'
        , 'css/basics.css'
        , 'css/menu.css'
        , 'css/hero.css'
        , 'css/photo-grid.css'
        , 'css/modals.css'
        , 'css/footer.css'
    ])
    .pipe(maps.init())
    .pipe(concat('main.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task("minifyCSS", ["concatCSS"], function() {
  return gulp.src("css/main.css")
    .pipe(uglifycss())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('css'));
});

// COMPRESS IMAGE
// ------- This keeps one triggering the EPIPE error. I'm not quite sure how to solve this. -------

// gulp.task('compressImage', function () {
//   gulp.src('img/**/*.{jpg,png}')
//     .pipe(image().on('error', function(e){
//         console.trace(e);
//     }))
//     .pipe(gulp.dest('img'));
// });


gulp.task('clean', function() {
  del(['dist', 'css/main*.css*', 'js/app*.js*']);
});

gulp.task("build", ['minifyScripts', 'minifyCSS'], function() {
  return gulp.src(["js/app.min.js", "css/main.min.css", 'index.html',
                   "img/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});

process.on('uncaughtException', function(error) {
    console.log(error);
    process.exit(1)
});
