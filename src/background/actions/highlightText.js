import getCurrentColor from "./getCurrentColor.js";
import { executeInCurrentTab } from "../utils.js";

async function highlightText() {
  function contentScriptHighlightText(currentColor) {
    if (typeof window.highlighterAPI?.highlight?.create === "function") {
      window.highlighterAPI.highlight.create(currentColor);
    }
  }

  const currentColor = await getCurrentColor();
  executeInCurrentTab({
    func: contentScriptHighlightText,
    args: [currentColor],
  });
}

export default highlightText;
