'use strict'

import gulp from 'gulp'

gulp.task('default', () => {
  return gulp.src('index.js')
  .pipe(gulp.dest('dist'))
})
