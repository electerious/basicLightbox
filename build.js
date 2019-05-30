'use strict'

const { writeFile, readFile } = require('fs')
const { promisify } = require('util')
const js = require('rosid-handler-js')
const sass = require('rosid-handler-sass')
const save = promisify(writeFile)
const read = promisify(readFile)

// Just reads in the file right now to match pattern fo other build tools 
const types = (typeDefs) => {	
	return read(typeDefs)
}

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

types('src/types/basicLightbox.d.ts').then((data) => {

	return save('dist/basicLightbox.min.d.ts', data)
	
})
