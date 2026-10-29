import type {z} from 'zod';
export interface ModelRequest<T>{taskId:string;role:string;input:unknown;schema:z.ZodType<T>;maxInputTokens:number;maxOutputTokens:number;authorizedUsd:0;dataClass:'public'|'synthetic';}
export interface ModelResult<T>{output:T;provider:string;model:string;inputTokens:number;outputTokens:number;actualUsd:number;}
export interface ModelAdapter{generate<T>(request:ModelRequest<T>):Promise<ModelResult<T>>;}
// V1 source-building does not call a model yet. Existing eve agents/configuration are preserved.
export const agentContracts=[
 ['research','Approved sources + brief','Evidence ledger and unknowns','Read approved material; public search only after permission','Each cited span resolves; no invented findings'],
 ['strategy','Intent + evidence IDs','Requirements + canonical acceptance IDs','Read shared model','Reject conflicting criteria'],
 ['systems','Requirements + capabilities','Runtime and dependency contract','Read capability registry','Unsupported hardware is explicit'],
 ['interaction','Requirements + flows','States, events and recovery paths','Read source mappings','Events resolve to behavior'],
 ['visual','Existing tokens + allowed scope','Constrained component style patch','Read token system','Locked styles unchanged'],
 ['engineering','Approved plan + source digests','Allowlisted patch','Isolated builder adapter','Hash locks, syntax, tests'],
 ['testing','Candidate digest + criteria','Executed reports','Deterministic runner','No model-authored PASS'],
 ['evaluation','Exact candidate + executed reports','Entity-linked findings','Read evidence only','No stale/cross-candidate claims']
].map(([role,input,output,tools,validation])=>({role,input,output,tools,validation,failure:'Block affected task; retain last accepted version; at most one targeted schema repair after precise issues.',status:'contract-defined-not-connected-to-source-loop'}));
