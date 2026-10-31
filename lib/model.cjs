const crypto=require('node:crypto');
const idOK=s=>/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s||'');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const token=()=>crypto.randomBytes(32).toString('hex');
const text=(v,n)=>typeof v==='string'&&v.length<=n;
const url=v=>!v||(text(v,2000)&&/^https:\/\//i.test(v)&&(()=>{try{const u=new URL(v);return !u.username&&!u.password}catch{return false}})());
function validate(x){
 if(!x||!['landscape','venue'].includes(x.kind)||!text(x.title,100)||!x.title.trim()||!text(x.body,12000)||!text(x.subtitle,300)||!text(x.place,200)||!url(x.image)||!url(x.audio)||!url(x.sourceUrl))return 'Check title, content and HTTPS media links.';
 if(!['story','artwork','menu','clock','news','advertisement'].includes(x.contentType))return 'Choose a content type.';
 for(const [k,min,max]of [['lat',-90,90],['lon',-180,180],['altitude',-500,100000],['width',.1,100000],['height',.1,100000],['heading',0,359.999],['maxRange',1,500000]])if(!Number.isFinite(x[k])||x[k]<min||x[k]>max)return 'Invalid '+k;
 if(!['public','unlisted','private'].includes(x.visibility)||!['ellipsoid','MSL'].includes(x.datum))return 'Invalid visibility or altitude datum.';
 for(const k of ['startsAt','endsAt'])if(x[k]&&(!text(x[k],40)||!Number.isFinite(Date.parse(x[k]))))return 'Invalid schedule.';
 if(x.startsAt&&x.endsAt&&Date.parse(x.endsAt)<=Date.parse(x.startsAt))return 'End must follow start.';
 if(!text(x.language,20)||!text(x.accessibility,3000)||!text(x.artist,200)||!text(x.materials,500)||!text(x.provenance,2000)||!text(x.sourceLabel,200))return 'Content field is too long.';
 if(!Array.isArray(x.menu)||x.menu.length>60||x.menu.some(m=>!text(m.name,120)||!m.name.trim()||!text(m.price,60)||!text(m.ingredients,600)||!text(m.allergens,400)))return 'Check menu items.';
 if(!['none','local','sky'].includes(x.arMode))return 'Invalid AR mode.';
 return null;
}
function availability(x,now=Date.now()){if(!x||x.visibility==='private')return 'unavailable';if(x.startsAt&&Date.parse(x.startsAt)>now)return 'scheduled';if(x.endsAt&&Date.parse(x.endsAt)<=now)return 'expired';return 'live'}
module.exports={idOK,hash,token,validate,availability};
