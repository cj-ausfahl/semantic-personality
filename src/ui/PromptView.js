import { currentPrompt, recordResponse } from "../engine/navigator.js";

export function render() {
  const app = document.getElementById("app");
  const prompt = currentPrompt();

  if (!prompt) {
    app.innerHTML = `
      <div style="max-width:600px;margin:40px auto;text-align:center;">
        <h2>Assessment complete</h2>
      </div>
    `;
    return;
  }

  app.innerHTML = `
    <div style="max-width:600px;margin:40px auto;">
      <h1>${prompt}</h1>
      <input id="answer" autofocus autocomplete="off"
        style="width:100%;font-size:1.2rem;padding:8px;" />
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
