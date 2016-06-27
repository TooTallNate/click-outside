
/**
 * Module dependencies.
 */

import ev from 'component-event';
import contains from 'node-contains';

/**
 * Hash of elements and callback functions.
 */

const callbacks = new Map();

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

export default function clickOutside (el, fn) {
  callbacks.set(el, fn);

  return function unbind () {
    callbacks.delete(el);
  };
}
clickOutside.globalClick = globalClick;
clickOutside.install = install;

/**
 * Global "click" event handler.
 *
 * @param {Event} e
 * @api private
 */

function globalClick (e) {
  callbacks.forEach(function (fn, el) {
    if (!contains(el, e.target)) {
      // click outside
      fn.call(el, e);
    }
  });
}

function install (doc) {
  if (!doc) doc = document;
  ev.bind(doc, 'click', globalClick);
}

if ('undefined' !== typeof document) {
  install(document);
}
