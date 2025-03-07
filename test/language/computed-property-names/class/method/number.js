// Copyright (C) 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.5
description: >
    computed property class method names can be a number
includes: [compareArray.js]
---*/

function ID(x) {
  return x;
}

class C {
  a() { return 'A'; }
  [1]() { return 'B'; }
  c() { return 'C'; }
  [ID(2)]() { return 'D'; }
}
assert.sameValue(new C().a(), 'A', 'new C().a() must return "A"');
assert.sameValue(new C()[1](), 'B', 'new C()[1]() must return "B"');
assert.sameValue(new C().c(), 'C', 'new C().c() must return "C"');
assert.sameValue(new C()[2](), 'D', 'new C()[2]() must return "D"');

assert.sameValue(Object.keys(C.prototype).length, 0, 'The value of Object.keys(C.prototype).length is expected to be 0');

assert.compareArray(
  Object.getOwnPropertyNames(C.prototype), ['1', '2', 'constructor', 'a', 'c'],
  'Object.getOwnPropertyNames(C.prototype) must return ["1", "2", "constructor", "a", "c"]'
);
