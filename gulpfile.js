//Require Gulp
var gulp = require('gulp');
//Require Gulp Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var livereload = require('gulp-livereload');
var del = require('del');

//compile sass task
gulp.task('styles', function() {
    return gulp.src('public/scss/styles.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('public/dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('public/dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete'}));
});

//concat and minify scripts
gulp.task('scripts', function() {
    return gulp.src('public/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/assets/js'))
    .pipe(notify({message: 'Scripts task complete'}));
});

//Compress Images
gulp.task('images', function() {
    return gulp.src('public/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

//Clean dist folder before build
gulp.task('clean', function() {
    return del(['public/dist/assets/css', 'public/dist/assets/js', 'public/dist/assets/img']);
});

//Default task that runs styles, scripts and images tasks
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

//watch task
gulp.task('watch', function() {
    //watch .scss files
    gulp.watch('public/scss/**/*.scss', ['styles']);
    //watch .js files
    gulp.watch('public/js/**/*.js', ['scripts']);
    //watch image files
    gulp.watch('public/images/**/*', ['images']);
    //watch HTML files
    gulp.watch('public/views/**/*.html');

    //Create LiveReload server
    livereload.listen();
    //watch any files in dist/, reload on change
    gulp.watch(['public/dist/**']).on('change', livereload.changed);

});
