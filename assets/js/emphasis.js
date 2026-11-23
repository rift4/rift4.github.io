/* Supports the inline emphasis hover effect in style.css:
   - wraps the plain text runs inside paragraphs that use <ink> in .filler
     spans, so the effect can blur them (bare text nodes can't be selected);
   - gives each <ink> a tabindex so keyboard focus reaches it and
     :focus-visible triggers the same treatment as mouse hover.
   Runs once, before first paint — the added spans have no styles of their
   own until an <ink> is hovered or focused, so nothing shifts or flashes. */
(function prepareInlineEmphasis() {
  const FILLER_CLASS = "filler";

  function wrapTextNodes(paragraph) {
    const textNodes = Array.from(paragraph.childNodes).filter(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
    );

    for (const node of textNodes) {
      const filler = document.createElement("span");
      filler.className = FILLER_CLASS;
      paragraph.insertBefore(filler, node);
      filler.append(node);
    }
  }

  for (const paragraph of document.querySelectorAll("p")) {
    if (paragraph.querySelector("ink")) {
      wrapTextNodes(paragraph);
    }
  }

  for (const ink of document.querySelectorAll("ink")) {
    ink.setAttribute("tabindex", "0");
  }
})();
