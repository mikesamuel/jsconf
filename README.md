# jsconf

A port of the Closure Compiler based JSConformance that fits into NodeJS/Polymer workflow

This project is in the early stages of development.  It is not ready to be used in any meaningful way.

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
