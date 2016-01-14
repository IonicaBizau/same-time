# same-time [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![Version](https://img.shields.io/npm/v/same-time.svg)](https://www.npmjs.com/package/same-time) [![Downloads](https://img.shields.io/npm/dt/same-time.svg)](https://www.npmjs.com/package/same-time) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Call functions in parallel and store the results.

If you want to run async functions synchronously, check out [`one-by-one.js`](https://github.com/IonicaBizau/one-by-one.js).

## Installation

```sh
$ npm i --save same-time
```

## Example

```js
// Dependencies
var SameTime = require("same-time");

// Run functions same time and output the results
SameTime([
    function (cb) {
        setTimeout(function() {
            cb(null, "Something async")
        }, 3000);
    }
  , function (cb) {
        setTimeout(function() {
            cb(new Error("An error."))
        }, 500);
    }
  , function (cb) {
        setTimeout(function() {
            cb(null, null, 42)
        }, 2000);
    }
], function (err, data, something) {
    console.log(err, data, something);
    // After 3 seconds
    // [ null, [Error: An error.], null ] [ 'Something async', , null ] [ , , 42 ]
});
```

## Documentation

### `SameTime(arr, cb)`
Calls functions in parallel and stores the results.

#### Params
- **Array** `arr`: An array of functions getting the callback parameter in the first argument.
- **Function** `cb`: The callback function called with:
 - first parameter: `null` if there were no errors or an array containing the error values
 - `1 ... n` parameters: arrays containing the callback results

#### Return
- **SameTime** The `SameTime` function.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`blah`](https://github.com/IonicaBizau/blah)

 - [`cdnjs-importer`](https://github.com/cdnjs/cdnjs-importer)

 - [`engine-parser`](https://github.com/IonicaBizau/engine-parser) by jillix

 - [`engine-tools`](https://github.com/jillix/engine-tools) by jillix

 - [`gh-following`](https://github.com/IonicaBizau/gh-following#readme)

 - [`github-emojify`](https://github.com/IonicaBizau/github-emojifiy#readme)

 - [`github-labeller`](https://github.com/IonicaBizau/github-labeller#readme)

 - [`gpm`](https://github.com/IonicaBizau/gpm)

 - [`mongof`](https://github.com/IonicaBizau/node-mongof)

 - [`nodeice`](https://github.com/IonicaBizau/nodeice)

 - [`npm-available-array`](https://github.com/IonicaBizau/npm-available-array#readme)

 - [`package-dependents`](https://github.com/IonicaBizau/node-package-dependents#readme)

 - [`showalicense.com`](https://github.com/IonicaBizau/showalicense.com#readme)

## License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md