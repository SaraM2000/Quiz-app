"use strict";

window.addEventListener("load", () => {
  registerSW();
});

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      let hi = await navigator.serviceWorker.register("/sw.js");
      console.log("success", hi);
    } catch (e) {
      console.log("failed");
    }
  }
}
