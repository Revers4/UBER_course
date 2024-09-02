const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync')


gulp.task('server', function() {
  browserSync.init({
      server: {
          baseDir: "src"
      }
  });
});


gulp.task('styles', function(){
  return gulp.src("src/sass/*.+(scss|sass)")
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream())
})

gulp.task('watch', function(){
  gulp.watch('src/sass/*.+(scss|sass)',gulp.parallel("styles"))
  gulp.watch('src/*.html').on("change",browserSync.reload)
})

gulp.task('default', gulp.parallel('watch','server',"styles"))

// const paths = {
//   styles: {
//     src: 'src/sass/*.+(scss|sass)',
//     dest: 'dist/css/'
//   },
//   scripts:{
//     src: 'src/styles/**/*.js',
//     dest: 'dist/js/'
//   }
// }

// function clean(){
//   return del(['dist'])
// }

// function styles() {
//   return gulp.src(paths.styles.src)
//   .pipe(sass().on('error', sass.logError))
//   .pipe(gulp.dest(paths.styles.dest))
// }

// exports.clean = clean
// exports.styles = styles