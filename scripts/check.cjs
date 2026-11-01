const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
for (const file of ['runtime.js', 'script.js', 'loading.js']) new vm.Script(read(file), {filename:file});
const html = read('index.html');
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(https?:|data:)/.test(match[1]) || match[1].startsWith('assets/')) continue;
  assert.ok(fs.existsSync(path.join(root, match[1].split('?')[0])), `Missing local resource: ${match[1]}`);
}
assert.ok(html.indexOf('runtime.js') < html.indexOf('script.js'));
const listeners = {};
const context = vm.createContext({
  Map, String, HTMLImageElement: class {},
  localStorage: {getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}},
  document: {addEventListener(type, callback){listeners[type] = callback;}}
});
vm.runInContext(read('runtime.js'), context);
assert.equal(vm.runInContext('appStorage.getItem("missing")', context), null);
vm.runInContext('appStorage.setItem("selectedCharacter", "keroro")', context);
assert.equal(vm.runInContext('appStorage.getItem("selectedCharacter")', context), 'keroro');
vm.runInContext('var image = new HTMLImageElement(); image.dataset = {}; documentImage = image;', context);
listeners.error({target: context.documentImage});
assert.equal(context.documentImage.src, './assets/placeholder.svg');
context.documentImage.src = 'again.webp';
listeners.error({target: context.documentImage});
assert.equal(context.documentImage.src, 'again.webp', 'Fallback must not loop');
const names = [...read('script.js').matchAll(/^function (\w+)\(/gm)].map(m=>m[1]);
assert.equal(names.length, new Set(names).size, 'Duplicate top-level function');
console.log('Passed: syntax, local entry links, script order, blocked storage, image fallback, duplicate functions.');
require('./check-loading.cjs');

