const less = require('gulp-less');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const webserver = require('gulp-webserver');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('js', () =>
    gulp.src('js/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('dist/js'))
);

gulp.task('less', function() {
    return gulp.src('./styles/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'styles', 'partials')]
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('jsx', function () {
    return browserify({entries: './source/app/app.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: 'http://localhost:8000/index.html'
        }));
});

gulp.task('watch', function() {
    gulp.watch('styles/**/*.less', ['less']);
    gulp.watch('js/**/*.js', ['js']);
    gulp.watch('source/**/*.jsx', ['jsx']);
    gulp.src('dist')
        .pipe(webserver({
            open: 'http://localhost:8000/index.html'
        }));
});

gulp.task('default', ['js', 'jsx', 'less', 'watch']);




