// Copyright (C) 2016 the V8 project authors. All rights reserved.
// Copyright (C) 2017 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-%typedarray%.prototype.set-typedarray-offset
description: >
  Set values from different instances using the different buffer and same
  constructor. srcBuffer values are cached.
includes: [testTypedArray.js, compareArray.js]
features: [SharedArrayBuffer, TypedArray]
---*/

var int_views = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array];

testWithTypedArrayConstructors(function(TA) {
  var sample, result;

  var sab = new SharedArrayBuffer(2 * TA.BYTES_PER_ELEMENT);
  var src = new TA(sab);
  src[0] = 42;
  src[1] = 43;

  sample = new TA([1, 2, 3, 4]);
  result = sample.set(src, 1);
  assert.compareArray(sample, [1, 42, 43, 4], 'The value of sample is expected to be [1, 42, 43, 4]');
  assert.sameValue(result, undefined, 'The value of result is expected to equal undefined');

  sample = new TA([1, 2, 3, 4]);
  result = sample.set(src, 0);
  assert.compareArray(sample, [42, 43, 3, 4], 'The value of sample is expected to be [42, 43, 3, 4]');
  assert.sameValue(result, undefined, 'The value of result is expected to equal undefined');

  sample = new TA([1, 2, 3, 4]);
  result = sample.set(src, 2);
  assert.compareArray(sample, [1, 2, 42, 43], 'The value of sample is expected to be [1, 2, 42, 43]');
  assert.sameValue(result, undefined, 'The value of result is expected to equal undefined');


  src = new TA([42, 43]);

  sab = new SharedArrayBuffer(4 * TA.BYTES_PER_ELEMENT);
  sample = new TA(sab);
  sample[0] = 1;
  sample[1] = 2;
  sample[2] = 3;
  sample[3] = 4;
  result = sample.set(src, 1);
  assert.compareArray(sample, [1, 42, 43, 4], 'The value of sample is expected to be [1, 42, 43, 4]');
  assert.sameValue(result, undefined, 'The value of result is expected to equal undefined');

  sab = new SharedArrayBuffer(4 * TA.BYTES_PER_ELEMENT);
  sample = new TA(sab);
  sample[0] = 1;
  sample[1] = 2;
  sample[2] = 3;
  sample[3] = 4;
  result = sample.set(src, 0);
  assert.compareArray(sample, [42, 43, 3, 4], 'The value of sample is expected to be [42, 43, 3, 4]');
  assert.sameValue(result, undefined, 'The value of result is expected to equal undefined');

  sab = new SharedArrayBuffer(4 * TA.BYTES_PER_ELEMENT);
  sample = new TA(sab);
  sample[0] = 1;
  sample[1] = 2;
  sample[2] = 3;
  sample[3] = 4;
  result = sample.set(src, 2);
  assert.compareArray(sample, [1, 2, 42, 43], 'The value of sample is expected to be [1, 2, 42, 43]');
  assert.sameValue(result, undefined, 'The value of result is expected to equal undefined');


  var sab1 = new SharedArrayBuffer(2 * TA.BYTES_PER_ELEMENT);
  src = new TA(sab1);
  src[0] = 42;
  src[1] = 43;

  var sab2;
  sab2 = new SharedArrayBuffer(4 * TA.BYTES_PER_ELEMENT);
  sample = new TA(sab2);
  sample[0] = 1;
  sample[1] = 2;
  sample[2] = 3;
  sample[3] = 4;
  result = sample.set(src, 1);
  assert.compareArray(sample, [1, 42, 43, 4], 'The value of sample is expected to be [1, 42, 43, 4]');
  assert.sameValue(result, undefined, 'The value of result is expected to equal undefined');

  sab2 = new SharedArrayBuffer(4 * TA.BYTES_PER_ELEMENT);
  sample = new TA(sab2);
  sample[0] = 1;
  sample[1] = 2;
  sample[2] = 3;
  sample[3] = 4;
  result = sample.set(src, 0);
  assert.compareArray(sample, [42, 43, 3, 4], 'The value of sample is expected to be [42, 43, 3, 4]');
  assert.sameValue(result, undefined, 'The value of result is expected to equal undefined');

  sab2 = new SharedArrayBuffer(4 * TA.BYTES_PER_ELEMENT);
  sample = new TA(sab2);
  sample[0] = 1;
  sample[1] = 2;
  sample[2] = 3;
  sample[3] = 4;
  result = sample.set(src, 2);
  assert.compareArray(sample, [1, 2, 42, 43], 'The value of sample is expected to be [1, 2, 42, 43]');
  assert.sameValue(result, undefined, 'The value of result is expected to equal undefined');
}, int_views);
