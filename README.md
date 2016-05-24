# basicLightbox

The lightest lightbox ever made.

## Contents

- [Demos](#demos)
- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [API](#api)
- [Instance API](#instance-api)
- [Options](#options)

## Demos

| Name | Description | Link |
|:-----------|:------------|:------------|
| Default | Includes all features. | [Demo](http://codepen.io/electerious/pen/oxLZwq) |
| Thumbnails | Shows a big version of a photo after clicking its thumbnail. | [Demo](demos/thumbnails.html) |

## Features

- Works in all modern browsers
- Zero dependencies
- CommonJS and AMD support
- Works with images, videos, iframes and any kind of HTML
- Simple JS API

## Requirements

basicLightbox dependents on the following browser APIs:

- [classList](https://dom.spec.whatwg.org/#dom-element-classlist)
- [Pointer Events](https://www.w3.org/TR/pointerevents/)
- [Flexible Box Layout Module](https://www.w3.org/TR/css3-flexbox/)
- [Object.assign](http://www.ecma-international.org/ecma-262/6.0/#sec-object.assign)

Some of these APIs are capable of being polyfilled in older browser. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.

## Setup

We recommend to install basicLightbox using [Bower](http://bower.io/) or [npm](https://npmjs.com).

```sh
bower install basicLightbox
```

```sh
npm install basiclightbox
```

Include the CSS-file in the `head` and the JS-file at the end of your `body`…

```html
<link rel="stylesheet" href="dist/basicLightbox.min.css">
```

```html
<script src="dist/basicLightbox.min.js"></script>
```

…or skip the JS-file and use basicLightbox as module:

```js
const basicLightbox = require('basiclightbox')
```

## API

### .create(html, opts)

Creates a new basicLightbox instance.

Be sure to assign your instance to a variable. Using your instance, you can…

* …show and hide the lightbox.
* …check if the the lightbox is visible.
* …modify the content of the lightbox.

Examples:

```js
const instance = basicLightbox.create(`
	<h1>Dynamic Content</h1>
	<p>You can set the content of the lightbox with JS.</p>
`)
```

```js
const instance = basicLightbox.create(`
	<h1>Not closable</h1>
	<p>It's not possible to close this lightbox with a click.</p>
`, {
	closable: false
})
```

Parameters:

- `html` `{string}` Content of the lightbox.
- `opts` `{Object | null}` An object of [options](#options).

### .visible()

Returns `true` when a lightbox is visible. Also returns `true` when a lightbox is currently in the process of showing/hiding and not fully visible/hidden, yet.

Example:

```js
const visible = basicLightbox.visible()
```

## Instance API

Each basicLightbox instance has a handful of handy functions. Below are all of them along with a short description.

### .show(cb)

Shows a lightbox instance.

Examples:

```js
instance.show()
```

```js
instance.show(() => console.log('lightbox now visible'))
```

Parameters:

- `cb(instance)` `{function | null}` A function that gets executed as soon as the lightbox starts to fade in.

### .close(cb)

Closes a lightbox instance.

Examples:

```js
instance.close()
```

```js
instance.close(() => console.log('lightbox not visible anymore'))
```

Parameters:

- `cb(instance)` `{function | null}` A function that gets executed as soon as the lightbox has been faded out.

### .visible()

Returns `true` when the lightbox instance is visible. Also returns `true` when the lightbox is currently in the process of showing/hiding and not fully visible/hidden, yet.

Example:

```js
const visible = instance.visible()
```

### .element()

Returns the Node object associated with the instance.

Example:

```js
const elem = instance.element()
```

## Options

The option-object can include the following properties:

```js
{
	/*
	 * Prevents the lightbox from closing when clicking its background.
	 */
	closable: true,
	/*
	 * One or more space-separated classes to be added to the basicLightbox element.
	 * Must be a string or a function which returns a string.
	 */
	className: null,
	/*
	 * Callback functions.
	 * Returning false will stop the caller function and prevent the lightbox from showing or closing.
	 */
	beforeShow  : (instance) => {},
	afterShow   : (instance) => {},
	beforeClose : (instance) => {},
	afterClose  : (instance) => {},
	/*
	 * String containing HTML or function which returns a string of HTML.
	 * Will be added before or after the content-placeholder of the lightbox.
	 */
	beforePlaceholder : '',
	afterPlaceholder  : ''
}
```