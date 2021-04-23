const path = require("path");

const consoleLog = console.log;
const log  = console.log.bind(console);
module.exports = function () {
  let regExp = /(\/.*\/.*\/.*:\d*:\d*)/g;
  let stack = new Error().stack;
  let matches = [];
  for (let match = regExp.exec(stack); match !== null; match = regExp.exec(stack)) {
    matches.push(match);
  }
  log("");
  log(...arguments);
  log("\t\tat", path.relative(process.cwd(), matches[1][1]));
};
module.exports.original = consoleLog;