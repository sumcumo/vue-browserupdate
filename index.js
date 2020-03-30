import browserUpdate from 'browser-update';

function addLoadEvent(func) {
  const oldOnLoad = window.onload;
  if (typeof window.onload !== 'function') {
    window.onload = func;
  } else {
    window.onload = () => {
      if (oldOnLoad) {
        oldOnLoad();
      }
      func();
    }
  }
}

const VueBrowserUpdate = {};
VueBrowserUpdate.install = (Vue, opts) => {
  const options = opts;
  const funcs = {
    show: [],
    click: [],
    close: [],
  };
  function dispatch(func, infos) {
    funcs[func].forEach(f => f(infos));
  }

  addLoadEvent(() => {
    options.options.onshow = infos => dispatch('show', infos);
    options.options.onclick = infos => dispatch('click', infos);
    options.options.onclose = infos => dispatch('close', infos);

    if (typeof browserUpdate === 'undefined') {
      throw new Error('The plugin "browser-update" could not be loaded.');
    } else {
      if (!options.containerAsync) {
        browserUpdate(options.options, options.test);
      }
    }
  });

  Vue.browserUpdate = {
    onshow: func => funcs.show.push(func),
    onclick: func => funcs.click.push(func),
    onclose: func => funcs.close.push(func),
    appendContainer: (container) => {
      if (container) options.options.container = container;
      browserUpdate(options.options, options.test);
    },
  };
};

export default VueBrowserUpdate;
