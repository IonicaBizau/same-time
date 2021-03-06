"use strict";

const deffy = require("deffy");

/**
 * sameTime
 * Calls functions in parallel and stores the results.
 *
 * @name sameTime
 * @function
 * @param {Array} arr An array of functions getting the callback parameter in the first argument.
 * @param {Function} cb The callback function called with:
 *
 *  - first parameter: `null` if there were no errors or an array containing the error values
 *  - `1 ... n` parameters: arrays containing the callback results
 *
 * @param {Array} store An optional array to store the data in. If `null`, data won't be stored.
 * @return {sameTime} The `sameTime` function.
 */
module.exports = function sameTime(arr, cb, store) {

    let result = store
      , complete = 0
      , length = arr.length
      ;

    if (cb) {
        if (result === undefined) {
            result = [];
        }
    } else {
        result = null;
    }

    if (!arr.length) {
        return process.nextTick(cb.bind(null, null, []));
    }

    // Run functions
    arr.forEach(function (c, index) {
        let _done = false;

        // Call the current function
        c(function () {

            if (_done) { return; }
            _done = true;

            let args = [].slice.call(arguments)
              , cRes = null
              , i = 0
              ;

            if (result) {
                // Prepare the result data
                for (; i < args.length; ++i) {
                    cRes = result[i] = deffy(result[i], []);
                    cRes[index] = args[i];
                }
            }

            // Check if all functions send the responses
            if (++complete !== length) { return; }
            if (result) {
                if (!deffy(result[0], []).filter(Boolean).length) {
                    result[0] = null;
                }
            }
            cb && cb.apply(null, result);
        });
    });
};
