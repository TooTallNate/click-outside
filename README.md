click-outside
=============
### The inverse of the DOM "click" event

For those times when you want a callback invoked when a DOM element _was not_
clicked, you can use this `click-outside` module.

This module is meant for use client-side via a bundler like browserify.


Installation
------------

``` bash
$ npm install click-outside
```


Example
-------

``` javascript
var clickOutside = require('click-outside');

var container = document.querySelector('.container');

container.onclick = function (e) {
  console.log('"container" was clicked');
};

var unbind = clickOutside(container, function (e) {
  console.log('"container" was *NOT* clicked');
});


// at some point later... invoke the `unbind()` function to stop watching
setTimeout(function () {
  unbind();
}, 5000);
```


License
-------

(The MIT License)

Copyright (c) 2014 Nathan Rajlich &lt;nathan@tootallnate.net&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
