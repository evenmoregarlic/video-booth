// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.


// Daf: Not sure if we need this file, it was just part of the example
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
