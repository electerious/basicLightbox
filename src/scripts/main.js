/**
 * Creates an element from a HTML string.
 * @param {String} html
 * @param {?Boolean} children - Return all children instead of the first one.
 * @returns {Node}
 */
const toElement = function(html, children = false) {

	const elem = document.createElement('div')

	elem.innerHTML = html.trim()

	return children === true ? elem.children : elem.firstChild

}

/**
 * Validates and converts content.
 * @param {Node|String} content
 * @returns {Array} content - Validated content.
 */
const validateContent = function(content) {

	const isString = typeof content === 'string'
	const isHTMLElement = content instanceof HTMLElement === true

	if (isString === false && isHTMLElement === false) {

		throw new Error('Content must be a DOM element/node or string')

	}

	if (isString === true) {

		// String
		return Array.from(toElement(content, true))

	} else if (content.tagName === 'TEMPLATE') {

		// Template
		return [ content.content.cloneNode(true) ]

	} else {

		// HTMLElement
		return Array.from(content.children)

	}

}

/**
 * Validates options and sets defaults for undefined properties.
 * @param {?Object} opts
 * @returns {Object} opts - Validated options.
 */
const validateOptions = function(opts = {}) {

	opts = Object.assign({}, opts)

	if (opts.closable == null) opts.closable = true
	if (opts.className == null) opts.className = ''
	if (opts.onShow == null) opts.onShow = () => {}
	if (opts.onClose == null) opts.onClose = () => {}

	if (typeof opts.closable !== 'boolean') throw new Error('Property `closable` must be a boolean')
	if (typeof opts.className !== 'string') throw new Error('Property `className` must be a string')
	if (typeof opts.onShow !== 'function') throw new Error('Property `onShow` must be a function')
	if (typeof opts.onClose !== 'function') throw new Error('Property `onClose` must be a function')

	return opts

}

/**
 * Checks if an element's first child has a specific tag.
 * @param {Node} elem
 * @param {String} tag
 * @returns {Boolean} containsTag
 */
const containsTag = function(elem, tag) {

	const children = elem.children

	return (children.length === 1 && children[0].tagName === tag)

}

/**
 * Checks if a given or any lightbox is visible.
 * @param {?Node} elem
 * @returns {Boolean} visible
 */
export const visible = function(elem) {

	elem = elem || document.querySelector('.basicLightbox')

	return (elem != null && elem.ownerDocument.body.contains(elem) === true)

}

/**
 * Creates a lightbox element.
 * @param {Array} content
 * @param {Object} opts
 * @returns {Node} elem
 */
const render = function(content, opts) {

	const elem = toElement(`
		<div class="basicLightbox ${ opts.className }">
			<div class="basicLightbox__placeholder" role="dialog"></div>
		</div>
	`)

	const placeholder = elem.querySelector('.basicLightbox__placeholder')

	// Move content into lightbox placeholder
	content.forEach((child) => placeholder.appendChild(child))

	// Check if placeholder contains a tag that requires a special treatment
	const img = containsTag(placeholder, 'IMG')
	const video = containsTag(placeholder, 'VIDEO')
	const iframe = containsTag(placeholder, 'IFRAME')

	// Add special treatment class when it only contains an image, a video or iframe.
	// This class is necessary to center the image, video or iframe.
	if (img === true) elem.classList.add('basicLightbox--img')
	if (video === true) elem.classList.add('basicLightbox--video')
	if (iframe === true) elem.classList.add('basicLightbox--iframe')

	return elem

}

/**
 * Shows a lightbox by appending an element to the DOM.
 * @param {Node} elem
 * @param {Function} next - The callback that gets executed when the lightbox starts to show up.
 * @returns {Boolean} success
 */
const show = function(elem, next) {

	document.body.appendChild(elem)

	// Wait a while to ensure that the class change triggers the animation
	setTimeout(() => {
		requestAnimationFrame(() => {

			elem.classList.add('basicLightbox--visible')

			return next()

		})
	}, 10)

	return true

}

/**
 * Closes a lightbox by fading the element out and by removing the element from the DOM.
 * @param {Node} elem
 * @param {Function} next - The callback that gets executed when the lightbox is fully closed.
 * @returns {Boolean} success
 */
const close = function(elem, next) {

	elem.classList.remove('basicLightbox--visible')

	setTimeout(() => {

		// Don't continue to remove lightbox when element missing
		if (visible(elem) === false) return next()

		elem.parentElement.removeChild(elem)

		return next()

	}, 410)

	return true

}

/**
 * Creats a new instance.
 * @param {Node|String} content
 * @param {?Object} opts
 * @returns {Object} instance
 */
export const create = function(content, opts) {

	content = validateContent(content)
	opts = validateOptions(opts)

	// Render the lightbox element
	const elem = render(content, opts)

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

		// Run onShow callback and stop execution when function returns false
		if (opts.onShow(instance) === false) return false

		// Show the lightbox
		return show(elem, () => {

			// Continue with the callback when available
			if (typeof next === 'function') return next(instance)

		})

	}

	// Hide the lightbox
	const _close = (next) => {

		// Run onClose callback and stop execution when function returns false
		if (opts.onClose(instance) === false) return false

		return close(elem, () => {

			// Continue with the callback when available
			if (typeof next === 'function') return next(instance)

		})

	}

	// Close lightbox when clicking the background
	if (opts.closable === true) elem.addEventListener('click', (e) => {

		// If e.target is not the same element as elem,
		// then the user clicked a descendant of the element.
		if (e.target !== elem) return

		// Close lightbox with the instance function
		_close()

	})

	// Assign instance to a variable so the instance can be used
	// elsewhere in the current function.
	const instance = {
		element: _element,
		visible: _visible,
		show: _show,
		close: _close
	}

	return instance

}