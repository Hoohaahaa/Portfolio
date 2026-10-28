'use client';
import {useState} from 'react';
import {Prototype} from '@/app/_components/prototype';
import {rendererFixture} from '@/tests/renderer-fixture';
import type {Brief} from '@/lib/contracts';
export default function RendererQA(){const [system,setSystem]=useState<Brief['designSystem']>('none');return <div style={{padding:20,maxWidth:1000,margin:'0 auto'}}><p className="eyebrow" style={{marginBottom:15,color:'#a13e25'}}>AUTHORED RENDERER TEST / NOT AI OUTPUT / NO EXECUTION CLAIM</p><label style={{display:'block',maxWidth:240,marginBottom:20}}>Component adapter<select value={system} onChange={e=>setSystem(e.target.value as Brief['designSystem'])}>{['none','ant','material','carbon','custom'].map(s=><option key={s} value={s}>{s}</option>)}</select></label><Prototype key={system} s={{...rendererFixture,brief:{...rendererFixture.brief,designSystem:system}}}/></div>}
