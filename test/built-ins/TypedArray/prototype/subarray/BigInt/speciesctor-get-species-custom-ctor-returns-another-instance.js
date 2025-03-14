// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-%typedarray%.prototype.subarray
description: >
  Custom @@species constructor may return a totally different TypedArray
info: |
  22.2.3.27 %TypedArray%.prototype.subarray( begin , end )

  ...
  17. Return ? TypedArraySpeciesCreate(O, argumentsList).

  22.2.4.7 TypedArraySpeciesCreate ( exemplar, argumentList )

  ...
  3. Let constructor be ? SpeciesConstructor(exemplar, defaultConstructor).
  4. Return ? TypedArrayCreate(constructor, argumentList).

  7.3.20 SpeciesConstructor ( O, defaultConstructor )

  ...
  5. Let S be ? Get(C, @@species).
  ...
  7. If IsConstructor(S) is true, return S.
  ...

  22.2.4.6 TypedArrayCreate ( constructor, argumentList )

  1. Let newTypedArray be ? Construct(constructor, argumentList).
  2. Perform ? ValidateTypedArray(newTypedArray).
  3. If argumentList is a List of a single Number, then
    ...
  4. Return newTypedArray.
includes: [testBigIntTypedArray.js, compareArray.js]
features: [BigInt, Symbol.species, TypedArray]
---*/
testWithBigIntTypedArrayConstructors(function(TA) {
  var sample = new TA([40n]);
  var other = new BigInt64Array([1n, 0n, 1n]);
  var result;
  sample.constructor = {};

  sample.constructor[Symbol.species] = function() {
    return other;
  };

  result = sample.subarray(0, 0);
  assert.sameValue(result, other, 'The value of result is expected to equal the value of other');
  assert.compareArray(result, [1n, 0n, 1n], 'The value of result is expected to be [1n, 0n, 1n]');
});
