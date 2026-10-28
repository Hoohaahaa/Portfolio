import { defineWorkflowTool } from 'eve/tools';
import { BriefSchema, ResearchSchema, TechnologySchema, UXSchema, UISchema, ReviewSchema, RubricSchema, validateArtifacts, type Snapshot } from '../../lib/contracts';
export default defineWorkflowTool({
 description:'Run the entire typed product design operation once per brief: parallel research, technology and independent rubric; UX; UI prototype; independent review; one correction cycle; human approval.',inputSchema:BriefSchema,
 async *execute(brief,ctx){
  'use workflow';
  const call=async(name:string,prompt:string,schema:any)=>{const child=ctx.agent(name);const delivery=await child.send(prompt,{outputSchema:schema,signal:ctx.abortSignal});const result=await delivery.result();if(result.status!=='completed'||result.data===undefined)throw new Error(`${name}: ${result.error?.message??'No structured output returned'}`);return schema.parse(result.data);};
  let s:Snapshot={kind:'design-operation',version:1,phase:'discovery',brief,approval:'pending'};yield s;
  const context=JSON.stringify(brief);
  const [research,technology,rubric]=await Promise.all([call('research',`Produce problem framing, research plan, evidence ledger, requirements with acceptance criteria, alternatives and risks. Brief: ${context}`,ResearchSchema),call('technology',`Investigate technologies and interaction affordances. Brief: ${context}`,TechnologySchema),call('evaluator',`Design a blocking evaluation rubric BEFORE any solution is available. Do not report evaluation results. Brief: ${context}`,RubricSchema)]);
  s={...s,phase:'architecture',research,technology,rubric};yield s;
  const ux=await call('architect',`Design IA, named flow graph, journey and edge cases. Reuse exact requirement IDs. Context: ${JSON.stringify(s)}`,UXSchema);s={...s,ux,phase:'interface'};yield s;
  const ui=await call('designer',`Create a useful executable UI schema. At most 4 screens. Every navigate target must resolve to an existing screen ID. Every schema property is required: use empty strings/arrays when not applicable. Include a useful submit action. Map screens to exact requirement IDs. No arbitrary script or HTML. Context: ${JSON.stringify(s)}`,UISchema);s={...s,ui,phase:'evaluation'};s.checks=validateArtifacts(s);yield s;
  let review=await call('evaluator',`Critique the actual artifacts against the brief and rubric. Focus on unsupported evidence, missing states, usability, accessibility and traceability. Critical failures force revise. Never claim human research or usability testing was performed. Context: ${JSON.stringify(s)}`,ReviewSchema);s={...s,review};yield s;
  if(review.verdict==='revise'||s.checks?.some(c=>!c.pass)){s={...s,phase:'correction',version:2};yield s;const fixed=await call('designer',`Correct the UI using this independent review and machine checks. Preserve exact requirement IDs. Context: ${JSON.stringify(s)}`,UISchema);s={...s,ui:fixed,phase:'evaluation'};s.checks=validateArtifacts(s);yield s;review=await call('evaluator',`Re-evaluate the corrected draft and identify unresolved issues. Context: ${JSON.stringify(s)}`,ReviewSchema);s={...s,review};yield s;}
  s={...s,phase:'review',summary:`${research.requirements.length} requirements, ${ux.flow.nodes.length} flow nodes, ${s.ui?.screens.length} interactive screens. ${s.checks?.filter(c=>c.pass).length}/${s.checks?.length} machine checks passed. ${s.review?.findings.length} review findings. Human review and real-world validation remain.`};yield s;
  const blocked=s.checks?.some(c=>!c.pass)||s.review?.verdict==='revise';
  const answer=await ctx.ask({prompt:blocked?'Unresolved checks or reviewer findings prevent approval. Retain this version as a draft.':'Review this version before accepting it as a pilot draft. Approval does not authorize a production release or establish real-world validation.',display:'confirmation',options:blocked?[{id:'retain',label:'Keep as draft'}]:[{id:'approve',label:'Approve this draft',style:'primary'},{id:'retain',label:'Keep as draft'}]});
  s={...s,phase:'complete',approval:answer.status==='answered'&&answer.optionId==='approve'&&!blocked?'approved':'rejected'};yield s;return s;
 }
});
