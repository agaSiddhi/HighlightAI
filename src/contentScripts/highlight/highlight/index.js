import highlightV4 from "./highlightV4.js";

function highlight(
  selectionString,
  container,
  selection,
  color,
  textColor,
  highlightIndex,
  version = null
) {
  return highlightV4(
    selectionString,
    container,
    selection,
    color,
    textColor,
    highlightIndex
  );
}

export * from "./constants.js";
export default highlight;
