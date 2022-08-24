const path = require('path');
const SOURCE = path.join(__dirname, 'src');
const GENS = [require('./.plop-templates/component'), require('./.plop-templates/page')];

module.exports = function (plop) {
  GENS.forEach((fn) => fn(plop, SOURCE));
};
