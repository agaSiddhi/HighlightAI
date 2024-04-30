import { DELETED_CLASS, HIGHLIGHT_CLASS } from "./constants.js";
import { initializeHighlightEventListeners } from "../../hoverTools/index.js";

function highlightPaper(
  selString,
  container,
  color,
  textColor,
  highlightIndex
) {
  const highlightInfo = {
    color: color ? color : "yellow",
    textColor: textColor ? textColor : "inherit",
    highlightIndex: highlightIndex,
    selectionString: selString,
  };

  try {
    recursiveWrapper($(container), highlightInfo);
  } catch (e) {
    return false;
  }

  const parent = $(container).parent();
  parent.find(`.${HIGHLIGHT_CLASS}`).each((_i, el) => {
    initializeHighlightEventListeners(el);
  });

  return true; // No errors
}

function recursiveWrapper(container, highlightInfo) {
  const { selectionString } = highlightInfo;
  const selectionLength = selectionString.length;

  _recursiveWrapper(container, highlightInfo, false, 0, selectionLength);
}

function _recursiveWrapper(
  container,
  highlightInfo,
  startFound,
  charsHighlighted,
  selectionLength
) {
  const { color, textColor, highlightIndex, selectionString } = highlightInfo;

  container.contents().each((_index, element) => {
    if (charsHighlighted >= selectionLength) return;

    if (element.nodeType !== Node.TEXT_NODE) {
      const jqElement = $(element);
      if (
        jqElement.is(":visible") &&
        getComputedStyle(element).visibility !== "hidden"
      ) {
        _recursiveWrapper(
          jqElement,
          highlightInfo,
          startFound,
          charsHighlighted,
          selectionLength
        );
      }
      return;
    }

    let startIndex = 0;
    if (!startFound) {
      startFound = true;
      startIndex = selectionString.indexOf(element.nodeValue);
      if (startIndex === -1) return; // The text node doesn't contain the selection string
    }

    const { nodeValue, parentElement: parent } = element;

    let i = startIndex;
    for (; i < nodeValue.length; i++) {
      while (
        charsHighlighted < selectionLength &&
        selectionString[charsHighlighted].match(/\s/u)
      )
        charsHighlighted++;

      if (charsHighlighted >= selectionLength) break;

      const char = nodeValue[i];
      if (char === selectionString[charsHighlighted]) {
        charsHighlighted++;
      } else if (!char.match(/\s/u)) {
        throw new Error(
          `No match found for highlight string '${selectionString}'`
        );
      }
    }

    if (parent.classList.contains(HIGHLIGHT_CLASS)) return;

    const elementCharCount = i - startIndex;
    const insertBeforeElement = element.splitText(elementCharCount);
    const highlightText = element.nodeValue;

    if (highlightText.match(/^\s*$/u)) {
      parent.normalize();
      return;
    }

    const highlightNode = document.createElement("span");
    highlightNode.classList.add(
      color === "inherit" ? DELETED_CLASS : HIGHLIGHT_CLASS
    );
    highlightNode.style.backgroundColor = color;
    highlightNode.style.color = textColor;
    highlightNode.dataset.highlightId = highlightIndex;
    highlightNode.textContent = element.nodeValue;
    element.remove();
    parent.insertBefore(highlightNode, insertBeforeElement);
  });
}

export default highlightPaper;
