// https://vuex.vuejs.org/en/modules.html
//Import all modules exist under the modules directory
const requireModule = require.context(".", true, /\.js$/);
const modules = {};

requireModule.keys().forEach(fileName => {
  if (fileName === "./index.js") return;

  // Replace ./ and .js
  const path = fileName.replace(/(\.\/|\.js)/g, "");
  const [moduleName, imported] = path.split("/");

  if (!modules[moduleName]) {
    modules[moduleName] = {
      namespaced: true //Make all modules namespaced
    };
  }

  modules[moduleName][imported] = requireModule(fileName).default;
});

export default modules;
