import {spawn} from 'node:child_process';
const a=process.argv.slice(2);const i=a.indexOf('--port');const port=i<0?'3000':a[i+1];
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--webpack','--hostname','0.0.0.0','--port',port],{stdio:'inherit',env:process.env});
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??0));
