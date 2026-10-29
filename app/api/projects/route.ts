import {z} from 'zod';
import {authorized} from '@/lib/auth';
import {projectStore,storeConfig} from '@/lib/product/store';
import {ProductError} from '@/lib/product/model';
import {createProject,project,planChange,approvePlan,executeChange,acceptVersion,rejectVersion,revertVersion} from '@/lib/product/service';
export const runtime='nodejs';export const dynamic='force-dynamic';export const maxDuration=60;
const headers={'Cache-Control':'no-store'};
function error(e:unknown){return Response.json({error:e instanceof Error?e.message:'Project request failed',code:e instanceof ProductError?'product_conflict':'invalid_request'},{status:e instanceof ProductError?e.status:400,headers});}
export async function GET(req:Request){if(!authorized(req))return Response.json({error:'Workspace access required'},{status:401,headers});if(new URL(req.url).searchParams.has('config'))return Response.json(storeConfig(),{headers});try{return Response.json(await projectStore().read(),{headers});}catch(e){return error(e);}}
const Command=z.discriminatedUnion('action',[
 z.object({action:z.literal('create'),title:z.string().min(3).max(120),brief:z.string().min(20).max(6000)}),
 z.object({action:z.literal('plan'),projectId:z.string(),baseVersionId:z.string(),componentId:z.string(),request:z.string().min(5).max(1500)}),
 z.object({action:z.literal('approve'),projectId:z.string(),changeId:z.string(),digest:z.string()}),
 z.object({action:z.literal('execute'),projectId:z.string(),changeId:z.string()}),
 z.object({action:z.literal('accept'),projectId:z.string(),versionId:z.string(),expectedHead:z.string().nullable()}),
 z.object({action:z.literal('reject'),projectId:z.string(),versionId:z.string()}),
 z.object({action:z.literal('revert'),projectId:z.string(),versionId:z.string(),expectedHead:z.string()})]);
export async function POST(req:Request){if(!authorized(req))return Response.json({error:'Workspace access required'},{status:401,headers});if(req.headers.get('origin')&&(!/^https?:$/.test(new URL(req.headers.get('origin')!).protocol)||new URL(req.headers.get('origin')!).host!==req.headers.get('host')))return Response.json({error:'Origin mismatch'},{status:403,headers});try{if(Number(req.headers.get('content-length'))>12000)throw new ProductError('Request too large.',413);const raw=await req.text();if(Buffer.byteLength(raw)>12000)throw new ProductError('Request too large.',413);const c=Command.parse(JSON.parse(raw));const result=await projectStore().transact(s=>{if(c.action==='create')return createProject(s,c.title,c.brief);const p=project(s,c.projectId);switch(c.action){case'plan':planChange(p,c.baseVersionId,c.request,c.componentId);break;case'approve':approvePlan(p,c.changeId,c.digest);break;case'execute':executeChange(p,c.changeId);break;case'accept':acceptVersion(p,c.versionId,c.expectedHead);break;case'reject':rejectVersion(p,c.versionId);break;case'revert':revertVersion(p,c.versionId,c.expectedHead);break;}return p;});return Response.json(result,{headers});}catch(e){return error(e);}}
