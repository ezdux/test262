// Copyright (C) 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.5
description: >
    to name, accessor side effects numbers 2
includes: [compareArray.js]
---*/
var counter = 0;
var key1vof = [];
var key2vof = [];
var key1 = {
  valueOf: function() {
    key1vof.push(counter);
    counter += 1;
    return 1;
  },
  toString: null
};
var key2 = {
  valueOf: function() {
    key2vof.push(counter);
    counter += 1;
    return 2;
  },
  toString: null
};

class C {
  a() { return 'A'; }
  [key1]() { return 'B'; }
  c() { return 'C'; }
  [key2]() { return 'D'; }
}

assert.compareArray(key1vof, [0], 'The value of key1vof is expected to be [0]');
assert.compareArray(key2vof, [1], 'The value of key2vof is expected to be [1]');

assert.sameValue(counter, 2, 'The value of counter is expected to be 2');
assert.sameValue(new C().a(), 'A', 'new C().a() must return "A"');
assert.sameValue(new C()[1](), 'B', 'new C()[1]() must return "B"');
assert.sameValue(new C().c(), 'C', 'new C().c() must return "C"');
assert.sameValue(new C()[2](), 'D', 'new C()[2]() must return "D"');
assert.sameValue(Object.keys(C.prototype).length, 0, 'The value of Object.keys(C.prototype).length is expected to be 0');
assert.compareArray(
  Object.getOwnPropertyNames(C.prototype), ['1', '2', 'constructor', 'a', 'c'],
  'Object.getOwnPropertyNames(C.prototype) must return ["1", "2", "constructor", "a", "c"]'
);
