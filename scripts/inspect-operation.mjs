import {Client} from 'eve/client';
import {writeFile} from 'node:fs/promises';
const baseUrl=process.env.PZ_BASE_URL, bearer=process.env.PZ_OWNER_ACCESS_KEY;
const id=process.env.PZ_SESSION_ID, directory=process.env.PZ_EVIDENCE_DIR;
if(!baseUrl||!bearer||!id||!directory)throw new Error('Missing private environment configuration.');
const headers=process.env.PZ_PROTECTION_COOKIE?{Cookie:process.env.PZ_PROTECTION_COOKIE}:{};
const client=new Client({baseUrl,auth:{bearer},headers});
const session=client.sessions.attach(id);
if(process.env.PZ_CANCEL_TURN){
  const cancellation=await session.cancel({turnId:process.env.PZ_CANCEL_TURN});
  console.log('Cancellation:',(await cancellation.result({signal:AbortSignal.timeout(30_000)})).status);
}
const snapshot=await session.snapshot({signal:AbortSignal.timeout(45_000)});
await writeFile(`${directory}/durable-snapshot.json`,JSON.stringify(snapshot,null,2));
console.log('Durable session:',snapshot.session.sessionId,'events:',snapshot.events.length);
