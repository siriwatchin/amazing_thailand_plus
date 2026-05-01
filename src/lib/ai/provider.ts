import type { AIProvider } from "./types";
import { mockProvider } from "./mockProvider";

// To swap in a real Claude-backed provider later:
//   1. Implement `claudeProvider` (see claudeProvider.ts.example)
//   2. Add it to the switch below
//   3. Set NEXT_PUBLIC_AI_PROVIDER=claude in .env.local
//
// Components must always import via getProvider() — never the mock directly —
// so the swap is a single line of config.
export function getProvider(): AIProvider {
  const choice = process.env.NEXT_PUBLIC_AI_PROVIDER ?? "mock";
  switch (choice) {
    case "mock":
      return mockProvider;
    case "claude":
      throw new Error(
        "claudeProvider not implemented — see src/lib/ai/claudeProvider.ts.example",
      );
    default:
      throw new Error(`Unknown AI provider: ${choice}`);
  }
}

export type { AIProvider } from "./types";
