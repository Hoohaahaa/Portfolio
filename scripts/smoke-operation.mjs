// Real inference test. Requires owner credentials in the environment, never source.
// Uses a synthetic non-confidential brief, public search OFF, and a zero-priced model.
import { Client } from 'eve/client';
import { mkdir, writeFile } from 'node:fs/promises';
const baseUrl = process.env.PZ_BASE_URL;
const bearer = process.env.PZ_OWNER_ACCESS_KEY;
const bypass = process.env.PZ_PROTECTION_BYPASS;
const protectionCookie = process.env.PZ_PROTECTION_COOKIE;
const directory = process.env.PZ_EVIDENCE_DIR;
if (!baseUrl || !bearer || !directory) throw new Error('Set PZ_BASE_URL, PZ_OWNER_ACCESS_KEY and PZ_EVIDENCE_DIR.');
const headers = {...(bypass ? {'x-vercel-protection-bypass': bypass} : {}),
  ...(protectionCookie ? {Cookie:protectionCookie} : {})};
const preflight = await fetch(new URL('/api/status',baseUrl), {headers:{...headers,Authorization:`Bearer ${bearer}`},redirect:'error'});
const config = await preflight.json();
const allowed = 'nvidia/nemotron-3.5-lightning-free';
if (!config.authenticated || config.model !== allowed || config.evaluator !== allowed)
  throw new Error('Smoke test refuses to run unless both models are the verified zero-priced model.');
const client = new Client({ baseUrl, auth:{bearer}, headers });
console.log('Runtime health:',(await client.health()).status);
const brief = {
  title:'A shared studio session',
  brief:'Design a small prototype for people to plan a shared creative studio session. Let a person choose a session format and enter a name, see a preparation checklist, and save a local session draft. Include empty, invalid and saved states. No payments, real bookings or external messages. Keep the scope to two or three screens.',
  audience:'Adult creative collaborators preparing a small studio session. Keyboard and mobile access are required.',
  evidence:'Synthetic technical test brief. No interviews, analytics, observations or validated findings have been supplied.',
  designSystem:'none',direction:'editorial',
  tokens:{primary:'#c83f22',background:'#f5f2e9',foreground:'#20241f',radius:2},webResearch:false,
};
await mkdir(directory,{recursive:true});
const {session,delivery}=await client.sessions.create({message:JSON.stringify(brief)});
await writeFile(`${directory}/run.json`,JSON.stringify({sessionId:session.id,brief,baseUrl,at:new Date().toISOString()},null,2));
console.log('Actual session:',session.id);
const events=[]; let last;
try {
  for await (const event of delivery.stream({signal:AbortSignal.timeout(600_000)})) {
    if (!['content.delta','call.input'].includes(event.type)) events.push(event);
    if (['call.progress','call.settled'].includes(event.type) && event.data.output?.kind === 'design-operation') {
      last=event.data.output;
      console.log('Actual phase:',last.phase,'version:',last.version);
      await writeFile(`${directory}/snapshot.json`,JSON.stringify(last,null,2));
    }
    if (['interaction.opened','turn.settled','child.opened','call.settled'].includes(event.type))
      console.log('Runtime event:',event.type,JSON.stringify(event.data).slice(0,900));
    await writeFile(`${directory}/events.json`,JSON.stringify(events,null,2));
    if (event.type==='interaction.opened') break; // Never approve on behalf of the owner.
  }
  console.log('Stream finished. Latest artifact phase:',last?.phase??'No artifact snapshot');
} catch (error) {
  console.error('Stream stopped:',error.message);
  process.exitCode=1;
}
