
/**
 * Module dependencies.
 */

var ev = require('event');
var Map = require('es6-map');

/**
 * Module exports.
 */

exports = module.exports = clickOutside;
exports.globalClick = globalClick;
exports.install = install;

/**
 * Hash of elements and callback functions.
 */

var callbacks = new Map();

/**
 * A "click outside" of a given DOM event implementation.
 *
 * Based off of this StackOverflow answer:
 *   http://stackoverflow.com/a/14188699/376773
 *
 * @param {Element} el - DOM element to watch for outside clicks
 * @param {Function} fn - callback function to invoke when user clicks outside of `el`
 * @return {Function} a function to stop watching for "click outside" events for `el`
 * @api public
 */

function clickOutside (el, fn) {
  callbacks.set(el, fn);

  return function unbind () {
    callbacks.delete(el);
  };
}

/**
 * Global "click" event handler.
 *
 * @param {Event} e
 * @api private
 */

function globalClick (e) {
  var cur, el, fn, inside, element;
  var entries = callbacks.entries();

  while ((cur = entries.next()).done !== true) {
    el = cur.value[0];
    fn = cur.value[1];
    inside = false;

    for (element = e.target; element; element = element.parentNode) {
      if (element === el) {
        // click inside
        inside = true;
        break;
      }
    }

    if (inside) continue;

    // click outside
    fn(e);
  }
}

function install (doc) {
  if (!doc) doc = document;
  ev.bind(doc, 'click', globalClick);
}

if ('undefined' !== typeof document) {
  exports.install(document);
}
