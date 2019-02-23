'use strict'

const { writeFile } = require('fs')
const { promisify } = require('util')
const js = require('rosid-handler-js')
const sass = require('rosid-handler-sass')
const save = promisify(writeFile)

sass('src/styles/main.scss', {

	optimize: true

}).then((data) => {

	return save('dist/basicLightbox.min.css', data)

})

js('src/scripts/main.js', {

	optimize: true,
	browserify: {
		standalone: 'basicLightbox'
	}

}).then((data) => {

	return save('dist/basicLightbox.min.js', data)

})