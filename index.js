'use strict';

/*
	Big thanks to:
		http://stackoverflow.com/questions/4994201/is-object-empty
		http://stackoverflow.com/questions/4310535/how-to-convert-anything-to-a-string-safely
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
*/

// settings

var toOptions = {
    trimStrings: true
};

// polyfills

if (!String.prototype.trim) {
    (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(rtrim, '');
        };
    })();
}

// helpers

var replaceAll = function(str, find, replace) {
    find = escapeRegExp(find);
    return str.replace(new RegExp(find, 'g'), replace);
};

var escapeRegExp = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

var debug = function() {
    var out = ['to-anything'];
    for (var i = 0; i < arguments.length; i++) {
        out.push(arguments[i]);
    }
    console.log(out.join(' | '));
};

var isEmpty = function(obj) {
    if (obj == null) {
        return true
    };
    if (obj.length > 0) {
        return false
    };
    if (obj.length === 0) {
        return true
    };
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

// do it

var to = function(input, convertTo, options) {
    if (arguments.length === 1 && typeof input === 'object') {
        options = input;
    } else if (typeof options !== 'object') {
        options = {};
    }
    for (var key in options) {
        toOptions[key] = options[key];
    }
    if (arguments.length === 1) {
        return to;
    }
    if (convertTo === 'string' || convertTo === 's') {
        switch (typeof input) {
            case 'undefined':
                input = '';
                break;
            case 'function':
                input = 'function';
                break;
            case 'object':
                if (input === null) {
                    input = '';
                } else if (input instanceof Date) {
                    input = input.toISOString();
                    break;
                } else {
                    input = 'object';
                }
                break;
            default:
                input = '' + input;
        }
        if (toOptions.trimStrings) {
            input = input.trim();
        }
        return input;
    } else if (convertTo === 'integer' || convertTo === 'i' || convertTo === 'number') {
        input = input.trim();
        var sign = (input.length ? (input[0] === '-' ? '-' : '') : '');
        var result = /[\d+,]+/.exec(to(input, 's'));
        if (result && result.length) {
            input = sign + result[0];
            input = replaceAll(input, ',', '');
            input = parseInt(input, 10);
            if (isNaN(input)) {
                return 0;
            }
            return input;
        } else {
            return 0;
        }
    } else if (convertTo === 'decimal' || convertTo === 'd') {
        var result = /[\d,]+\.?\d*/.exec(to(input, 's'));
        if (result && result.length) {
            input = result[0];
            input = replaceAll(input, ',', '');
            input = parseFloat(input);
            if (isNaN(input)) {
                return 0.00;
            }
            return input;
        } else {
            return 0.00;
        }
    } else if (convertTo === 'date' || convertTo === 'dt') {
        var input = to(input, 's');
        if (input.match(/\d/g).length === input.length) {
            result = new Date(to(input, 'i'));
        } else {
            var result = new Date(input);
        }
        if (isNaN(result.getTime())) {
            input = new Date();
        } else {
            input = result;
        }
        return input;
    } else if (convertTo === 'boolean' || convertTo === 'b') {
        if (typeof input === 'object' && isEmpty(input)) {
            return false;
        }
        var input = to(input, 's');
        if (['0', 'false', 'no', ''].indexOf(input) >= 0) {
            return false;
        } else {
            return true;
        }
    }
    return '';
};

module.exports = exports = to;

// methods

exports.string = function(str) {
    return to(str, 's');
};

exports.integer = function(int) {
    return to(int, 'i');
};

exports.decimal = function(dec) {
    return to(dec, 'd');
};

exports.date = function(dt) {
    return to(dt, 'dt');
}

exports.boolean = function(val) {
    return to(val, 'b');
};