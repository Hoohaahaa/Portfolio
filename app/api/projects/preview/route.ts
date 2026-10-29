import {authorized} from '@/lib/auth';
import {starterFiles,buildApplication} from '@/lib/product/instrument';
export const runtime='nodejs';
export function GET(req:Request){if(!authorized(req))return new Response('Workspace access required',{status:401});return new Response(buildApplication(starterFiles()),{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Content-Security-Policy':"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'self'",'Permissions-Policy':'camera=(), microphone=()'}});}
