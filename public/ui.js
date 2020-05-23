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

  recordButton.addEventListener('click', () => {
    recordStatus.removeAttribute('hidden');
  });

  stopButton.addEventListener('click', () => {
    recordStatus.setAttribute('hidden', 'true');
  });

})();