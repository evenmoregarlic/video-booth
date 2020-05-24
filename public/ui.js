/**
 * Logic for manipulating the UI based on events should go in this file.
 * 
 * Wrap this module so nothing bleeds into global scope
 */
(() => {
  const recordStatus = document.getElementById('status-recording');
  const recordButton = document.getElementById('record-start');
  const stopButton = document.getElementById('record-stop');

  window.addEventListener('recorder-created', recorderCreated)
  /**
   * Event handlers
   */

  recordButton.addEventListener('click', () => {
    recordStatus.removeAttribute('hidden');
    recordButton.setAttribute('disabled', true)
  });

  stopButton.addEventListener('click', () => {
    recordStatus.setAttribute('hidden', true);
    recordButton.removeAttribute('disabled')
  });


  function recorderCreated() {
    recorder.addEventListener('stop', recorderStopped)
  }

  function recorderStopped() {
    recordButton.removeAttribute('disabled')
    recordStatus.setAttribute('hidden', true);
  }

})();