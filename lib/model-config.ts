// Verified 2026-10-28: zero-priced AND availableToFreeTier in Vercel's catalog.
// Promotional availability can change. No automatic paid-model fallback.
export const producerModel=process.env.PRODUCER_MODEL||'nvidia/nemotron-3.5-lightning-free';
export const evaluatorModel=process.env.EVALUATOR_MODEL||'nvidia/nemotron-3.5-lightning-free';
