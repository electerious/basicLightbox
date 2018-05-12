'use strict'

const name = require('./package.json').moduleName
const gulp = require('gulp')
const tasks = require('@electerious/basictasks')(gulp, name)

const scripts = tasks.scripts({
	from: './src/scripts/main.js',
	to: './dist'
})

const styles = tasks.styles({
	from: './src/styles/main.scss',
	to: './dist'
})

const watch = function() {
	gulp.watch('./src/scripts/**/*.js', [ 'scripts' ])
	gulp.watch('./src/styles/**/*.scss', [ 'styles' ])
}

gulp.task('scripts', scripts)
gulp.task('styles', styles)
gulp.task('default', [ 'scripts', 'styles' ])
gulp.task('watch', [ 'default' ], watch)