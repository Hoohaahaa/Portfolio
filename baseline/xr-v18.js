(function(){'use strict';
const $=id=>document.getElementById(id);
let session=null,gl=null,refSpace=null,layer=null,program=null,vertexBuffer=null,texture=null,textureCanvas=null,texctx=null,record=null,anchor=null,camStream=null,frameCount=0,poseCount=0,paused=false,sourceOrigin=0,lastText=null,lastStatus=0,initialAnchor=null;
const center=(a,b)=>a+b;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function status(s){$('xrStatus').textContent=s}
function tone(){return record?.style?.preset||'editorial'}
function arMessage(){return String(record?.body||'MONUMENT').slice(0,500)}
function createTextureCanvas(){textureCanvas=document.createElement('canvas');textureCanvas.width=1024;textureCanvas.height=512;texctx=textureCanvas.getContext('2d')}
function updateTexture(){const ctx=texctx;ctx.clearRect(0,0,1024,512);const msg=arMessage();ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction=/[\u0600-\u06ff]/.test(msg)?'rtl':'ltr';ctx.fillStyle=tone()==='signal'?'#d4ffe8':'#fcfdf9';let size=128,lines=[];while(size>38){ctx.font='800 '+size+'px system-ui,Arial';lines=[];let part='';for(const word of msg.split(/\s+/)){const t=part?part+' '+word:word;if(ctx.measureText(t).width>920&&part){lines.push(part);part=word}else part=t}if(part)lines.push(part);if(lines.length<=3)break;size-=6}if(!lines.length)lines=[msg];const step=Math.min(150,size*1.22);lines.slice(0,3).forEach((line,i)=>{if(tone()==='outline'){ctx.strokeStyle='#f9fff9';ctx.lineWidth=2.5;ctx.strokeText(line,512,256+(i-(lines.length-1)/2)*step,920)}else ctx.fillText(line,512,256+(i-(lines.length-1)/2)*step,920)});gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,textureCanvas);lastText=msg}
function compile(type,src){const shader=gl.createShader(type);gl.shaderSource(shader,src);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error('SHADER '+gl.getShaderInfoLog(shader));return shader}
function configureGL(){createTextureCanvas();program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,'attribute vec3 position;attribute vec2 uvIn;uniform mat4 matrix;varying vec2 uv;void main(){gl_Position=matrix*vec4(position,1.0);uv=uvIn;}'));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,'precision mediump float;varying vec2 uv;uniform sampler2D textTexture;uniform float time;uniform float lum;void main(){float glyph=texture2D(textTexture,uv).a;float border=min(min(uv.x,1.0-uv.x),min(uv.y,1.0-uv.y));float edge=1.0-smoothstep(.0015,.003,border);float sweep=exp(-pow((uv.x*.85+uv.y*.15-fract(time*.07)*1.2)/.035,2.0));float a=clamp(glyph*(.86+lum*sweep)+edge*.32,0.0,.96);vec3 color=vec3(.91,.98,.95)+vec3(.04,.12,.05)*sweep*glyph;gl_FragColor=vec4(color,a);}'));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);vertexBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);for(const [name,size,off] of [['position',3,0],['uvIn',2,12]]){const loc=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,20,off)}texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);for(const [k,v]of [[gl.TEXTURE_MIN_FILTER,gl.LINEAR],[gl.TEXTURE_MAG_FILTER,gl.LINEAR],[gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE],[gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE]])gl.texParameteri(gl.TEXTURE_2D,k,v);updateTexture();gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.enable(gl.DEPTH_TEST);gl.depthMask(false);gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK)}
function product(a,b){const m=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)m[c*4+r]+=a[k*4+r]*b[c*4+k];return m}
// A single world-space placement is captured from the tracked viewer pose.
// It is NEVER recomputed during rendering, except when REPOSITION is explicitly tapped.
// XR local space is session-scoped: this is not a geographic/cloud anchor.
function computeAnchor(view){
 const t=view.transform,p=t.position,m=t.matrix;
 // The sky's reading direction is defined from the viewer's actual screen
 // orientation at placement time, NOT from a horizontal heading guess.
 // Project screen-right and screen-up onto the horizontal plane.
 const norm=(v)=>{const d=Math.hypot(v[0],v[2]);return d>.001?[v[0]/d,0,v[2]/d]:null};
 const forward=norm([-m[8],0,-m[10]])||[0,0,-1];
 const right=norm([m[0],0,m[2]])||[-forward[2],0,forward[0]];
 let up=norm([m[4],0,m[6]]);
 if(!up||Math.abs(up[0]*right[0]+up[2]*right[2])>.85)up=[-right[2],0,right[0]];
 // Make up orthogonal to right; preserve its original direction.
 const dot=up[0]*right[0]+up[2]*right[2];
 up=norm([up[0]-dot*right[0],0,up[2]-dot*right[2]])||[-right[2],0,right[0]];
 const sky=record.kind==='sky',venue=record.kind==='venue';
 const w=Math.max(.1,Number(record.width_m)||3),h=Math.max(.1,Number(record.height_m)||4);
 const distance=Math.max(2.8,Math.min(12,Math.max(w*1.15,h*.85)));
 const yOffset=sky?Math.max(2.5,Math.min(8,Number(record.altitude_m)||4)):0;
 anchor=Object.freeze({center:[p.x+forward[0]*distance,p.y+yOffset,p.z+forward[2]*distance],forward,right,up,w,h,sky,placedAt:performance.now()});
 status('PLACED IN SESSION LOCAL SPACE · TRACKING MAY DRIFT');
}
function vertices(){
 const a=anchor,w=a.w/2,h=a.h/2;
 const point=(x,y)=>{
  if(a.sky)return [a.center[0]+a.right[0]*x+a.up[0]*y,a.center[1],a.center[2]+a.right[2]*x+a.up[2]*y];
  return [a.center[0]+a.right[0]*x,a.center[1]+y,a.center[2]+a.right[2]*x];
 };
 const A=point(-w,-h),B=point(w,-h),C=point(-w,h),D=point(w,h);
 const out=[];
 const push=(v,u,q)=>out.push(...v,u,q);
 // UV origin is bottom-left in the GL texture after UNPACK_FLIP_Y_WEBGL.
 // The main face uses screen-right and screen-up as measured at placement.
 // Its back face has opposite winding and reversed horizontal UV.
 // World normal of A-B-C. A sky work must read normally from BELOW.
 const crossY=(B[2]-A[2])*(C[0]-A[0])-(B[0]-A[0])*(C[2]-A[2]);
 const front=[[A,0,0],[B,1,0],[C,0,1],[C,0,1],[B,1,0],[D,1,1]];
 const back=[[C,1,1],[B,0,0],[A,1,0],[D,0,1],[B,0,0],[C,1,1]];
 if(a.sky && crossY>0){
   // The original winding faces up; reverse it while preserving non-mirrored UV below.
   for(const [v,u,q] of [[C,0,1],[B,1,0],[A,0,0],[D,1,1],[B,1,0],[C,0,1]])push(v,u,q);
   for(const [v,u,q] of [[A,1,0],[B,0,0],[C,1,1],[C,1,1],[B,0,0],[D,0,1]])push(v,u,q);
 }else{for(const [v,u,q] of front)push(v,u,q);for(const [v,u,q] of back)push(v,u,q)}
 return new Float32Array(out);
}
function draw(t,frame){if(!session)return;session.requestAnimationFrame(draw);try{frameCount++;const pose=frame.getViewerPose(refSpace);if(!pose){if(t-lastStatus>2500){lastStatus=t;status('WAITING FOR TRACKING · MOVE PHONE SLOWLY')}return;}poseCount++;gl.bindFramebuffer(gl.FRAMEBUFFER,layer.framebuffer);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);if(!anchor)computeAnchor(pose.views[0]);if(!anchor)return;if(lastText!==arMessage())updateTexture();gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);gl.bufferData(gl.ARRAY_BUFFER,vertices(),gl.STATIC_DRAW);gl.vertexAttribPointer(gl.getAttribLocation(program,'position'),3,gl.FLOAT,false,20,0);gl.vertexAttribPointer(gl.getAttribLocation(program,'uvIn'),2,gl.FLOAT,false,20,12);gl.uniform1f(gl.getUniformLocation(program,'time'),t*.001);gl.uniform1f(gl.getUniformLocation(program,'lum'),.28);for(const view of pose.views){const vp=layer.getViewport(view);gl.viewport(vp.x,vp.y,vp.width,vp.height);gl.uniformMatrix4fv(gl.getUniformLocation(program,'matrix'),false,product(view.projectionMatrix,view.transform.inverse.matrix));gl.drawArrays(gl.TRIANGLES,0,12)}if(t-lastStatus>4000){lastStatus=t;status('TRACKING '+poseCount+'/'+frameCount+' · LOCAL SPACE · TRACKING CAN DRIFT · NO OCCLUSION')}}catch(e){status('XR RENDER ERROR: '+e.message);console.error(e)}}
function cleanup(){session=null;anchor=null;initialAnchor=null;gl=null;program=null;texture=null;document.body.classList.remove('xr-active');$('xrHud').hidden=true}
async function startXR(work){const c=document.createElement('canvas');gl=c.getContext('webgl',{alpha:true,antialias:true,xrCompatible:true});if(!gl)throw Error('WebGL not supported');session=await navigator.xr.requestSession('immersive-ar',{requiredFeatures:['local'],optionalFeatures:['dom-overlay'],domOverlay:{root:$('xrHud')}});session.addEventListener('end',cleanup);await gl.makeXRCompatible();layer=new XRWebGLLayer(session,gl);await session.updateRenderState({baseLayer:layer,depthNear:0.01,depthFar:1000});refSpace=await session.requestReferenceSpace('local');record=work;anchor=null;initialAnchor=null;frameCount=0;poseCount=0;lastText=null;configureGL();document.body.classList.add('xr-active');$('xrHud').hidden=false;$('xrMessage').value=arMessage();session.requestAnimationFrame(draw)}
async function fallback(work){record=work;const el=$('cameraLayer');$('cameraText').textContent=arMessage();el.hidden=false;status('CAMERA COMPOSITE · NOT WORLD ANCHORED');let s=null;try{if(navigator.mediaDevices?.getUserMedia){s=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});$('cameraVideo').srcObject=s;camStream=s;await $('cameraVideo').play()}}catch(e){window.MONUMENT_APP?.toast('CAMERA UNAVAILABLE · INTERACTIVE FALLBACK REMAINS VISIBLE')}const surface=$('cameraSurface');surface.style.left='17%';surface.style.top='34%';let active=false,startX=0,startY=0,startLeft=0,startTop=0;surface.onpointerdown=e=>{active=true;surface.setPointerCapture(e.pointerId);startX=e.clientX;startY=e.clientY;startLeft=surface.offsetLeft;startTop=surface.offsetTop};surface.onpointermove=e=>{if(!active)return;surface.style.left=clamp(startLeft+e.clientX-startX,0,innerWidth-surface.offsetWidth)+'px';surface.style.top=clamp(startTop+e.clientY-startY,0,innerHeight-surface.offsetHeight)+'px'};surface.onpointerup=()=>active=false;surface.onpointercancel=()=>active=false;}
function closeCamera(){const el=$('cameraLayer');el.hidden=true;try{camStream?.getTracks().forEach(t=>t.stop())}catch(e){}camStream=null;$('cameraVideo').srcObject=null}
async function launch(work){record=work;try{if(!navigator.xr)throw Error('WEBXR NOT SUPPORTED');await startXR(work)}catch(e){if(session){try{await session.end()}catch(_){}cleanup()}window.MONUMENT_APP?.toast('USING CAMERA COMPOSITE / '+e.message);await fallback(work)}}
$('xrExit').onclick=()=>session?.end();$('xrPlace').onclick=()=>{anchor=null;status('REPOSITION REQUESTED · NEW LOCAL PLACEMENT')};$('xrEdit').onclick=()=>{$('xrEditor').hidden=!$('xrEditor').hidden};$('xrApply').onclick=()=>{record.body=$('xrMessage').value.slice(0,500);lastText=null;$('xrEditor').hidden=true;status('TEXT CHANGED LOCALLY · PUBLISH TO SAVE')};$('cameraClose').onclick=closeCamera;window.MONUMENT_XR={launch,closeCamera};
})();
