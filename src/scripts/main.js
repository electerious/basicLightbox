const stopEvent = function(e) {

	if (typeof e.stopPropagation === 'function') e.stopPropagation()
	if (typeof e.preventDefault === 'function')  e.preventDefault()

}

const bindShow = function(elem, opts) {

	elem.onclick = function(e) {

		let id          = this.getAttribute('data-basicLightbox-show')
		let contentElem = document.querySelector(`[data-basicLightbox="${ id }"]`)
		let html        = contentElem.outerHTML

		stopEvent(e)
		show(html, opts)

	}

}

const bindClose = function(elem, opts) {

	elem.onclick = function(e) {

		stopEvent(e)
		close(opts)

	}

}

const validate = function(opts = {}) {

	if (opts.closable!==false) opts.closable = true

	if (typeof opts.beforeShow !== 'function') opts.beforeShow = () => {}
	if (typeof opts.afterShow !== 'function')  opts.afterShow = () => {}

	if (typeof opts.beforeClose !== 'function') opts.beforeClose = () => {}
	if (typeof opts.afterClose !== 'function')  opts.afterClose = () => {}

	if (typeof opts.beforeHTML === 'function') opts.beforeHTML = opts.beforeHTML()
	if (typeof opts.afterHTML === 'function')  opts.afterHTML = opts.afterHTML()

	if (typeof opts.beforeHTML !== 'string') opts.beforeHTML = ''
	if (typeof opts.afterHTML !== 'string')  opts.afterHTML = ''

	if (typeof opts.beforePlaceholder === 'function') opts.beforePlaceholder = opts.beforePlaceholder()
	if (typeof opts.afterPlaceholder === 'function')  opts.afterPlaceholder = opts.afterPlaceholder()

	if (typeof opts.beforePlaceholder !== 'string') opts.beforePlaceholder = ''
	if (typeof opts.afterPlaceholder !== 'string')  opts.afterPlaceholder = ''

	return opts

}

const render = function(html = '', opts) {

	return (`
		<div class="basicLightbox">
			<div class="basicLightbox__close"></div>
			${ opts.beforePlaceholder }
			<div class="basicLightbox__placeholder">
				${ opts.beforeHTML }
				${ html }
				${ opts.afterHTML }
			</div>
			${ opts.afterPlaceholder }
		</div>
	`)

}

export const exists = function() {

	let elem = document.querySelector('.basicLightbox')

	return (elem==null ? false : true)

}

export const visible = function() {

	let elem = document.querySelector('.basicLightbox--visible')

	return (elem==null ? false : true)

}

export const show = function(html, opts) {

	// Validate options
	opts = validate(opts)

	// Run beforeShow event
	// Stop execution when function returns false
	if (opts.beforeShow()===false) return false

	// Append lightbox to DOM
	document.body.insertAdjacentHTML('beforeend', render(html, opts))

	// Get the newly created lightbox element
	let elem = document.querySelector('.basicLightbox')

	// Bind close element
	if (opts.closable===true) bindClose(elem.querySelector('.basicLightbox__close'), opts)

	// Wait a while to ensure that the class change triggers the animation
	setTimeout(() => {
		requestAnimationFrame(() => {

			// Show lightbox
			elem.classList.add('basicLightbox--visible')

			// Run afterShow event
			opts.afterShow()

		})
	}, 10)

}

export const close = function(opts) {

	// Validate options
	opts = validate(opts)

	// Run beforeClose event
	// Stop execution when function returns false
	if (opts.beforeClose()===false) return false

	// Get the lightbox element
	let elem = document.querySelector('.basicLightbox')

	// Don't continue to hide lightbox when element not visible
	if (visible()===false) return false

	// Hide lightbox
	elem.classList.remove('basicLightbox--visible')

	setTimeout(() => {
		requestAnimationFrame(() => {

			// Don't continue to remove lightbox when element missing
			if (exists()===false) return false

			// Remove lightbox from DOM
			elem.parentElement.removeChild(elem)

			// Run afterClose event
			opts.afterClose()

		})
	}, 410)

}

export const init = function(elems, opts) {

	if (typeof elems === 'string') elems = document.querySelectorAll(elems)
	if (elems==null)               elems = document.querySelectorAll('[data-basicLightbox-show]')

	Array.prototype.forEach.call(elems, (elem) => bindShow(elem, opts))

}