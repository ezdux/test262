// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-%typedarray%.prototype.fill
description: >
  Fills all the elements from a with a custom start and end indexes.
info: |
  22.2.3.8 %TypedArray%.prototype.fill (value [ , start [ , end ] ] )

  %TypedArray%.prototype.fill is a distinct function that implements the same
  algorithm as Array.prototype.fill as defined in 22.1.3.6 except that the this
  object's [[ArrayLength]] internal slot is accessed in place of performing a
  [[Get]] of "length". The implementation of the algorithm may be optimized with
  the knowledge that the this value is an object that has a fixed length and
  whose integer indexed properties are not sparse. However, such optimization
  must not introduce any observable changes in the specified behaviour of the
  algorithm.

  ...

  22.1.3.6 Array.prototype.fill (value [ , start [ , end ] ] )

  ...
  3. Let relativeStart be ? ToInteger(start).
  4. If relativeStart < 0, let k be max((len + relativeStart), 0); else let k be
  min(relativeStart, len).
  5. If end is undefined, let relativeEnd be len; else let relativeEnd be ?
  ToInteger(end).
  6. If relativeEnd < 0, let final be max((len + relativeEnd), 0); else let
  final be min(relativeEnd, len).
  ...
includes: [compareArray.js, testTypedArray.js]
features: [TypedArray]
---*/

testWithTypedArrayConstructors(function(TA) {
  assert.compareArray(new TA([0, 0, 0]).fill(8, 1, 2), [0, 8, 0], 'new TA([0, 0, 0]).fill(8, 1, 2) must return [0, 8, 0]');
  assert.compareArray(
    new TA([0, 0, 0, 0, 0]).fill(8, -3, 4),
    [0, 0, 8, 8, 0],
    'new TA([0, 0, 0, 0, 0]).fill(8, -3, 4) must return [0, 0, 8, 8, 0]'
  );
  assert.compareArray(
    new TA([0, 0, 0, 0, 0]).fill(8, -2, -1),
    [0, 0, 0, 8, 0],
    'new TA([0, 0, 0, 0, 0]).fill(8, -2, -1) must return [0, 0, 0, 8, 0]'
  );
  assert.compareArray(
    new TA([0, 0, 0, 0, 0]).fill(8, -1, -3),
    [0, 0, 0, 0, 0],
    'new TA([0, 0, 0, 0, 0]).fill(8, -1, -3) must return [0, 0, 0, 0, 0]'
  );
  assert.compareArray(
    new TA([0, 0, 0, 0, 0]).fill(8, 1, 3),
    [0, 8, 8, 0, 0],
    'new TA([0, 0, 0, 0, 0]).fill(8, 1, 3) must return [0, 8, 8, 0, 0]'
  );
});
