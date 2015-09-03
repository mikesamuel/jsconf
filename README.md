# jsconf

A port of the Closure Compiler based JSConformance that fits into NodeJS/Polymer workflow

This project is in the early stages of development.  It is not ready to be used in any meaningful way.

## File-tree

* `main.js` is a JavaScript file suitable for invoking with `node` which parses flags.
* `policy.js` parses JSConformance policies -- JSON dumps of the Conformance.proto used by the original.
* `closure_conformance.json` is a policy file that should work with `policy.js`.
* `jsconf.js` will implement the policy checker once I can figure out how to feed it parse trees using Hydrolysis.
* `foo.{html,js}` are test inputs.

## Blockage

I'm trying to use hydrolysis to find JavaScript program fragments given a path to an HTML file written in Polymer style.

```bash
$ node main.js \
    --policy closure_conformance.json \
    <(echo '<script>eval("evil()")</script>'); \
echo $?
```

does not find any script elements but does complete the promise.

```bash
$ node main.js \
  --policy closure_conformance.json \
  foo.html; \
echo $?
```

seems to find the input file fine and exits normally but neither completes nor breaks the promise passed to `analyze`.
