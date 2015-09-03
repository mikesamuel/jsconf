// Executable that parses a policy and applies it to JavaScript extracted from
// a Polymer app.

const cliArgs = require("command-line-args");
const hyd = require('hydrolysis');
const fs = require('fs');
const policy = require('./policy.js');
const jsconf = require('./jsconf.js');

const cli = cliArgs([
  {
    name: "help",
    type: Boolean,
    alias: "h",
    description: "Print usage."
  },
  {
    name: "verbose",
    type: Boolean,
    alias: "v",
    description: "Writes verbose logging."
  },
  {
    name: "debug",
    type: Boolean,
    alias: "g",
    description: "Writes debugging trace."
  },
  {
    name: "policy",
    type: String,
    alias: "p",
    description: "Your jsconf.json policy file."
  },
  {
    name: "input",
    type: String,
    alias: "i",
    defaultOption: true,
    description: "Polymer source files"
  }
]);

const usage = cli.getUsage({
  header: "jsconf checks Polymer apps for problematic code patterns",
  title: "jsconf"
});

const options = cli.parse();

if (options.help) {
  console.log(usage);
  process.exit(0);
}

const polymerInputPath = options.input;
const policyPath = options.policy;

var inputsOk = true;
if (!polymerInputPath) {
  console.error('No input polymer path');
  inputsOk = false;
}
if (!policyPath) {
  console.error('Missing --policy');
  inputsOk = false;
}
if (!inputsOk) {
  console.log(usage);
  process.exit(-1);
}

function failWithError(reason) {
  console.error('Analysis failed: ' + reason);
  process.exit(-1);
}

const confPolicy = policy.fromRequirements(
  JSON.parse(fs.readFileSync(policyPath, { encoding: "UTF-8" }))
);

console.log('polymerInputPath=%s', polymerInputPath);
hyd.Analyzer.analyze(polymerInputPath)
    .then(
      jsconf.check.bind(
          null,
          {
            verbose: options.verbose,
            debug: options.debug,
            policy: confPolicy
          }),
      failWithError
    );
