// Copyright (C) 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.5
description: >
    computed property class method names can be a symbol
includes: [compareArray.js]
features: [Symbol]
---*/

function ID(x) {
  return x;
}

var sym1 = Symbol();
var sym2 = Symbol();
class C {
  a() { return 'A'; }
  [sym1]() { return 'B'; }
  c() { return 'C'; }
  [ID(sym2)]() { return 'D'; }
}
assert.sameValue(new C().a(), 'A', 'new C().a() must return "A"');
assert.sameValue(new C()[sym1](), 'B', 'new C()[sym1]() must return "B"');
assert.sameValue(new C().c(), 'C', 'new C().c() must return "C"');
assert.sameValue(new C()[sym2](), 'D', 'new C()[sym2]() must return "D"');
assert.sameValue(Object.keys(C.prototype).length, 0, 'The value of Object.keys(C.prototype).length is expected to be 0');
assert.compareArray(
  Object.getOwnPropertyNames(C.prototype), ['constructor', 'a', 'c'],
  'Object.getOwnPropertyNames(C.prototype) must return ["constructor", "a", "c"]'
);
assert.compareArray(
  Object.getOwnPropertySymbols(C.prototype), [sym1, sym2],
  'Object.getOwnPropertySymbols(C.prototype) must return [sym1, sym2]'
);
