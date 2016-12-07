var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint');

var tsProject = tsc.createProject('tsconfig.json');

var config = {
    src: 'src/**/*.ts',
    dest: 'src/'
};

gulp.task('compile-ts', function () {
    var tsResult = gulp.src(config.src)
        //.pipe(sourcemaps.init())
        .pipe(tsProject());

    tsResult.dts.pipe(gulp.dest(config.dest));
    return tsResult.js
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest));
});

gulp.task('ts-lint', function () {
    return gulp.src(config.src).pipe(tslint()).pipe(tslint.report('prose'));
});

gulp.task('watch', function() {
    gulp.watch([config.src], ['ts-lint', 'compile-ts']);
});

gulp.task('default', ['ts-lint', 'compile-ts']);
