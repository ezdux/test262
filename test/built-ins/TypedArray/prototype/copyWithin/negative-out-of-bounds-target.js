// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-%typedarray%.prototype.copywithin
description: >
  Set values with out of bounds negative target argument.
info: |
  22.2.3.5 %TypedArray%.prototype.copyWithin (target, start [ , end ] )

  %TypedArray%.prototype.copyWithin is a distinct function that implements the
  same algorithm as Array.prototype.copyWithin as defined in 22.1.3.3 except
  that the this object's [[ArrayLength]] internal slot is accessed in place of
  performing a [[Get]] of "length" and the actual copying of values in step 12
  must be performed in a manner that preserves the bit-level encoding of the
  source data.

  ...

  22.1.3.3 Array.prototype.copyWithin (target, start [ , end ] )

  ...
  4. If relativeTarget < 0, let to be max((len + relativeTarget), 0); else let
  to be min(relativeTarget, len).
  ...
includes: [compareArray.js, testTypedArray.js]
features: [TypedArray]
---*/

testWithTypedArrayConstructors(function(TA) {
  assert.compareArray(
    new TA([0, 1, 2, 3]).copyWithin(-10, 0),
    [0, 1, 2, 3],
    'new TA([0, 1, 2, 3]).copyWithin(-10, 0) must return [0, 1, 2, 3]'
  );

  assert.compareArray(
    new TA([1, 2, 3, 4, 5]).copyWithin(-Infinity, 0),
    [1, 2, 3, 4, 5],
    'new TA([1, 2, 3, 4, 5]).copyWithin(-Infinity, 0) must return [1, 2, 3, 4, 5]'
  );

  assert.compareArray(
    new TA([0, 1, 2, 3, 4]).copyWithin(-10, 2),
    [2, 3, 4, 3, 4],
    'new TA([0, 1, 2, 3, 4]).copyWithin(-10, 2) must return [2, 3, 4, 3, 4]'
  );

  assert.compareArray(
    new TA([1, 2, 3, 4, 5]).copyWithin(-Infinity, 2),
    [3, 4, 5, 4, 5],
    'new TA([1, 2, 3, 4, 5]).copyWithin(-Infinity, 2) must return [3, 4, 5, 4, 5]'
  );
});
