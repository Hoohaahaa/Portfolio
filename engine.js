(()=>{'use strict';
const Core=window.MonumentSpatialCore;if(!Core)throw new Error('Spatial Core failed to load');
const $=id=>document.getElementById(id),bus=new Core.EventBus();
const STORAGE_KEY='monument-spatial-lab-draft-v1';
let initial,invalidSavedDraft=false;
try{initial=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')}catch(_){initial=null}
if(initial&&!Core.validateSurface(initial).valid){initial=null;invalidSavedDraft=true}
const store=new Core.SpatialStore(bus,initial||Core.DEFAULT);
let map,baseline,anchorMarker,observerMarker,locationWatch=null,mediaStream=null,deviceHeading=null,headingSamples=[],lastLocation=null,locationAccuracy=null,orientationPermission='unknown',cameraState='stopped',sheetMode='half',activeView='split',dragStartY=null,dragStartHeight=54,toastTimer=null,diagnosticsOpen=false,lastAbsoluteAt=0,lastHeadingEventAt=0,lastEmittedHeading=null;
const setText=(id,value)=>{const el=$(id);if(el)el.textContent=value};
const showToast=message=>{const el=$('toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,2600)};
const emit=(type,payload)=>bus.emit(type,payload);
function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(store.snapshot()));setText('draftState','LOCAL DRAFT · SAVED');emit('draft.local_saved',{revision:store.surface.revision})}catch(e){emit('draft.save_failed',{reason:e.name||'storage_error'});showToast('Could not save this draft on this device.')}}
function initMap(){
 map=L.map('engineMap',{zoomControl:false,attributionControl:true,preferCanvas:true}).setView([20,0],2);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(map);
 L.control.zoom({position:'bottomright'}).addTo(map);
 baseline=L.polyline([], {color:'#ff573d',weight:5,opacity:.95,lineCap:'round'}).addTo(map);
 anchorMarker=L.marker([0,0],{draggable:true,keyboard:true,autoPan:true,icon:L.divIcon({className:'surface-pin-wrap',html:'<span class="surface-pin"><i></i></span>',iconSize:[32,32],iconAnchor:[16,16]})}).addTo(map);
 anchorMarker.on('dragstart',()=>emit('map.drag_started'));
 anchorMarker.on('drag',e=>{const p=e.target.getLatLng();drawSurface(p.lat,p.lng,false)});
 anchorMarker.on('dragend',e=>{const p=e.target.getLatLng();store.move({lat:p.lat,lon:p.lng});emit('map.drag_committed',{source:'marker'});renderAll()});
 observerMarker=L.circleMarker([0,0],{radius:6,color:'#f7f5ef',weight:2,fillColor:'#ff573d',fillOpacity:1}).addTo(map);
 observerMarker.setStyle({opacity:0,fillOpacity:0});
 map.on('zoomend moveend',()=>{if(map.getZoom()>2)setText('mapScale','ZOOM '+map.getZoom()+' / WGS84')});
 map.on('click',e=>{if(!lastLocation){store.move({lat:e.latlng.lat,lon:e.latlng.lng});renderAll();showToast('Surface anchor moved. Start location to compare against your device.')}});
 drawSurface();
 emit('map.initialized',{provider:'OpenStreetMap',projection:'EPSG:3857'});
}
function drawSurface(tempLat,tempLon,updateMarker=true){
 if(!map)return;const s=store.surface,anchor={lat:tempLat??s.anchor.lat,lon:tempLon??s.anchor.lon};
 if(!s.anchorSet&&!lastLocation){baseline.setLatLngs([]);anchorMarker.setOpacity(0);setText('mapCoordinates','Waiting for location or map placement');return}
 const ends=Core.footprint({...s,anchor});
 baseline.setLatLngs(ends.map(p=>[p.lat,p.lon]));
 if(updateMarker){anchorMarker.setLatLng([anchor.lat,anchor.lon]);anchorMarker.setOpacity(1)}
 setText('mapBearing',String(Math.round(s.heading)).padStart(3,'0')+'°');
 setText('mapCoordinates',anchor.lat.toFixed(5)+'°, '+anchor.lon.toFixed(5)+'°');
 $('northArrow').style.transform='rotate(0deg)';
}
function renderAll(){
 const s=store.surface;drawSurface();setText('widthValue',s.width.toLocaleString()+' m');setText('heightValue',s.height.toLocaleString()+' m');setText('bearingValue',String(Math.round(s.heading)).padStart(3,'0')+'°');
 $('widthControl').value=s.width;$('heightControl').value=s.height;$('bearingControl').value=Math.round(s.heading);
 $('undoEdit').disabled=!store.undoStack.length;$('redoEdit').disabled=!store.redoStack.length;
 setText('projectedName',s.name);setText('projectedDimensions',s.width+' m × '+s.height+' m');setText('mapBearing',String(Math.round(s.heading)).padStart(3,'0')+'°');
 updateProjection();emit('ui.surface_rendered',{revision:s.revision});
}
function updateProjection(){
 const s=store.surface,el=$('projectedSurface');if(!lastLocation||deviceHeading===null){el.hidden=true;setText('sceneHint',deviceHeading===null?'Compass heading unavailable · projection is not aligned.':'Waiting for a location fix.');return}
 const p=Core.projectToCamera(lastLocation,deviceHeading,s,64);
 if(!p.visible){el.hidden=true;setText('sceneHint',p.reason==='back_face'?'The back face is toward you. Rotate the surface or walk around it.':'Surface is outside the approximate camera field of view.');return}
 el.hidden=false;el.style.left=p.x+'%';el.style.width=Math.max(18,Math.min(76,p.apparentWidth/64*100))+'%';el.style.height=Math.max(12,Math.min(72,p.apparentHeight/50*100))+'%';setText('projectedDistance',p.distance>999?(p.distance/1000).toFixed(2)+' km':Math.round(p.distance)+' m');setText('sceneHint','Approximate compass projection · '+Math.round(p.relativeBearing)+'° relative bearing');setText('sceneFootnote','Approximate GPS + compass projection · NOT WORLD-LOCKED');
}
function renderEvents(){
 const list=$('eventStream'),items=bus.history.slice(0,45);list.innerHTML='';
 if(!items.length){list.innerHTML='<li class="empty-events">Waiting for the first system event.</li>';return}
 for(const e of items){const li=document.createElement('li');li.className='event-item';const time=new Date(e.at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'});const payload=Object.entries(e.payload||{}).map(([k,v])=>k+': '+(typeof v==='object'?JSON.stringify(v):String(v))).join(' · ');li.innerHTML='<span class="event-time"></span><span class="event-mark"></span><div><b class="event-name"></b><small class="event-payload"></small></div>';li.querySelector('.event-time').textContent=time;li.querySelector('.event-name').textContent=e.type;li.querySelector('.event-payload').textContent=payload;list.appendChild(li)}
 setText('eventCounter',bus.history.length+' EVENTS');setText('eventCountDrawer',String(bus.history.length));setText('diagEvents',bus.history.length+' recorded');
}
bus.on('*',event=>{setText('eventCounter',bus.history.length+' EVENTS');if(diagnosticsOpen)renderEvents()});
function setLocation(position){
 const c=position.coords;lastLocation={lat:c.latitude,lon:c.longitude,altitude:Number.isFinite(c.altitude)?c.altitude:0};locationAccuracy=c.accuracy;
 if(!store.surface.anchorSet){store.move({lat:c.latitude,lon:c.longitude});}
 observerMarker.setLatLng([c.latitude,c.longitude]);observerMarker.setStyle({opacity:1,fillOpacity:1});
 if(map&&map.getZoom()<5)map.setView([c.latitude,c.longitude],16,{animate:true});else if(map)observerMarker.setLatLng([c.latitude,c.longitude]);
 setText('mapState','LOCATION FIX · ±'+Math.round(c.accuracy)+' M');setText('poseAccuracy','±'+Math.round(c.accuracy)+' m');setText('poseState',c.accuracy>50?'LOW ACCURACY':'GPS ACTIVE');setText('diagLocation','±'+Math.round(c.accuracy)+' m');setText('mapCoordinates',store.surface.anchor.lat.toFixed(5)+'°, '+store.surface.anchor.lon.toFixed(5)+'°');
 emit('location.updated',{accuracyMeters:Math.round(c.accuracy),altitudeAvailable:Number.isFinite(c.altitude)});
 updateProjection();
}
function locationError(error){setText('mapState','LOCATION ERROR');setText('diagLocation',error.message||'Denied');setText('poseState','NO GPS');emit('location.error',{code:error.code,message:error.message});showToast('Location unavailable. Check browser permission and retry.')}
function circularMean(values){let x=0,y=0;for(const v of values){x+=Math.cos(v*Math.PI/180);y+=Math.sin(v*Math.PI/180)}return Core.normalize(Math.atan2(y,x)*180/Math.PI)}
function handleOrientation(e){
 let h=null;if(Number.isFinite(e.webkitCompassHeading))h=e.webkitCompassHeading;else if(Number.isFinite(e.alpha)){h=Core.normalize(360-e.alpha+(screen.orientation?.angle||0))}
 if(h===null)return;headingSamples.push(h);if(headingSamples.length>7)headingSamples.shift();deviceHeading=circularMean(headingSamples);
 setText('sceneHeading','HEADING '+String(Math.round(deviceHeading)).padStart(3,'0')+'°');setText('poseAzimuth',Math.round(deviceHeading)+'°');setText('diagCompass',Math.round(deviceHeading)+'°');setText('poseState',lastLocation?'GPS + COMPASS':'COMPASS ACTIVE');
 $('northArrow').style.transform='rotate(0deg)';updateProjection();const now=Date.now(),rounded=Math.round(deviceHeading);if(lastEmittedHeading===null||Math.abs(Core.signedDelta(rounded,lastEmittedHeading))>=2||now-lastHeadingEventAt>1000){lastEmittedHeading=rounded;lastHeadingEventAt=now;emit('orientation.updated',{heading:rounded,source:Number.isFinite(e.webkitCompassHeading)?'webkitCompassHeading':e.type,absolute:!!e.absolute});}
}
async function startSession(){
 $('startSession').disabled=true;setText('startSession','Starting…');emit('session.start_requested');
 try{
  if(typeof DeviceOrientationEvent==='undefined')throw new Error('Device orientation is not supported in this browser.');
  if(typeof DeviceOrientationEvent.requestPermission==='function'){orientationPermission=await DeviceOrientationEvent.requestPermission();if(orientationPermission!=='granted')throw new Error('Motion permission was not granted.')}
  window.addEventListener('deviceorientationabsolute',handleOrientation,true);window.addEventListener('deviceorientation',handleOrientation,true);
  emit('orientation.listener_started',{permission:orientationPermission});
 }catch(e){setText('diagCompass','Unavailable');emit('orientation.error',{message:e.message});showToast('Compass unavailable: '+e.message)}
 try{
  if(!navigator.mediaDevices?.getUserMedia)throw new Error('Camera API unavailable. Open this page over HTTPS in a supported browser.');
  mediaStream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720},frameRate:{ideal:24,max:30}}});
  $('sceneVideo').srcObject=mediaStream;await $('sceneVideo').play();$('sceneVideo').hidden=false;$('sceneFallback').hidden=true;cameraState='running';setText('diagCamera','Running');setText('sceneModeLabel','LIVE CAMERA');emit('camera.started',{width:$('sceneVideo').videoWidth,height:$('sceneVideo').videoHeight});
 }catch(e){cameraState='unavailable';setText('diagCamera','Unavailable');emit('camera.error',{name:e.name,message:e.message});showToast('Camera unavailable: '+e.message)}
 try{
  if(!navigator.geolocation)throw new Error('Geolocation is not supported by this browser.');
  locationWatch=navigator.geolocation.watchPosition(setLocation,locationError,{enableHighAccuracy:true,maximumAge:2500,timeout:18000});
  emit('location.watch_started',{highAccuracy:true});
 }catch(e){locationError({code:0,message:e.message})}
 $('startSession').hidden=true;$('stopSession').disabled=false;setText('mapState',lastLocation?'LOCATION ACTIVE':'WAITING FOR LOCATION');updateProjection();emit('session.started',{camera:cameraState,orientationPermission});
}
function stopSession(){
 if(locationWatch!==null)navigator.geolocation.clearWatch(locationWatch);locationWatch=null;
 if(mediaStream)mediaStream.getTracks().forEach(t=>t.stop());mediaStream=null;$('sceneVideo').srcObject=null;$('sceneVideo').hidden=true;$('sceneFallback').hidden=false;
 window.removeEventListener('deviceorientationabsolute',handleOrientation,true);window.removeEventListener('deviceorientation',handleOrientation,true);
 cameraState='stopped';deviceHeading=null;headingSamples=[];lastAbsoluteAt=0;lastEmittedHeading=null;setText('diagCamera','Stopped');setText('diagCompass','Stopped');setText('diagLocation','Paused');setText('mapState','SESSION STOPPED');setText('poseState','IDLE');setText('sceneModeLabel','SCENE PREVIEW');$('projectedSurface').hidden=true;$('sceneHint').textContent='Camera alignment is not active.';$('startSession').hidden=false;$('startSession').disabled=false;$('startSession').innerHTML='Start field session <span>↗</span>';$('stopSession').disabled=true;emit('session.stopped');
}
function setView(mode){activeView=mode;$('engineApp').dataset.view=mode;emit('ui.view_changed',{mode});setTimeout(()=>map.invalidateSize({pan:false}),220)}
function setSheet(mode){sheetMode=mode;$('engineApp').dataset.sheet=mode;if(mode!=='custom')$('engineApp').style.removeProperty('--sheet-height');emit('ui.map_sheet_changed',{mode});setTimeout(()=>map.invalidateSize({pan:false}),220)}
function setupSheet(){
 const grip=$('sheetGrip'),mainHeight=()=>Math.max(1,$('engineApp').querySelector('.engine-main').getBoundingClientRect().height);
 grip.addEventListener('pointerdown',e=>{dragStartY=e.clientY;dragStartHeight=$('controlsPanel').parentElement.getBoundingClientRect().height/mainHeight()*100;grip.setPointerCapture(e.pointerId)});
 grip.addEventListener('pointermove',e=>{if(dragStartY===null||activeView!=='split')return;const next=Core.clamp(dragStartHeight-(e.clientY-dragStartY)/mainHeight()*100,28,88);sheetMode='custom';$('engineApp').dataset.sheet='custom';$('engineApp').style.setProperty('--sheet-height',next.toFixed(1)+'%')});
 grip.addEventListener('pointerup',()=>{if(dragStartY===null)return;const h=$('controlsPanel').parentElement.getBoundingClientRect().height/mainHeight()*100;dragStartY=null;if(h<35)setSheet('collapsed');else if(h>80)setSheet('expanded');else{sheetMode='custom';$('engineApp').dataset.sheet='custom';$('engineApp').style.setProperty('--sheet-height',h.toFixed(1)+'%');emit('ui.map_sheet_changed',{mode:'custom',heightPercent:Math.round(h)})}setTimeout(()=>map.invalidateSize({pan:false}),220)});
 grip.addEventListener('keydown',e=>{if(e.key==='ArrowUp'){setSheet(sheetMode==='collapsed'?'half':'expanded');e.preventDefault()}if(e.key==='ArrowDown'){setSheet(sheetMode==='expanded'?'half':'collapsed');e.preventDefault()}});
}
function bind(){
 $('startSession').addEventListener('click',startSession);$('stopSession').addEventListener('click',stopSession);
 $('widthControl').addEventListener('input',e=>{store.surface.width=Number(e.target.value);setText('widthValue',store.surface.width+' m');drawSurface();updateProjection()});
 $('widthControl').addEventListener('change',e=>{store.commit('resized',{width:Number(e.target.value)},{width:Number(e.target.value),height:store.surface.height});renderAll()});
 $('heightControl').addEventListener('input',e=>{store.surface.height=Number(e.target.value);setText('heightValue',store.surface.height+' m');updateProjection()});
 $('heightControl').addEventListener('change',e=>{store.commit('resized',{height:Number(e.target.value)},{width:store.surface.width,height:Number(e.target.value)});renderAll()});
 $('bearingControl').addEventListener('input',e=>{store.surface.heading=Number(e.target.value);setText('bearingValue',String(store.surface.heading).padStart(3,'0')+'°');drawSurface();updateProjection()});
 $('bearingControl').addEventListener('change',e=>{store.rotate(Number(e.target.value));renderAll()});
 $('rotateMinus').addEventListener('click',()=>{store.rotate(store.surface.heading-5);renderAll()});$('rotatePlus').addEventListener('click',()=>{store.rotate(store.surface.heading+5);renderAll()});
 $('undoEdit').addEventListener('click',()=>{if(store.undo()){renderAll();emit('history.undo_clicked')}});$('redoEdit').addEventListener('click',()=>{if(store.redo()){renderAll();emit('history.redo_clicked')}});
 $('saveDraft').addEventListener('click',persist);
 $('locateMe').addEventListener('click',()=>{if(lastLocation){map.setView([lastLocation.lat,lastLocation.lon],17,{animate:true});emit('map.centered_on_user')}else{showToast('Start a field session to request your location.')}});
 $('resetView').addEventListener('click',()=>{if(lastLocation)map.setView([lastLocation.lat,lastLocation.lon],16);else map.setView([20,0],2);setSheet('half');setView('split');emit('ui.reset_view')});
 $('mapFullscreen').addEventListener('click',()=>setView(activeView==='map'?'split':'map'));$('mapExpand').addEventListener('click',()=>setView(activeView==='map'?'split':'map'));$('sceneFullscreen').addEventListener('click',()=>setView(activeView==='camera'?'split':'camera'));
 $('openDiagnostics').addEventListener('click',()=>{diagnosticsOpen=true;$('diagnosticsDrawer').classList.add('open');$('diagnosticsDrawer').setAttribute('aria-hidden','false');renderEvents();emit('diagnostics.opened')});
 $('closeDiagnostics').addEventListener('click',()=>{diagnosticsOpen=false;$('diagnosticsDrawer').classList.remove('open');$('diagnosticsDrawer').setAttribute('aria-hidden','true')});
 $('exportEvents').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({schemaVersion:'1.0.0',exportedAt:new Date().toISOString(),surface:store.snapshot(),events:bus.history},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='monument-spatial-diagnostics.json';a.click();URL.revokeObjectURL(url);emit('diagnostics.exported',{eventCount:bus.history.length})});
 $('clearEvents').addEventListener('click',()=>{bus.clear();renderEvents()});
 window.addEventListener('resize',()=>map.invalidateSize({pan:false}));
 document.addEventListener('visibilitychange',()=>emit('runtime.visibility_changed',{state:document.visibilityState}));
 setupSheet();
}
function boot(){
 if(invalidSavedDraft)showToast('Saved draft was invalid. Started a clean surface.');
 initMap();bind();renderAll();if(initial){setText('draftState','LOCAL DRAFT · RESTORED');emit('draft.restored',{revision:store.surface.revision})}
 bus.on('surface.changed',()=>{setText('draftState','UNSAVED CHANGES');$('undoEdit').disabled=!store.undoStack.length;$('redoEdit').disabled=!store.redoStack.length});
 emit('engine.ready',{version:'0.1.0',geometry:'vertical-curtain',terrainMode:'follow-lower-edge',renderer:'camera-projection-preview'});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();