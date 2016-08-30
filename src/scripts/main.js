/**
 * Stops event propagation and prevents the default event action.
 * @param {Object} e - DOM event.
 */
const stopEvent = function(e) {

	if (typeof e.stopPropagation==='function') e.stopPropagation()
	if (typeof e.preventDefault==='function')  e.preventDefault()

}

/**
 * Validates options and sets defaults for undefined properties.
 * @param {?Object} opts
 * @returns {Object} opts - Validated options.
 */
const validate = function(opts = {}) {

	opts = Object.assign({}, opts)

	if (opts.closable!==false) opts.closable = true

	if (typeof opts.className==='function') opts.className = opts.className()
	if (typeof opts.className!=='string')   opts.className = null

	if (typeof opts.beforeShow!=='function')  opts.beforeShow = () => {}
	if (typeof opts.afterShow!=='function')   opts.afterShow = () => {}
	if (typeof opts.beforeClose!=='function') opts.beforeClose = () => {}
	if (typeof opts.afterClose!=='function')  opts.afterClose = () => {}

	if (typeof opts.beforePlaceholder==='function') opts.beforePlaceholder = opts.beforePlaceholder()
	if (typeof opts.beforePlaceholder!=='string')   opts.beforePlaceholder = ''

	if (typeof opts.afterPlaceholder==='function') opts.afterPlaceholder = opts.afterPlaceholder()
	if (typeof opts.afterPlaceholder!=='string')   opts.afterPlaceholder = ''

	return opts

}

/**
 * Checks if a DOM element's first child is an IMG tag.
 * @param {Node} elem
 * @returns {Boolean} containsIMG
 */
const containsIMG = function(elem) {

	const children = elem.children

	return (children.length===1 && children[0].tagName==='IMG' ? true : false)

}

/**
 * Checks if a given or any lightbox element is visible.
 * @param {?Node} elem
 * @returns {Boolean} visible
 */
export const visible = function(elem) {

	elem = elem || document.querySelector('.basicLightbox')

	return (elem!=null && elem.ownerDocument.body.contains(elem)===true ? true : false)

}

/**
 * Creates a lightbox DOM element.
 * @param {?String} html - Lightbox content.
 * @param {Object} opts
 * @returns {Node} elem
 */
const render = function(html = '', opts) {

	const elem = document.createElement('div')

	// Add the default class
	elem.classList.add('basicLightbox')

	// Add a custom class when available
	if (opts.className!=null) elem.classList.add(opts.className)

	// Add lightbox content
	elem.innerHTML = `
		${ opts.beforePlaceholder }
		<div class="basicLightbox__placeholder" role="dialog">
			${ html }
		</div>
		${ opts.afterPlaceholder }
	`

	// Check if placeholder contains only an image
	const img = containsIMG(elem.querySelector('.basicLightbox__placeholder'))

	// Add img class to lightbox when it only contains an image
	// This class is necessary to center the image properly
	if (img===true) elem.classList.add('basicLightbox--img')

	return elem

}

/**
 * Shows a lightbox by appending a DOM element to the DOM.
 * @param {Node} elem
 * @param {Function} next - The callback that gets executed when the lightbox starts to show up.
 * @returns {Boolean} success
 */
const show = function(elem, next) {

	// Append lightbox to DOM
	document.body.appendChild(elem)

	// Wait a while to ensure that the class change triggers the animation
	setTimeout(() => {
		requestAnimationFrame(() => {

			// Show lightbox
			elem.classList.add('basicLightbox--visible')

			// Continue with the callback
			return next()

		})
	}, 10)

	return true

}

/**
 * Closes a lightbox by fading the element out and by removing the DOM element from the DOM.
 * @param {Node} elem
 * @param {Function} next - The callback that gets executed when the lightbox is fully closed.
 * @returns {Boolean} success
 */
const close = function(elem, next) {

	// Hide lightbox
	elem.classList.remove('basicLightbox--visible')

	setTimeout(() => {
		requestAnimationFrame(() => {

			// Don't continue to remove lightbox when element missing
			if (visible(elem)===false) return next()

			// Remove lightbox from DOM
			elem.parentElement.removeChild(elem)

			// Continue with the callback
			return next()

		})
	}, 410)

	return true

}

/**
 * Creats a new instance.
 * @param {?String} html - Lightbox content.
 * @param {?Object} opts
 * @returns {Object} instance
 */
export const create = function(html, opts) {

	// Validate options
	opts = validate(opts)

	// Render the lightbox element
	const elem = render(html, opts)

	// Returns the lightbox element
	const _element = () => {

		return elem

	}

	// Check if the lightbox is attached to the DOM
	const _visible = () => {

		return visible(elem)

	}

	// Show the lightbox
	const _show = (next) => {

		// Run beforeShow event
		// Stop execution when function returns false
		if (opts.beforeShow(instance)===false) return false

		// Show the lightbox
		return show(elem, () => {

			// Run afterShow event
			opts.afterShow(instance)

			// Continue with the callback when available
			if (typeof next==='function') return next(instance)

		})

	}

	// Hide the lightbox
	const _close = (next) => {

		// Run beforeClose event
		// Stop execution when function returns false
		if (opts.beforeClose(instance)===false) return false

		return close(elem, () => {

			// Run afterClose event
			opts.afterClose(instance)

			// Continue with the callback when available
			if (typeof next==='function') return next(instance)

		})

	}

	// Close lightbox when clicking the background
	if (opts.closable===true) elem.onclick = function(e) {

		// If e.target is not the same element as this,
		// then the user clicked a descendant of the element
		if (e.target!==this) return

		// Close lightbox with the instance function
		_close()

		// Prevent default event and propagation
		stopEvent(e)

	}

	// Assign instance to a variable so the instance can be used
	// elsewhere in the current function
	const instance = {
		element : _element,
		visible : _visible,
		show    : _show,
		close   : _close
	}

	return instance

}