// A Hydrolysis analysis that enforces a policy.

const hyd = require('hydrolysis');
const RequirementType = require('./policy.js').Type;


function check(options, analyzer) {
  console.log('elementsByTagName=' + JSON.stringify(analyzer.elementsByTagName));
  console.log('elements=' + JSON.stringify(analyzer.elements));
  console.log('features=' + JSON.stringify(analyzer.features));
  console.log('behaviors=' + JSON.stringify(analyzer.behaviors));
  console.log('html=' + JSON.stringify(analyzer.html));
  console.log('parsedDocuments=' + JSON.stringify(analyzer.parsedDocuments));
}


module.exports = {
  check: check
};
