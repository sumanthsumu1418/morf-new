async function copyTextToClipboard(text) {
  if (typeof window !== "undefined") {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }
}
export default copyTextToClipboard;
