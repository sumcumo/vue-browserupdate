# Vue-BrowserUpdate

VueJS wrapper for ["browser update"](http://browser-update.org) package.
Used to expose show, click and close events mainly.

## Table of Contents ##

* [Requirements](#requirements)
* [Install](#install)
* [Getting Started](#getting-started)
* [Usage](#usage)

## Requirements

* npm
* VueJS
* Node

## Install

```bash
$ npm install --save @sum.cumo/vue-browserupdate
```

## Getting Started

The Vue plugin must be initialized by your vue App.
You should import it in your main .js file

```js
import VueBrowserUpdate from 'vue-browserupdate';
```

Then you just use the plugin by calling the Vue.use method.

```js
Vue.use(VueBrowserUpdate);
```

## Usage

You still can pass options to browserupdate when calling the Vue.use method.
```js
Vue.use(VueBrowserUpdate, {
	options: {
		// Your browser update options
		container: document.body,
	},
});
```
You can view the full options here: http://browser-update.org/customize.html

Pass a `test` key to enable the testing mode.
```js
Vue.use(VueBrowserUpdate, {
	options: {
		// Your browser update options
	},
	test: true,
});
```

The plugin adds to the Vue object the object 'browserUpdate' that includes 3 functions. The `onshow`, `onclick` and `onclose` requires you to pass a function.
```js
Vue.browserUpdate.onshow(() => {
	// The browser update modal is visible...
});
```

