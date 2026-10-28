import { defineAgent } from "eve";
import {producerModel} from "../lib/model-config";

export default defineAgent({
  model: producerModel,
  defaultTools: false,
  reasoning: 'low',
  limits: {sessionUsage:({window})=>(window.costUsd??0)>=2},
  experimental: {workflow:{retention:'default'}},
});
