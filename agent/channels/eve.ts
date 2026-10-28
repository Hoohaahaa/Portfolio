import { eveChannel } from "eve/channels/eve";
import { localDev,vercelOidc,type AuthFn } from "eve/channels/auth";
import { authorized } from "../../lib/auth";
const owner:AuthFn<Request>=async request=>authorized(request)?{authenticator:"owner-session",principalId:"owner",principalType:"user",attributes:{workspace:"product-zero"}}:null;
export default eveChannel({auth:[owner,vercelOidc(),localDev()]});