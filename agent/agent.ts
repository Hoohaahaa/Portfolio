import { defineAgent } from "eve";

export default defineAgent({
  model: "openai/gpt-5.4-mini",
  defaultTools: false,
  reasoning: 'low',
  limits: {sessionUsage:({window})=>(window.costUsd??0)>=2},
  experimental: {workflow:{retention:'default'}},
});
