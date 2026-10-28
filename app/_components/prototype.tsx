'use client';
import { useState, lazy, Suspense, type CSSProperties, type ReactNode } from 'react';
import type { Snapshot } from '@/lib/contracts';
const AntButton=lazy(()=>import('antd').then(m=>({default:m.Button}))),AntInput=lazy(()=>import('antd').then(m=>({default:m.Input})));
const MuiButton=lazy(()=>import('@mui/material/Button')),MuiField=lazy(()=>import('@mui/material/TextField'));
const CarbonButton=lazy(()=>import('@carbon/react').then(m=>({default:m.Button}))),CarbonInput=lazy(()=>import('@carbon/react').then(m=>({default:m.TextInput})));
function DSButton({ds,children,onClick}:{ds:string;children:ReactNode;onClick:()=>void}){
 const fallback=<button type="button" onClick={onClick}>{children}</button>;
 return <Suspense fallback={fallback}>{ds==='ant'?<AntButton type="primary" onClick={onClick}>{children}</AntButton>:ds==='material'?<MuiButton variant="contained" onClick={onClick}>{children}</MuiButton>:ds==='carbon'?<CarbonButton onClick={onClick}>{children}</CarbonButton>:fallback}</Suspense>;
}
function DSInput({ds,id,label,required,value,onChange}:{ds:string;id:string;label:string;required:boolean;value:string;onChange:(v:string)=>void}){
 const native=<input id={id} value={value} required={required} onChange={e=>onChange(e.target.value)} />;
 return <label className="proto-field" htmlFor={id}><span>{label}{required?' *':''}</span><Suspense fallback={native}>{ds==='ant'?<AntInput id={id} value={value} required={required} onChange={e=>onChange(e.target.value)} />:ds==='material'?<MuiField id={id} value={value} required={required} size="small" onChange={e=>onChange(e.target.value)} />:ds==='carbon'?<CarbonInput id={id} labelText={label} hideLabel value={value} required={required} onChange={e=>onChange(e.target.value)} />:native}</Suspense></label>;
}
export function Prototype({s}:{s:Snapshot}){
 const [screen,setScreen]=useState(0),[values,setValues]=useState<Record<string,string>>({}),[message,setMessage]=useState('');
 if(!s.ui)return <div className="empty-artifact">The interface agent has not produced a screen yet.</div>;
 const sc=s.ui.screens[Math.min(screen,s.ui.screens.length-1)],ds=s.brief.designSystem;
 const tokenStyle={'--proto-bg':s.brief.tokens.background,'--proto-fg':s.brief.tokens.foreground,'--proto-primary':s.brief.tokens.primary,'--proto-radius':`${s.brief.tokens.radius}px`} as CSSProperties;
 const act=(b:typeof sc.blocks[number])=>{setMessage('');if(b.action==='navigate'){const target=s.ui!.screens.findIndex(a=>a.id===b.target);if(target>=0)setScreen(target);}if(b.action==='submit'){const missing=sc.blocks.filter(a=>a.required&&['input','select','toggle'].includes(a.kind)&&!values[a.id]);setMessage(missing.length?`Complete: ${missing.map(a=>a.label).join(', ')}.`:'Saved in this prototype session. No external transaction was performed.');}};
 return <><div className="prototype-toolbar"><span className="eyebrow">INTERACTIVE UI / {ds==='none'?'CURATED DIRECTION':ds.toUpperCase()}</span><button className="text-button" onClick={()=>{setScreen(0);setValues({});setMessage('');}}>Reset prototype ↺</button></div><div className={`prototype direction-${s.brief.direction}`} style={tokenStyle}>
  <header className="proto-header"><strong>{s.ui.appName}</strong><span>Local interactive prototype</span></header>
  <nav aria-label="Prototype screens">{s.ui.screens.map((v,i)=><button key={v.id} className={i===screen?'selected':''} onClick={()=>{setScreen(i);setMessage('');}}>{v.title}</button>)}</nav>
  <article className="proto-screen" key={sc.id}><span className="eyebrow">{sc.requirementIds.join(' / ')}</span><h2>{sc.title}</h2><p>{sc.description}</p><div className="proto-blocks">{sc.blocks.map(b=><div key={b.id}>
   {b.kind==='text'&&<section><h3>{b.label}</h3><p>{b.content}</p></section>}
   {b.kind==='input'&&<DSInput ds={ds} id={`p-${b.id}`} label={b.label} required={b.required} value={values[b.id]??''} onChange={v=>setValues({...values,[b.id]:v})}/>}
   {b.kind==='select'&&<label className="proto-field"><span>{b.label}</span><select value={values[b.id]??''} onChange={e=>setValues({...values,[b.id]:e.target.value})}><option value="">Choose an option</option>{b.options.map(o=><option key={o}>{o}</option>)}</select></label>}
   {b.kind==='toggle'&&<label className="check"><input type="checkbox" checked={Boolean(values[b.id])} onChange={e=>setValues({...values,[b.id]:e.target.checked?'true':''})}/>{b.label}</label>}
   {b.kind==='button'&&<DSButton ds={ds} onClick={()=>act(b)}>{b.label}</DSButton>}
   {b.kind==='list'&&<section><h3>{b.label}</h3><ul>{(b.options.length?b.options:[b.content]).map(o=><li key={o}>{o}</li>)}</ul></section>}
   {b.kind==='metric'&&<section className="proto-metric"><span>{b.label}</span><strong>{b.content}</strong><small>Illustrative UI content</small></section>}
  </div>)}</div>{message&&<p className="proto-feedback" role="status">{message}</p>}</article>
 </div><p className="caption">Ant, Material and Carbon use their installed button and text-input components. Other schema blocks use the shared semantic renderer. This draft has no production backend.</p></>;
}
