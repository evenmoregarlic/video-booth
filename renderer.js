// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const {ipcRenderer } = require('electron');

// Grab elements, create settings, etc.
var video = document.getElementById('video');

const windowWidth = document.getElementById('video-container').offsetWidth;
const windowHeight = document.getElementById('video-container').offsetHeight;

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({
         video: {
             facingMode: 'user',
             width: {max: windowWidth}, 
        } 
    }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });

}


document.getElementById('record-start').onclick = function record() {
    ipcRenderer.send('record', 'start');
}

document.getElementById('record-stop').onclick = () => ipcRenderer.send('record', 'stop');

