  const stringify = require('javascript-stringify').stringify;

  module.exports = function checkConsole(value) {
    const output = stringify(value, null, "\t", { maxDepth: 3 });
    console.log(output);
    return '';
  };