var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });

    gulp.watch("*.html").on("change", reload);
});

gulp.task('icons', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('./src/webfonts/'));
});