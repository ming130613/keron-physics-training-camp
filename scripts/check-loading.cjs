const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../loading.js'), 'utf8');
async function verify(mode) {
  let now = 0, removed = false, boot = true;
  const timers = new Map(); let id = 0;
  const app = {inert:false, setAttribute(){}, removeAttribute(){}};
  const loader = {classList:{add(){}}, remove(){removed=true;}};
  const context = vm.createContext({
    performance:{now:()=>now},
    window:{matchMedia:()=>({matches:mode==='reduced'})},
    document:{getElementById:key=>key==='app'?app:loader, documentElement:{classList:{remove(){boot=false;}}}},
    Image: class {set src(value){if(mode==='success'||mode==='reduced') this.onload(); else if(mode==='error') this.onerror();}},
    setTimeout(fn,ms){const key=++id;timers.set(key,{fn,at:now+ms});return key;},
    clearTimeout(key){timers.delete(key);}
  });
  vm.runInContext(source,context);
  assert.equal(app.inert,true);
  // Flush the preload Promise chain, then run timers in deadline order.
  for(let i=0;i<5;i++) await Promise.resolve();
  for(let count=0;timers.size&&count<10;count++) {
    const [key,timer]=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];
    timers.delete(key);now=timer.at;timer.fn();
  }
  assert.equal(app.inert,false,mode+' must unlock the app');
  assert.equal(removed,true);assert.equal(boot,false);
  assert.ok(now<=7500);
  if(mode==='reduced') assert.equal(now,0); else assert.ok(now>=2000);
}
(async()=>{for(const mode of ['success','error','hung','reduced']) await verify(mode);console.log('Passed: loader readiness, failed images, timeout escape, reduced motion.');})().catch(error=>{console.error(error);process.exitCode=1;});

