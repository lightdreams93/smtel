var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    minify = require('gulp-minify'),
    rigger = require('gulp-rigger')

function css_sass(done) {
    gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/assets/css/'))
    done();
}

function min_js(done) {
    gulp.src('./js/*.js')
        .pipe(minify({
            compress: true
        }))
        .pipe(gulp.dest('./build/assets/js'));
    done();
}

function compile_html(done) {
    gulp.src('./pages/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('build/'));
    done();
}

function watch() {
    gulp.watch('./scss/**/*.scss', css_sass);
    gulp.watch('./js/**/*.js', min_js);
    gulp.watch('./pages/**/*.html', compile_html);
}

gulp.task('default', gulp.series(compile_html, css_sass, min_js, watch));