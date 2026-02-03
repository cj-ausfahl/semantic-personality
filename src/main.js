import { render } from "./ui/PromptView.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

render();
