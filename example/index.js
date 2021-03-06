// Dependencies
var SameTime = require("../lib");

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
