# basicLightbox

The lightest lightbox ever made.

## Contents

- [Demos](#demos)
- [Features](#features)
- [Requirements](#requirements)

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