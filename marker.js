(()=>{'use strict';
let stream=null,running=false,last=0,raf=0,detector=null;
const $=id=>document.getElementById(id);
function stop(){running=false;if(raf)cancelAnimationFrame(raf);raf=0;stream?.getTracks().forEach(t=>t.stop());stream=null;detector=null;const v=$('markerVideo');if(v){v.pause();v.srcObject=null}const layer=$('markerLayer');if(layer)layer.hidden=true}
async function launch(work){
 stop();const layer=$('markerLayer'),video=$('markerVideo'),canvas=$('markerCanvas');
 try{
  if(!navigator.mediaDevices?.getUserMedia)throw Error('Camera API unavailable. Open this page over HTTPS in a supported browser.');
  stream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}}});
  video.srcObject=stream;layer.hidden=false;$('markerTitle').textContent=work.title||'MONUMENT experience';$('markerDetail').textContent=work.subtitle||work.accessibility||'Point the camera at the printed QR for this experience.';
  await new Promise((resolve,reject)=>{if(video.readyState>=1)return resolve();const timer=setTimeout(()=>reject(Error('Camera started but no video frame arrived. Check whether another app is using the camera, then retry.')),9000);video.onloadedmetadata=()=>{clearTimeout(timer);resolve()};video.onerror=()=>{clearTimeout(timer);reject(Error('Camera video could not be decoded.'))}});
  await video.play();detector=null;
  if('BarcodeDetector'in window){try{const formats=await BarcodeDetector.getSupportedFormats();if(formats.includes('qr_code'))detector=new BarcodeDetector({formats:['qr_code']})}catch(_){}}
  running=true;const ctx=canvas.getContext('2d');
  $('markerStatus').textContent=detector?'LIVE CAMERA · Point at this experience’s printed QR.':'LIVE CAMERA · QR auto-detection is unavailable in this browser. Content remains available below.';
  const frame=async t=>{if(!running)return;if(t-last<180){raf=requestAnimationFrame(frame);return}last=t;canvas.width=innerWidth;canvas.height=innerHeight;ctx.clearRect(0,0,canvas.width,canvas.height);
   if(detector&&video.videoWidth&&video.videoHeight){try{const codes=await detector.detect(video);const match=codes.find(c=>{try{const u=new URL(c.rawValue);return u.origin===location.origin&&u.pathname==='/w/'+work.id}catch{return false}});if(match){const scale=Math.min(innerWidth/video.videoWidth,innerHeight/video.videoHeight),ox=(innerWidth-video.videoWidth*scale)/2,oy=(innerHeight-video.videoHeight*scale)/2;ctx.strokeStyle='#d9ff63';ctx.lineWidth=3;ctx.beginPath();match.cornerPoints.forEach((p,i)=>ctx[i?'lineTo':'moveTo'](ox+p.x*scale,oy+p.y*scale));ctx.closePath();ctx.stroke();$('markerStatus').textContent='MATCHED THIS EXPERIENCE · 2D QR TRACKING · NO DEPTH OR OCCLUSION'}else $('markerStatus').textContent='LIVE CAMERA · Point at this experience’s printed QR.'}catch{$('markerStatus').textContent='Camera is live; QR scan was interrupted. Hold the code steady and retry.'}}
   if(running)raf=requestAnimationFrame(frame)};
  raf=requestAnimationFrame(frame);
 }catch(e){stop();window.MONUMENT_APP?.toast('Camera unavailable: '+e.message)}
}
$('markerClose').onclick=stop;document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});window.MONUMENT_MARKER={launch,stop};
})();