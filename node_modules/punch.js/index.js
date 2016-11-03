module.exports = (function () {
  "use strict";

  return {
    ROOT:  require("fs").realpathSync("./"),
    version:  require("./package.json").version,
    clock: require("./lib/clock"),
    log: require("./lib/log")
  }; 
})();