// Dependencies
var Deffy = require("deffy");

/**
 * SameTime
 * Calls functions in parallel and stores the results.
 *
 * @name SameTime
 * @function
 * @param {Array} arr An array of functions getting the callback parameter in the first argument.
 * @param {Function} cb The callback function called with:
 *
 *  - first parameter: `null` if there were no errors or an array containing the error values
 *  - `1 ... n` parameters: arrays containing the callback results
 *
 * @return {SameTime} The `SameTime` function.
 */
function SameTime(arr, cb) {

    var result = []
      , complete = 0
      , length = arr.length
      ;

    if (!arr.length) {
        return process.nextTick(cb);
    }

    // Run functions
    arr.forEach(function (c, index) {
        var _done = false;

        // Call the current function
        c(function () {

            if (_done) { return; }
            _done = true;

            var args = [].slice.call(arguments)
              , cRes = null
              , i = 0
              ;

            // Prepare the result data
            for (; i < args.length; ++i) {
                cRes = result[i] = Deffy(result[i], []);
                cRes[index] = args[i];
            }

            // Check if all functions send the responses
            if (++complete !== length) { return; }
            if (!Deffy(result[0], []).filter(Boolean).length) {
                result[0] = null;
            }
            cb.apply(null, result);
        });
    });
}

module.exports = SameTime;
