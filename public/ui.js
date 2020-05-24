/**
 * Logic for manipulating the UI based on events should go in this file.
 * 
 * Wrap this module so nothing bleeds into global scope
 */
(() => {
  const recordStatus = document.getElementById('status-recording');
  const recordButton = document.getElementById('record-start');
  const stopButton = document.getElementById('record-stop');

  /**
   * Event handlers
   */
  
  window.addEventListener('recorder-created', recorderCreated);
  recordButton.addEventListener('click', showRecordingState);
  stopButton.addEventListener('click', showNotRecordingState);


  function recorderCreated() {
    recorder.addEventListener('stop', showNotRecordingState)
  }

  function showNotRecordingState() {
    if (recordButton.hasAttribute('hidden')) {
      recordButton.removeAttribute('hidden')
    }

    stopButton.setAttribute('hidden', true);
    recordStatus.setAttribute('hidden', true);
  }

  function showRecordingState() {
    if (stopButton.hasAttribute('hidden')) {
      stopButton.removeAttribute('hidden');
    }

    if (recordStatus.hasAttribute('hidden')) {
      recordStatus.removeAttribute('hidden')
    }

    recordButton.setAttribute('hidden', true)
  }

})();