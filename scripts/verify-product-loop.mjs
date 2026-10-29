// Real HTTP -> persistent store -> accepted source versions. No inference.
import assert from 'node:assert/strict';import {writeFileSync} from 'node:fs';
const origin=process.env.PZ_BASE_URL??'http://localhost:3100';
const headers={'Content-Type':'application/json',Origin:origin};if(process.env.PZ_OWNER_ACCESS_KEY)headers.Authorization=`Bearer ${process.env.PZ_OWNER_ACCESS_KEY}`;
async function command(body){const r=await fetch(origin+'/api/projects',{method:'POST',headers,body:JSON.stringify(body)});const data=await r.json();if(!r.ok)throw new Error(r.status+': '+data.error);return data;}
if(process.env.PZ_OWNER_ACCESS_KEY){const anon=await fetch(origin+'/api/projects');assert.equal(anon.status,401);}
const csrf=await fetch(origin+'/api/projects',{method:'POST',headers:{...headers,Origin:'https://unrelated.invalid'},body:JSON.stringify({action:'create',title:'Should not create',brief:'Cross-origin request must be blocked before any write.'})});assert.equal(csrf.status,403);
const at=new Date().toISOString();let p=await command({action:'create',title:'HTTP acceptance / Sound',brief:'Synthetic acceptance run. Keyboard Web Audio instrument; explicit audio enable, release, mute and a scoped waveform revision.'});
const projectId=p.id,first=p.versions[0];assert.equal(first.status.artifact,'built');
p=await command({action:'accept',projectId,versionId:first.id,expectedHead:null});
p=await command({action:'plan',projectId,baseVersionId:first.id,componentId:'component-waveform',request:'Add triangle waveform. Lock all other files.'});const change=p.changes.at(-1);
p=await command({action:'approve',projectId,changeId:change.id,digest:change.planDigest});
p=await command({action:'execute',projectId,changeId:change.id});const next=p.versions.at(-1);assert.ok(next.checks.every(t=>t.pass));assert.equal(p.changes.at(-1).diff.length,1);assert.equal(p.changes.at(-1).diff[0].path,'controls.js');
p=await command({action:'accept',projectId,versionId:next.id,expectedHead:first.id});
const fetched=await(await fetch(origin+'/api/projects',{headers})).json();assert.equal(fetched.projects.find(x=>x.id===projectId).acceptedVersionId,next.id);
p=await command({action:'revert',projectId,versionId:first.id,expectedHead:next.id});assert.equal(p.versions.at(-1).sourceDigest,first.sourceDigest);assert.equal(p.versions.length,3);
const result={at,scope:'Real HTTP API + persistent SQLite server store; browser interaction is not part of this script.',projectId,firstVersion:first.id,revisedVersion:next.id,restoredVersion:p.acceptedVersionId,changedFiles:['controls.js'],lockedFiles:Object.keys(change.lockedHashes),baseChecks:first.checks.length,candidateChecks:next.checks.length,allChecksPassed:true,versionCount:p.versions.length,reopenGETPassed:true,restoreDigestMatched:true,modelCalls:p.cost.modelCalls,actualModelUsd:p.cost.actualUsd,productionRelease:'blocked',browserValidation:'not-run-by-this-script'};
writeFileSync('docs/v1/evidence/http-loop.json',JSON.stringify(result,null,2)+'\n');writeFileSync('docs/v1/evidence/actual-loop-project.json',JSON.stringify(p,null,2)+'\n');writeFileSync('docs/v1/evidence/keyboard-sound-v1.html',first.preview);writeFileSync('docs/v1/evidence/keyboard-sound-v2.html',next.preview);console.log(JSON.stringify(result,null,2));
