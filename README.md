# basicLightbox

[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CYKBESW577YWE)

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
| Default | Includes most features. | [Try it on CodePen](https://codepen.io/electerious/pen/rLBvGz) |
| DOM elements/nodes | Use DOM elements/nodes in basicLightbox. | [Try it on CodePen](https://codepen.io/electerious/pen/pOBLxQ) |
| Create element | Use `.createElement()` with basicLightbox. | [Try it on CodePen](https://codepen.io/electerious/pen/wEZmQy) |
| Events | Multiple ways to handle events. | [Try it on CodePen](https://codepen.io/electerious/pen/pOBLQQ) |

## Features

- Works in all modern browsers and IE11 ([with polyfills](#requirements))
- Supports images, videos, iframes and any kind of HTML
- Creates a lightbox from a string or from a DOM element/node
- Zero dependencies
- CommonJS and AMD support
- Simple JS API

## Requirements

basicLightbox depends on the following browser features and APIs:

- [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [Node​List​.prototype​.for​Each](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach)
- [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

Some of these APIs are capable of being polyfilled in older browsers. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.

## Setup

We recommend installing basicLightbox using [npm](https://npmjs.com) or [yarn](https://yarnpkg.com).

```sh
npm install basiclightbox
```

```sh
yarn add basiclightbox
```

Include the CSS file in the `head` tag and the JS file at the end of your `body` tag…

```html
<link rel="stylesheet" href="dist/basicLightbox.min.css">
```

```html
<script src="dist/basicLightbox.min.js"></script>
```

…or skip the JS file and use basicLightbox as a module:

```js
const basicLightbox = require('basiclightbox')
```

```js
import * as basicLightbox from 'basiclightbox'
```

## API

### .create(content, opts)

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

```js
const instance = basicLightbox.create(
	document.querySelector('#template')
)
```

Parameters:

- `content` `{Node|String}` Content of the lightbox.
- `opts` `{?Object}` An object of [options](#options).

Returns:

- `{Object}` The created instance.

### .visible()

Returns `true` when a lightbox is visible. Also returns `true` when a lightbox is currently in the process of showing/hiding and not fully visible/hidden, yet.

Example:

```js
const visible = basicLightbox.visible()
```

Returns:

- `{Boolean}` Visibility of any lightbox.

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

- `cb(instance)` `{?Function}` A function that gets executed as soon as the lightbox starts to fade in.

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

- `cb(instance)` `{?Function}` A function that gets executed as soon as the lightbox has been faded out.

### .visible()

Returns `true` when the lightbox instance is visible. Also returns `true` when the lightbox is currently in the process of showing/hiding and not fully visible/hidden, yet.

Example:

```js
const visible = instance.visible()
```

Returns:

- `{Boolean}` Visibility of lightbox.

### .element()

Returns the DOM element/node associated with the instance.

Example:

```js
const elem = instance.element()
```

Returns:

- `{Node}` DOM element/node associated with the instance.

## Options

The option object can include the following properties:

```js
{
	/*
	 * Prevents the lightbox from closing when clicking its background.
	 */
	closable: true,
	/*
	 * One or more space separated classes to be added to the basicLightbox element.
	 */
	className: '',
	/*
	 * Function that gets executed before the lightbox will be shown.
	 * Returning false will prevent the lightbox from showing.
	 */
	onShow: (instance) => {},
	/*
	 * Function that gets executed before the lightbox closes.
	 * Returning false will prevent the lightbox from closing.
	 */
	onClose: (instance) => {}
}
```

Import `src/styles/main.scss` directly to customize the look of basicLightbox:

```scss
$basicLightbox__background: rgba(0, 0, 0, .8); // Background color
$basicLightbox__zIndex: 1000; // Stack order
$basicLightbox__duration: .4s; // Transition duration
$basicLightbox__timing: ease; // Transition timing

@import 'src/styles/main';
```