(function(root){
'use strict';
const EARTH=6371008.8, RAD=Math.PI/180, DEG=180/Math.PI;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const normalize=a=>((Number(a)%360)+360)%360;
const signedDelta=(a,b)=>((normalize(a)-normalize(b)+540)%360)-180;
function distanceBearing(a,b){
 const p1=a.lat*RAD,p2=b.lat*RAD,dl=(b.lon-a.lon)*RAD,dp=(b.lat-a.lat)*RAD;
 const h=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;
 const distance=2*EARTH*Math.asin(Math.min(1,Math.sqrt(h)));
 const y=Math.sin(dl)*Math.cos(p2),x=Math.cos(p1)*Math.sin(p2)-Math.sin(p1)*Math.cos(p2)*Math.cos(dl);
 return {distance,bearing:normalize(Math.atan2(y,x)*DEG)};
}
function destination(origin,bearing,meters){
 const p=origin.lat*RAD,l=origin.lon*RAD,b=bearing*RAD,d=meters/EARTH;
 const q=Math.asin(Math.sin(p)*Math.cos(d)+Math.cos(p)*Math.sin(d)*Math.cos(b));
 const lon=l+Math.atan2(Math.sin(b)*Math.sin(d)*Math.cos(p),Math.cos(d)-Math.sin(p)*Math.sin(q));
 return {lat:q*DEG,lon:((lon*DEG+540)%360)-180};
}
function footprint(surface){
 const half=surface.width/2,axis=normalize(surface.heading+90);
 return [destination(surface.anchor,axis+180,half),destination(surface.anchor,axis,half)];
}
function projectToCamera(observer,heading,surface,fov=64){
 if(!observer||!Number.isFinite(heading))return {visible:false,reason:'pose_unavailable'};
 const g=distanceBearing(observer,surface.anchor),relative=signedDelta(g.bearing,heading);
 const frontDelta=Math.abs(signedDelta(normalize(g.bearing+180),surface.heading));
 const frontFacing=frontDelta<=90,insideFov=Math.abs(relative)<=fov/2;
 const x=50+(Math.tan(relative*RAD)/Math.tan(fov*RAD/2))*50;
 const apparentWidth=2*Math.atan2(surface.width/2,Math.max(1,g.distance))*DEG;
 const apparentHeight=2*Math.atan2(surface.height/2,Math.max(1,g.distance))*DEG;
 return {visible:frontFacing&&insideFov,reason:!frontFacing?'back_face':!insideFov?'outside_fov':'visible',distance:g.distance,bearing:g.bearing,relativeBearing:relative,x:clamp(x,-100,200),frontFacing,insideFov,apparentWidth,apparentHeight};
}
function validateSurface(s){
 const errors=[];
 if(!s||!s.anchor||!Number.isFinite(s.anchor.lat)||!Number.isFinite(s.anchor.lon))errors.push('anchor_invalid');
 else if(Math.abs(s.anchor.lat)>90||Math.abs(s.anchor.lon)>180)errors.push('anchor_out_of_range');
 if(!s||!Number.isFinite(s.width)||s.width<1||s.width>100000)errors.push('width_out_of_range');
 if(!s||!Number.isFinite(s.height)||s.height<1||s.height>100000)errors.push('height_out_of_range');
 if(!s||!Number.isFinite(s.heading)||s.heading<0||s.heading>=360)errors.push('heading_out_of_range');
 return {valid:errors.length===0,errors};
}
class EventBus{
 constructor(){this.listeners=new Map();this.sequence=0;this.history=[];this.limit=250}
 on(type,fn){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(fn);return ()=>this.listeners.get(type)?.delete(fn)}
 emit(type,payload={}){const event={id:++this.sequence,type,at:new Date().toISOString(),payload};this.history.unshift(event);if(this.history.length>this.limit)this.history.length=this.limit;for(const fn of this.listeners.get(type)||[])fn(event);for(const fn of this.listeners.get('*')||[])fn(event);return event}
 clear(){this.history=[];this.emit('diagnostics.cleared')}
}
const DEFAULT={id:'surface-local-01',name:'Untitled surface',geometry:'vertical-curtain',terrainMode:'follow-lower-edge',anchor:{lat:0,lon:0,altitude:null},anchorSet:false,width:120,height:18,heading:0,revision:1,updatedAt:null};
function clone(x){return JSON.parse(JSON.stringify(x))}
class SpatialStore{
 constructor(bus,initial){this.bus=bus;this.surface=clone(initial||DEFAULT);if(typeof this.surface.anchorSet!=='boolean')this.surface.anchorSet=!!(this.surface.anchor&&(this.surface.anchor.lat!==0||this.surface.anchor.lon!==0));this.undoStack=[];this.redoStack=[];this.maxHistory=60}
 snapshot(){return clone(this.surface)}
 commit(operation,patch,meta={}){
  const next={...this.surface,...patch,anchor:{...this.surface.anchor,...(patch.anchor||{})}};
  next.heading=normalize(next.heading);const check=validateSurface(next);
  if(!check.valid){this.bus.emit('surface.validation_failed',{operation,errors:check.errors});return false}
  this.undoStack.push(this.snapshot());if(this.undoStack.length>this.maxHistory)this.undoStack.shift();this.redoStack=[];
  this.surface=next;this.surface.revision+=1;this.surface.updatedAt=new Date().toISOString();
  this.bus.emit('surface.'+operation,{revision:this.surface.revision,...meta});this.bus.emit('surface.changed',{revision:this.surface.revision,operation});
  return true;
 }
 move(anchor){const d=distanceBearing(this.surface.anchor,anchor);return this.commit('moved',{anchor:{lat:anchor.lat,lon:anchor.lon},anchorSet:true},{distanceMeters:Math.round(d.distance*10)/10})}
 rotate(heading){return this.commit('rotated',{heading:normalize(heading)},{heading:normalize(heading)})}
 resize(width,height){return this.commit('resized',{width:Number(width),height:Number(height)},{width:Number(width),height:Number(height)})}
 undo(){if(!this.undoStack.length)return false;const revision=this.surface.revision+1;this.redoStack.push(this.snapshot());this.surface=this.undoStack.pop();this.surface.revision=revision;this.surface.updatedAt=new Date().toISOString();this.bus.emit('surface.undo',{revision});this.bus.emit('surface.changed',{revision,operation:'undo'});return true}
 redo(){if(!this.redoStack.length)return false;const revision=this.surface.revision+1;this.undoStack.push(this.snapshot());this.surface=this.redoStack.pop();this.surface.revision=revision;this.surface.updatedAt=new Date().toISOString();this.bus.emit('surface.redo',{revision});this.bus.emit('surface.changed',{revision,operation:'redo'});return true}
}
const api={EARTH,clamp,normalize,signedDelta,distanceBearing,destination,footprint,projectToCamera,validateSurface,EventBus,SpatialStore,DEFAULT};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.MonumentSpatialCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);