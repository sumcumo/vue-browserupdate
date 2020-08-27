'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _browserUpdate = require('browser-update');

var _browserUpdate2 = _interopRequireDefault(_browserUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addLoadEvent(func) {
  var oldOnLoad = window.onload;
  if (typeof window.onload !== 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      if (oldOnLoad) {
        oldOnLoad();
      }
      func();
    };
  }
}

var VueBrowserUpdate = {};
VueBrowserUpdate.install = function (Vue, opts) {
  var options = opts;
  var funcs = {
    show: [],
    click: [],
    close: []
  };
  function dispatch(func, infos) {
    funcs[func].forEach(function (f) {
      return f(infos);
    });
  }

  addLoadEvent(function () {
    options.options.onshow = function (infos) {
      return dispatch('show', infos);
    };
    options.options.onclick = function (infos) {
      return dispatch('click', infos);
    };
    options.options.onclose = function (infos) {
      return dispatch('close', infos);
    };

    if (typeof _browserUpdate2.default === 'undefined') {
      throw new Error('The plugin "browser-update" could not be loaded.');
    } else {
      if (!options.containerAsync) {
        (0, _browserUpdate2.default)(options.options, options.test);
      }
    }
  });

  Vue.browserUpdate = {
    onshow: function onshow(func) {
      return funcs.show.push(func);
    },
    onclick: function onclick(func) {
      return funcs.click.push(func);
    },
    onclose: function onclose(func) {
      return funcs.close.push(func);
    },
    appendContainer: function appendContainer(container) {
      if (container) options.options.container = container;
      (0, _browserUpdate2.default)(options.options, options.test);
    }
  };
};

exports.default = VueBrowserUpdate;