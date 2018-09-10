var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var sass = require("gulp-sass");
var clean = require("gulp-clean");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var htmlmin = require('gulp-htmlmin');

gulp.task("server", function() {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });

  gulp.watch("*.html").on("change", reload);
});

gulp.task("icons", function() {
  return gulp
    .src("node_modules/@fortawesome/fontawesome-free/webfonts/*")
    .pipe(gulp.dest("./src/webfonts/"));
});

gulp.task("default", ["clean"], function() {
  gulp.start("htmlmin", "copy-webfonts", "sass", "imagemin", "uglify");
});

gulp.task("clean", function() {
  return gulp.src("dist/*").pipe(clean());
});

gulp.task("copy", function() {
  return gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

gulp.task('htmlmin', () => {
    return gulp.src('src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'));
  });

gulp.task("copy-webfonts", function() {
  return gulp.src("src/webfonts/*").pipe(gulp.dest("dist/webfonts"));
});

gulp.task("sass", function() {
  return gulp
    .src("src/sass/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("imagemin", function() {
  return gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

gulp.task("uglify", function() {
  return gulp
    .src("src/js/*")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});
