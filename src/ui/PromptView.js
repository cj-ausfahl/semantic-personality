import { state } from "../engine/state.js";
import { currentPrompt, recordResponse, startAssessment } from "../engine/navigator.js";
import { analyze } from "../engine/analyzer.js";

export function render() {
  const app = document.getElementById("app");

  // INTRO SCREEN
  if (!state.started) {
    console.log("Rendering Prompt:", prompt)
    app.innerHTML = `
      <div style="max-width:700px;margin:60px auto;line-height:1.6;">
        <h1>Semantic Personality Assessment</h1>

        <p>
          This is a reflective assessment designed to explore how you
          respond to concepts, not how you evaluate yourself. The goal
          is to evaluate your psyche while avoiding self bias.
        </p>

        <p>
          You will be shown a series of single words, one at a time.
          For each, respond with the <strong>first word</strong> that
          comes to mind.
        </p>

        <p>
          There are no correct or incorrect answers.
          Do not overthink or revise your responses.
          Simply respond. Even if the reaction seems 
          unrelated or absurd. 
        </p>

        <p>
          The assessment will end automatically.
          You will not be shown progress indicators.
          Please begin when you are ready. 
        </p>

        <button id="begin"
          style="
            margin-top:30px;
            padding:12px 24px;
            font-size:1rem;
            cursor:pointer;
          ">
          Begin
        </button>
      </div>
    `;

  document.getElementById("begin").onclick = () => {
    state.started = true;
    startAssessment();
    render();
  };


    return;
  }

  // ASSESSMENT SCREEN
  const prompt = currentPrompt();
  if (!prompt) {
    app.innerHTML = `
      <div style="max-width:600px;margin:60px auto;text-align:center;">
        <h2>Assessment complete</h2>
        <p>You may now close this window.</p>
      </div>
    `;
    return;
  }

  if (!prompt) {
    const analysis = analyze(state.responses);
    console.log("ANALYSIS RESULT:", analysis);

    app.innerHTML = `
      <div style="max-width:600px;margin:60px auto;text-align:center;">
        <h2>Assessment complete</h2>
        <p>You may now close this window.</p>
      </div>
    `;
  }

  app.innerHTML = `
    <div style="max-width:600px;margin:60px auto;">
      <h1>${prompt.prompt}</h1>
      <input
        id="answer"
        autofocus
        autocomplete="off"
        style="width:100%;font-size:1.2rem;padding:8px;"
      />
    </div>
  `;

  const input = document.getElementById("answer");
  input.focus();

  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && input.value.trim()) {
      recordResponse(input.value.trim());
      render();
    }
  });
}
