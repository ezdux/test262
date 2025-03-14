// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-%typedarray%.prototype.copywithin
description: >
  start argument is coerced to an integer value.
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
  5. Let relativeStart be ? ToInteger(start).
  ...
includes: [compareArray.js, testTypedArray.js]
features: [TypedArray]
---*/

testWithTypedArrayConstructors(function(TA) {
  assert.compareArray(
    new TA([0, 1, 2, 3]).copyWithin(1, undefined),
    [0, 0, 1, 2],
    'new TA([0, 1, 2, 3]).copyWithin(1, undefined) must return [0, 0, 1, 2]'
  );

  assert.compareArray(
    new TA([0, 1, 2, 3]).copyWithin(1, false),
    [0, 0, 1, 2],
    'new TA([0, 1, 2, 3]).copyWithin(1, false) must return [0, 0, 1, 2]'
  );

  assert.compareArray(
    new TA([0, 1, 2, 3]).copyWithin(1, NaN),
    [0, 0, 1, 2],
    'new TA([0, 1, 2, 3]).copyWithin(1, NaN) must return [0, 0, 1, 2]'
  );

  assert.compareArray(
    new TA([0, 1, 2, 3]).copyWithin(1, null),
    [0, 0, 1, 2],
    'new TA([0, 1, 2, 3]).copyWithin(1, null) must return [0, 0, 1, 2]'
  );

  assert.compareArray(
    new TA([0, 1, 2, 3]).copyWithin(0, true),
    [1, 2, 3, 3],
    'new TA([0, 1, 2, 3]).copyWithin(0, true) must return [1, 2, 3, 3]'
  );

  assert.compareArray(
    new TA([0, 1, 2, 3]).copyWithin(0, '1'),
    [1, 2, 3, 3],
    'new TA([0, 1, 2, 3]).copyWithin(0, "1") must return [1, 2, 3, 3]'
  );

  assert.compareArray(
    new TA([0, 1, 2, 3]).copyWithin(1, 0.5),
    [0, 0, 1, 2],
    'new TA([0, 1, 2, 3]).copyWithin(1, 0.5) must return [0, 0, 1, 2]'
  );

  assert.compareArray(
    new TA([0, 1, 2, 3]).copyWithin(0, 1.5),
    [1, 2, 3, 3],
    'new TA([0, 1, 2, 3]).copyWithin(0, 1.5) must return [1, 2, 3, 3]'
  );
});
