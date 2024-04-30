import getCurrentColor from "./getCurrentColor.js";
import { executeInCurrentTab } from "../utils.js";

async function highlightText() {
  function contentScriptHighlightText(currentColor) {
    if (
      typeof window.highlighterAPI?.highlight?.highlightResearchPaper ===
      "function"
    ) {
      window.highlighterAPI.highlight.highlightResearchPaper(currentColor);
    }
  }

  console.log("In Here");
  const currentColor = await getCurrentColor();
  executeInCurrentTab({
    func: contentScriptHighlightText,
    args: [currentColor],
  });
}

export default highlightText;

// import { executeInTab } from "../utils.js";
// import getCurrentColor from "./getCurrentColor.js";

// async function highlightResearchPaper(tabId, url) {
//   const currentColor = await getCurrentColor();

//   function contentScriptLoadPageHighlights(currentColor) {
//     if (
//       typeof window.highlighterAPI?.highlight?.highlightResearchPaper ===
//       "function"
//     ) {
//       window.highlighterAPI.highlight.highlightResearchPaper(currentColor);
//     }
//   }

//   const data = JSON.stringify({
//     url,
//   });

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Content-Length": data.length,
//     },
//     body: data,
//   };

//   // https://eotxowdgw4krqyw.m.pipedream.net
//   // https://eof5igi322vnim1.m.pipedream.net

//   fetch("https://eotxowdgw4krqyw.m.pipedream.net", options)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       for (let i = 0; i < data.length; i++) {
//         const highlight = data[i].text;
//         console.log(highlight);
//         executeInTab(tabId, {
//           func: contentScriptLoadPageHighlights,
//           args: [currentColor, highlight],
//         });
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });

//   console.log(url);
// }

// export default highlightResearchPaper;
