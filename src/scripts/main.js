const each = function(data, fn) {

	if (data==null) return false

	if ((data).constructor===Object) return [].forEach.call(Object.keys(data), (key) => fn(data[key], key, data))
	else                             return [].forEach.call(data, (item, i) => fn(item, i, data))

}

const stopEvent = function(e) {

	if (typeof e.stopPropagation === 'function') e.stopPropagation()
	if (typeof e.preventDefault === 'function')  e.preventDefault()

}

const bindShow = function(elem, opts) {

	elem.onclick = function(e) {

		let id          = this.getAttribute('data-lightBox-show')
		let contentElem = document.querySelector(`[data-lightBox="${ id }"]`)

		stopEvent(e)
		show(contentElem.outerHTML, opts)

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

	return opts

}

const render = function(html = '') {

	return (`
		<div class="lightBox">
			<div class="lightBox__close"></div>
			<div class="lightBox__placeholder">${ html }</div>
		</div>
	`)

}

export const visible = function() {

	let elem = document.querySelector('.lightBox--visible')

	return (elem==null ? false : true)

}

export const exists = function() {

	let elem = document.querySelector('.lightBox')

	return (elem==null ? false : true)

}

export const show = function(html, opts) {

	// Validate options
	opts  = validate(opts)

	// Run beforeShow event
	// Stop execution when function returns false
	if (opts.beforeShow()===false) return false

	// Append lightbox to DOM
	document.body.insertAdjacentHTML('beforeend', render(html))

	// Get the newly created lightbox element
	let elem = document.querySelector('.lightBox')

	// Bind close element
	if (opts.closable===true) bindClose(elem.querySelector('.lightBox__close'), opts)

	// Wait a while to ensure that the class change triggers the animation
	setTimeout(() => {
		requestAnimationFrame(() => {

			// Show lightbox
			elem.classList.add('lightBox--visible')

			// Run afterShow event
			opts.afterShow()

		})
	}, 10)

}

export const close = function(opts) {

	// Validate options
	opts  = validate(opts)

	// Run beforeClose event
	// Stop execution when function returns false
	if (opts.beforeClose()===false) return false

	// Get the lightbox element
	let elem = document.querySelector('.lightBox')

	// Don't continue to hide lightbox when element not visible
	if (visible()===false) return false

	// Hide lightbox
	elem.classList.remove('lightBox--visible')

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
	if (elems==null)               elems = document.querySelectorAll('[data-lightBox-show]')

	each(elems, (elem) => bindShow(elem, opts))

}