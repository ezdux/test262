// Copyright (C) 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.5
description: >
    computed property names can be a string
includes: [compareArray.js]
---*/
function ID(x) {
  return x;
}

var object = {
  a: 'A',
  ['b']: 'B',
  c: 'C',
  [ID('d')]: 'D',
};
assert.sameValue(object.a, 'A', 'The value of object.a is expected to be "A"');
assert.sameValue(object.b, 'B', 'The value of object.b is expected to be "B"');
assert.sameValue(object.c, 'C', 'The value of object.c is expected to be "C"');
assert.sameValue(object.d, 'D', 'The value of object.d is expected to be "D"');
assert.compareArray(
  Object.getOwnPropertyNames(object), ['a', 'b', 'c', 'd'],
  'Object.getOwnPropertyNames({a: "A", ["b"]: "B", c: "C", [ID("d")]: "D",}) must return ["a", "b", "c", "d"]'
);
