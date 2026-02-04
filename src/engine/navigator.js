import { state } from "./state.js";
import { phases } from "../data/phases.js";
import { shuffle } from "./shuffle.js";
import { extractSemanticHead } from "./extractSemanticHead.js";


function buildSequence() {
  const independent = phases.filter(p => p.type === "independent");
  const dependent = phases.filter(p => p.type === "dependent");

  const phaseOrder = [
    ...shuffle(independent),
    ...dependent
  ];

  const sequence = [];

  phaseOrder.forEach(phase => {
    phase.sections.forEach(section => {
      const prompts =
        section.order === "random"
          ? shuffle(section.prompts)
          : section.prompts;

      prompts.forEach(prompt => {
        sequence.push({
          phase: phase.id,
          section: section.id,
          prompt
        });
      });
    });
  });

  return sequence;
}

export function startAssessment() {
  state.sequence = buildSequence();
  state.cursor = 0;
}

export function currentPrompt() {
  return state.sequence[state.cursor] || null;
}

export function recordResponse(word) {
  const item = currentPrompt();
  if (!item) return;
    const semanticHead = extractSemanticHead(word);

    console.log("RAW → HEAD:", word, "→", semanticHead);
    state.responses.push({
      ...item,
      raw: word,
      response: semanticHead,
      timestamp: Date.now()
    });


  localStorage.setItem(
    "spa_responses",
    JSON.stringify(state.responses)
  );
  state.cursor++;
}
