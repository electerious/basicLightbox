'use strict'

const { writeFile } = require('fs').promises
const js = require('rosid-handler-js')
const sass = require('rosid-handler-sass')

sass('src/styles/main.scss', {

	optimize: true

}).then((data) => {

	return writeFile('dist/basicLightbox.min.css', data)

})

js('src/scripts/main.js', {

	optimize: true,
	browserify: {
		standalone: 'basicLightbox'
	}

}).then((data) => {

	return writeFile('dist/basicLightbox.min.js', data)

})