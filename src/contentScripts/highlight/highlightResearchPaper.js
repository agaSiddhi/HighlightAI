import highlight from "./highlight/index.js";

import { store } from "../utils/storageManager.js";

async function highlightResearchPaper(
  color,
  selection = window.getSelection()
) {
  const selectionString = selection.toString();
  if (!selectionString) return;

  let container = selection.getRangeAt(0).commonAncestorContainer;

  // Sometimes the element will only be text. Get the parent in that case
  // TODO: Is this really necessary?
  while (!container.innerHTML) {
    container = container.parentNode;
  }

  const data = JSON.stringify({
    text: selectionString,
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
    body: data,
  };

  //   // https://eotxowdgw4krqyw.m.pipedream.net
  //   // https://eof5igi322vnim1.m.pipedream.net

  fetch("https://eotxowdgw4krqyw.m.pipedream.net", options)
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const highlightText = data[i].text;
        console.log(highlightText);

        var regex = new RegExp(highlightText, "gi");
        var matches = container.innerHTML.match(regex);

        if (matches) {
          var highlightedHTML = container.innerHTML.replace(
            regex,
            '<span style="background-color: yellow; text-decoration: underline; cursor: pointer; color: black;">$&</span>'
          );
          container.innerHTML = highlightedHTML;
        }
        // const highlightIndex = await store(
        //   selection,
        //   container,
        //   location.hostname + location.pathname,
        //   location.href,
        //   color.color,
        //   color.textColor
        // );
        // highlight(
        //   highlightText,
        //   container,
        //   selection,
        //   color.color,
        //   color.textColor,
        //   highlightIndex
        // );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default highlightResearchPaper;

// import highlight from "./highlight/index.js";

// import { store } from "../utils/storageManager.js";

// async function highlightResearchPaper(color, highlightText) {
//   // const selectionString = selection.toString();
//   const selectionString = highlightText;
//   console.log(highlightText);
//   if (!selectionString) return;

//   let container = document.querySelector(".ltx_document") || document.body;

//   const selection = window.getSelection().selectAllChildren(container);
//   console.log(selection);

//   // Sometimes the element will only be text. Get the parent in that case
//   // TODO: Is this really necessary?
//   // while (!container.innerHTML) {
//   //   container = container.parentNode;
//   // }

//   const highlightIndex = await store(
//     selection,
//     container,
//     location.hostname + location.pathname,
//     location.href,
//     color.color,
//     color.textColor
//   );
//   highlight(
//     selectionString,
//     container,
//     selection,
//     color.color,
//     color.textColor,
//     highlightIndex
//   );
// }

// export default highlightResearchPaper;
