const {neon}=require('@neondatabase/serverless');const {hash}=require('./model.cjs');
const db=()=>{if(!process.env.DATABASE_URL)throw Error('Storage unavailable');return neon(process.env.DATABASE_URL)};
function headers(res){res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff')}
function sameOrigin(req){const origin=req.headers.origin;if(!origin)return false;try{return new URL(origin).host===req.headers.host}catch{return false}}
function cookie(req){return (req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('monument_session='))?.split('=')[1]||''}
async function owner(sql,req){const t=cookie(req);if(!/^[a-f0-9]{64}$/.test(t))return null;const r=await sql`SELECT a.id,a.username FROM monument_accounts a JOIN monument_sessions s ON s.owner_id=a.id WHERE s.token_hash=${hash(t)} AND s.expires_at>now()`;return r[0]||null}
async function limit(sql,req,scope,max=30){const ip=String(req.headers['x-forwarded-for']||'unknown').split(',')[0].trim();const bucket=scope+':'+hash(ip).slice(0,24)+':'+Math.floor(Date.now()/600000);const r=await sql`INSERT INTO spatial_publish_limits(bucket,count,expires_at) VALUES(${bucket},1,now()+interval '20 minutes') ON CONFLICT(bucket) DO UPDATE SET count=spatial_publish_limits.count+1 RETURNING count`;return r[0].count<=max}
function body(req){const x=typeof req.body==='string'?JSON.parse(req.body):req.body;if(JSON.stringify(x||{}).length>60000)throw Error('Body too large');return x||{}}
module.exports={db,headers,sameOrigin,owner,limit,body,cookie};
