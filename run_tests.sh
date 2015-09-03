#!/bin/bash

for test in *_test.js; do
  ./node_modules/mocha/bin/mocha $test
done
