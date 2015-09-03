const policy = require('./policy.js');
const assert = require('assert');
const fs = require('fs');

describe(
  'policy.fromRequirements("closure_conformance.json")',
  function () {
    var closure_conformance_json = JSON.parse(
      fs.readFileSync('closure_conformance.json', { encoding: 'UTF-8' }));
    var p = policy.fromRequirements(closure_conformance_json);
    it(
      'requirements.length',
      function () {
        assert(p instanceof policy.Policy);
        assert(p.requirements.length === 40);
      }
    );
    it(
      'applicableTo("javascript/closure/dom/safe.js")',
      function () {
        const closureDomSafeRequirements = p.applicableTo(
          'javascript/closure/dom/safe.js');
        assert(closureDomSafeRequirements.length === 34);
      }
    );
    it(
      'applicableTo("Post.*bootstrap_module whitelist_regexp")',
      function () {
        const bm_init = p.applicableTo('Post/foo/bootstrap_module/init.js');
        assert(bm_init.length === 39);
      }
    );
    it(
      'applicableTo("not/mentioned/in/any/path/matcher.js")',
      function () {
        const nm_init = p.applicableTo('not/mentioned/in/any/path/matcher.js');
        assert(nm_init.length === 40);
      }
    );
  }
);
