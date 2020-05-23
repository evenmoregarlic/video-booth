// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const {ipcRenderer} = require('electron');

// Grab elements, create settings, etc.
var video = document.getElementById('video');

let recorder;
let recordedChunks = [];

// const windowWidth = document.getElementById('video-container').offsetWidth;
// const windowHeight = document.getElementById('video-container').offsetHeight;

// Get access to the camera!
// if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     // Not adding `{ audio: true }` since we only want video now
//     navigator.mediaDevices.getUserMedia({
//          video: {
//              width: 800,
//         },
//         audio: true,
//     }).then(function(stream) {
//         //video.src = window.URL.createObjectURL(stream);
//         video.srcObject = stream;
//         video.play();


//         initRecorder(stream)
//     });

// }


document.getElementById('record-start').onclick = function record() {
    // ipcRenderer.send('record', 'start');
    startRecorder()
}

document.getElementById('record-stop').onclick = () => ipcRenderer.send('record', 'stop');

function initRecorder(stream) {
    var options = { mimeType: "video/webm; codecs=vp9" };
    recorder = new MediaRecorder(stream, options)
    recorder.ondataavailable = handleDataAvailable;
    return stream
}

function handleDataAvailable(event) {
    console.log("data-available");
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
      console.log(recordedChunks);
      download();
    } else {
      // ...
    }
}

function startRecorder() {
    console.log('recording!')
    if (recorder) {
        recorder.start()

        // demo: to download after 9sec
        setTimeout(() => {
            console.log("stopping");
            recorder.stop();
        }, 3000);
    } else {
        console.log('no recorder, doing nothing')
    }
}

ipcRenderer.on('download-reply', (event, arg) => {
    console.log(arg)
})

function download() {

    const reader = new FileReader()

    reader.onload = () => {
        const b64 = reader.result.replace(/^data:.+;base64,/, '');
        ipcRenderer.send('download', {
            data: b64
        })
    }

    reader.readAsDataURL(recordedChunks[0]);
  }