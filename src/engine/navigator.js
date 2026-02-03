import { state } from "./state.js";
import { phase1 } from "../data/prompts_phase1.js";

export function currentPrompt() {
  if (state.phase === 1) {
    return phase1[state.index] || null;
  }
  return null;
}

export function recordResponse(word) {
  state.responses.push({
    prompt: currentPrompt(),
    response: word
  });
  state.index++;
}
