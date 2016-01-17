# gulp-whitespace

A simple gulp plugin that strips and converts white-space in text- and code-
files.

Copyright © 2016, Jürg Lehni.

```js
var gulp = require('gulp');
var whitespace = require('gulp-whitespace');

gulp.task('whitespace', function() {
    return gulp.src('./src/*.js')
        .pipe(whitespace({
            spacesToTabs: 4,
            removeTrailing: true
        }))
        .pipe(gulp.dest('./dest'));
});
```
