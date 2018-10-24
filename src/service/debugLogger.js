const config = require("../config.json");

const debug = {
  log: string => {
    if (config.app.debugMode) {
      console.log(string);
    }
  }
};

module.exports = debug;
