# basicLightbox

The lightest lightbox ever made.

## Contents

- [Demos](#demos)
- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [How to use](#how-to-use)
- [Functions](#functions)
	- [Init](#init)
	- [Show](#show)
	- [Close](#close)
	- [Exists](#exists)
	- [Visible](#visible)
- [Options](#options)

## Demos

| Name | Description | Link |
|:-----------|:------------|:------------|
| Default | Includes all features. | [Demo](#) |

## Features

- Works in all modern browsers
- Zero dependencies
- CommonJS and AMD support
- Works with images, videos, iframes and any kind of HTML
- Simple JS functions to show and hide the lightbox

## Requirements

basicLightbox dependents on the following browser APIs:

- [classList](http://caniuse.com/#feat=classlist)
- [Flexible Box Layout Module](http://caniuse.com/#feat=flexbox)

Some of these APIs are capable of being polyfilled in older browser. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.

## Setup

We recommend to install basicLightbox using [Bower](http://bower.io/) or [npm](https://npmjs.com).

```sh
bower install basicLightbox
```
```sh
npm install basiclightbox
```

Include the CSS-file in the `head` and the JS-file at the end of your `body`:

```html
<link rel="stylesheet" href="dist/basicLightbox.min.css">
```
```html
<script src="dist/basicLightbox.min.js"></script>
```

Skip the JS-file if you want to use basicLightbox as module together with [Browserify](http://browserify.org):

```js
let basicLightbox = require('basiclightbox')
```

## How to use

There're two ways of using basicLightbox:
- Link elements using the `data-basicLightbox-show` and `data-basicLightbox` attribute.
- Manually show and hide the lightbox using the available [functions](#functions).

This chapter will explain how to link elements as using the API explains itself.

First we need to create the button which should show a lightbox when clicked. This could be an element of any kind, but it must have the `data-basicLightbox-show` attribute with a unique ID.

```html
<a href="#" data-basicLightbox-show="0">photo</a>
```

Now we create the element which should be shown inside the lightbox. It must have a `data-basicLightbox` attribute with the same ID as the button. basicLightbox will automatically place it in the middle of the lightbox when the trigger gets clicked. This works with any kind of HTML: Images (`<img...>`), iframes (`<iframe...>`), DIVs (`<div...>...</div>`), etc. All `data-basicLightbox` elements are hidden as they should only show up inside the lightbox.

```html
<img src="http://placehold.it/1400x900" width="1400" height="900" data-basicLightbox="0">
```

Lastly we tell basicLightbox that it should bind all elements together:

```js
basicLightbox.init()
```

That's it! Clicking the button will show a lightbox filled with an image. Clicking the background of the lightbox will close it.

## Functions

basicLightbox comes with a handful of handy functions. Below are all of them along with a short description.

### Init

Binds click events to all elements with the `data-basicLightbox-show` attribute or to a custom set of elements. You can also skip this step and manually trigger a lightbox using the [show](#show)-function.

Syntax:
```js
basicLightbox.init(elements, options)
```

Examples:
```js
basicLightbox.init()
```
```js
basicLightbox.init('.button')
```
```js
basicLightbox.init(document.querySelectorAll('.button'))
```
```js
basicLightbox.init(null, {
	closable: false
})
```

Parameters:
- `elements` `{String | NodeList | null}` Elements which should show a lightbox when clicked. All of them must have the `data-basicLightbox-show` attribute with a corresponding `data-basicLightbox` element.
- `options` `{Object | null}` An object of [options](#options).

### Show

Shows a lightbox with any kind of HTML.

Syntax:
```js
basicLightbox.show(html, options)
```

Examples:
```js
basicLightbox.show(`
	<img src="http://placehold.it/1400x900" width="1400" height="900">
`)
```
```js
basicLightbox.show(`
	<div>
		<h1>DIV</h1>
		<p>I'm a div inside a lightbox.</p>
	</div>
`, {
	afterShow: () => console.log('afterShow')
})
```

Parameters:
- `html` `{String}` Any kind of HTML. Will be placed centered inside the lightbox.
- `options` `{Object | null}` An object of [options](#options).

### Close

Closes the visible lightbox.

Syntax:
```js
basicLightbox.close(options)
```

Examples:
```js
basicLightbox.close()
```
```js
basicLightbox.close({
	afterClose: () => console.log('afterClose')
})
```

Parameters:
- `options` `{Object | null}` An object of [options](#options).

### Exists

Returns `true` when a lightbox exists and `false` otherwise. Attention: basicLightbox will make its elements visible right after adding them to the DOM. It's possible that a lightbox exist, but isn't [visible](#visible), yet.

Syntax:
```js
basicLightbox.exists()
```

### Visible

Returns `true` when a lightbox is visible and `false` otherwise. Attention: It's possible that a lightbox isn't visible, but [exists](#exists).

Syntax:
```js
basicLightbox.visible()
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
	beforeShow  : () => {},
	afterShow   : () => {},
	beforeClose : () => {},
	afterClose  : () => {},
	/*
	 * String containing HTML or function which returns a string of HTML.
	 * Will be added before or after the content of the lightbox.
	 */
	beforeHTML : '',
	afterHTML  : '',
	/*
	 * String containing HTML or function which returns a string of HTML.
	 * Will be added before or after the content-placeholder of the lightbox.
	 */
	beforePlaceholder : '',
	afterPlaceholder  : ''
}
```
