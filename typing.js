const linesLeft = [
  {
    plain: "$ Scanning mirmikov.tech for accessible paths...",
    html: `$ Scanning <a href="https://mirmikov.tech" target="_blank" style="color:#00ff00; text-decoration: underline;">mirmikov.tech</a> for accessible paths...<br><br>`,
  },
  {
    plain: "- /probably-nothing",
    html: `- <a href="https://mirmikov.tech/probablynothing" target="_blank" style="color:#00ff00; text-decoration: underline;">/probably-nothing</a>`,
  },
];

const linesRight = [
  {
    plain: "$ Searching for site source code...",
    html: `$ Searching for site source code...<br><br>`,
  },
  {
    plain: "Found! View on GitHub",
    html: `Found! <a href="https://github.com/mazeonst" target="_blank" style="color:#00ff00; text-decoration: underline;">View on GitHub</a>`,
  },
];

const typingSpeed = 30;
const linePause = 400;

function typeLines(containerId, lines) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  container.appendChild(cursor);

  let currentLineIndex = 0;
  let currentCharIndex = 0;
  let currentLineElem = null;

  function typeChar() {
    if (currentLineIndex >= lines.length) {
      cursor.style.visibility = "hidden";
      return;
    }

    if (currentCharIndex === 0) {
      currentLineElem = document.createElement("p");
      currentLineElem.className = "console-line";
      container.insertBefore(currentLineElem, cursor);
      positionCursor(currentLineElem);
    }

    const lineObj = lines[currentLineIndex];
    const txt = lineObj.plain;

    if (currentCharIndex < txt.length) {
      currentLineElem.textContent += txt[currentCharIndex];
      currentCharIndex++;
      positionCursor(currentLineElem);
      setTimeout(typeChar, typingSpeed);
    } else {
      currentLineElem.innerHTML = lineObj.html;
      positionCursor(currentLineElem);
      setTimeout(() => {
        currentLineIndex++;
        currentCharIndex = 0;
        typeChar();
      }, linePause);
    }
  }

  function positionCursor(lineEl) {
    cursor.style.visibility = "visible";
    const containerRect = container.getBoundingClientRect();
    const lineRect = lineEl.getBoundingClientRect();

    const top = lineRect.top - containerRect.top;
    const left = lineRect.left - containerRect.left + lineRect.width;

    cursor.style.top = top + "px";
    cursor.style.left = left + "px";
  }

  typeChar();
}

document.addEventListener("DOMContentLoaded", () => {
  typeLines("console-left", linesLeft);
  typeLines("console-right", linesRight);
});

