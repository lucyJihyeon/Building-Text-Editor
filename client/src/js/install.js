const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  //store the triggered events
  window.deferredPrompt = event;

  //remove the hidden class from the button to make it visible
  butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  //retrieve the stored 'beforeInstallprompt' event from window.deferredPrompt
  const promptEvent = window.deferredPrompt;

  //if promptEvent exists, call prompt() to trigger the installation prompt
  if (!promptEvent) {
    return;
  }
  promptEvent.prompt();

  //after the prompt is shown, reset window.deferredPrompt 
  window.deferredPrompt = null;
  //and hides the install button. 
  butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
    //when the app is successfully installed, reset window.deferredPrompt 
    window.deferredPrompt = null;
});
