# To-Anything
A simple module for converting values into expected types.  To-Anything guarantees that you'll get the type you're looking for.  For example` to.integer('X')` returns `0` instead of `NaN`.  This module is not for everybody or for everything, but it's very handy for web applications where you just need a foolproof way to get the values/types that you expect.

## Getting started
```
npm install to-anything
```

## Usage
```
var to = require('to-anything');

// Examples
var name = to.string(' First Last '); // -> 'First Last'; (auto trimming of strings)
var aNumber = to.integer('1'); // -> 1
var aFloat = to.decimal('23.346'); // -> 23.346
var aFloatFromCurrency = to.decimal('$12,345.67'); // -> 12345.67
// Boolean
var aBoolean = to.boolean('1'); // -> true
var aBoolean = to.boolean('true'); // -> true
var aBoolean = to.boolean(1); // -> true
var aBoolean = to.boolean('0'); // -> false
var aBoolean = to.boolean('false'); // -> false
var aBoolean = to.boolean('no'); // -> false
var aBoolean = to.boolean(''); // -> false
// Dates
var aDate = to.date('06/23/2015') // -> Date object 
var aDate = to.date('2015-06-23') // -> Date object 
var aDate = to.date(1435090371078) // -> Date object 
```

# Tests
Mocha tests incuded.
