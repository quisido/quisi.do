import { AGENT_CONFIG } from "./config/eslint-config/agent-config.js";
import type { ConfigObject } from "eslint/config";
import { HUMAN_CONFIG } from "./config/eslint-config/human-config.js";

const CONFIG: readonly ConfigObject[] = [
  { "ignores": ["coverage/", "node_modules/", "worker-configuration.d.ts"] },
  ...HUMAN_CONFIG,
  ...AGENT_CONFIG,
];

export default CONFIG;
