import { generateText, gateway } from 'ai';
import { producerModel, evaluatorModel } from '@/lib/model-config';
import { authorized } from '@/lib/auth';

export const maxDuration = 60;

function failure(error: unknown) {
  const e = error as { message?: string; statusCode?: number; type?: string; cause?: {statusCode?: number} };
  const message = e?.message ?? 'Connection failed';
  return { ok: false,
    code: /Free tier|credits|verification|balance/i.test(message) ? 'model_access_required' : 'inference_failed',
    error: message, upstreamStatus: e?.statusCode ?? e?.cause?.statusCode ?? null,
    upstreamType: e?.type ?? null, model: producerModel, at: new Date().toISOString(),
  };
}

// Owner-only, read-only diagnostics. Never return a token or decoded JWT.
export async function GET(request: Request) {
  if (!authorized(request)) return Response.json({ error: 'Workspace access required' }, { status: 401 });
  let credits;
  try { credits = { ok: true, ...await gateway.getCredits() }; }
  catch (error) { credits = failure(error); }
  return Response.json({ projectId: process.env.VERCEL_PROJECT_ID ?? null,
    environment: process.env.VERCEL_ENV ?? null,
    oidcEnvPresent: Boolean(process.env.VERCEL_OIDC_TOKEN),
    authResolution: process.env.AI_GATEWAY_API_KEY ? 'gateway-api-key' : 'vercel-request-context-oidc',
    gatewayKeyPresent: Boolean(process.env.AI_GATEWAY_API_KEY), producer: producerModel,
    evaluator: evaluatorModel, credits, at: new Date().toISOString(),
  }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  if (!authorized(request)) return Response.json({ error: 'Workspace access required' }, { status: 401 });
  if (request.headers.get('origin') && request.headers.get('origin') !== new URL(request.url).origin)
    return Response.json({ error: 'Origin mismatch' }, { status: 403 });
  try {
    const r = await generateText({ model: producerModel, prompt: 'Reply with exactly READY.',
      maxOutputTokens: 512, reasoning: 'low', maxRetries: 0, abortSignal: AbortSignal.timeout(45_000),
    });
    return Response.json({ ok: Boolean(r.text.trim()), text: r.text, model: r.response.modelId,
      usage: r.usage, providerMetadata: r.finalStep.providerMetadata, at: new Date().toISOString(),
    });
  } catch (error) { return Response.json(failure(error), { status: 503 }); }
}
