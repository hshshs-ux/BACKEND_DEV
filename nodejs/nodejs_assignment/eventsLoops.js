console.log('1: Start (sync)');

setTimeout(() => console.log('6: setTimeout (macrotask)'), 0);

setImmediate(() => console.log('7: setImmediate (check phase)'));

process.nextTick(() => console.log('2: nextTick (microtask #1)'));

Promise.resolve().then(() => console.log('3: Promise.then (microtask #2)'));

setTimeout(() => {
  console.log('8: setTimeout nested');
  process.nextTick(() => console.log('9: nextTick inside timeout'));
}, 0);

console.log('4: End (sync)');

Promise.resolve().then(() => {
  console.log('5: Second Promise');
});