const each = function(data, fn) {

	if (data==null) return false

	if ((data).constructor===Object) return [].forEach.call(Object.keys(data), (key) => fn(data[key], key, data))
	else                             return [].forEach.call(data, (item, i) => fn(item, i, data))

}

const stopEvent = function(e) {

	if (typeof e.stopPropagation === 'function') e.stopPropagation()
	if (typeof e.preventDefault === 'function')  e.preventDefault()

}

const bindShow = function(elem) {

	elem.onclick = function(e) {

		let id          = this.getAttribute('data-lightBox-show')
		let contentElem = document.querySelector(`[data-lightBox="${ id }"]`)

		stopEvent(e)
		show(contentElem.outerHTML)

	}

}

const bindClose = function(elem) {

	elem.onclick = function(e) {

		stopEvent(e)
		close()

	}

}

const render = function(html = '') {

	return `
	       <div class="lightBox">
	           <div class="lightBox__close"></div>
	           <div class="lightBox__placeholder">${ html }</div>
	       </div>
	       `

}

export const visible = function() {

	let elem = document.querySelector('.lightBox--visible')

	return (elem==null ? false : true)

}

export const exists = function() {

	let elem = document.querySelector('.lightBox')

	return (elem==null ? false : true)

}

export const show = function(html) {

	// Append lightbox to DOM
	document.body.insertAdjacentHTML('beforeend', render(html))

	// Get the newly created lightbox element
	let elem = document.querySelector('.lightBox')

	// Bind close element
	bindClose(document.querySelector('.lightBox__close'))

	// Wait a while to ensure that the class change triggers the animation
	setTimeout(() => {
		requestAnimationFrame(() => {

			// Show lightbox
			elem.classList.add('lightBox--visible')

		})
	}, 10)

}

export const close = function() {

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

		})
	}, 410)

}

export const init = function(elems) {

	elems = elems || document.querySelectorAll('[data-lightBox-show]')

	each(elems, (elem) => bindShow(elem))

}