/**
 * Logic for handling the mediaRecorder and upload to main process
 * should go in this file.
 */

const {ipcRenderer} = require('electron');

let recorder;
let recordedChunks = [];

/**
 * Event handlers
 */
document.getElementById('record-start').addEventListener('click', startRecorder);
document.getElementById('record-stop').addEventListener('click', stopRecorder);

ipcRenderer.on('download-reply', handleUploadReply);

/**
 * Recording logic
 */

/**
 * Called from mediaSelector.js
 * 
 * Initialise a MediaRecorder with the mediaStream
 * @param {C} stream 
 */
function initRecorder(stream) {
    var options = { mimeType: "video/webm; codecs=h264" };
    recorder = new MediaRecorder(stream, options)
    recorder.ondataavailable = handleDataAvailable;
    return stream
}

/**
 * Do something when there are chunks available to send.
 * Each chunk is one video
 * 
 * TODO handle removing chunks once a video has been uploaded.
 */
function handleDataAvailable(event) {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
      uploadToMain();
    } else {
      // do nothing? Not tested this scenario
      console.warn('No data in event, doing nothing')
    }
}

function uploadToMain() {
    const reader = new FileReader()
    reader.onload = () => {
        const b64 = reader.result.replace(/^data:.+;base64,/, '');
        ipcRenderer.send('download', {
            data: b64
        })
    }

    reader.readAsDataURL(recordedChunks[0]);
}

function startRecorder() {
    console.log('recording!')
    if (recorder) {
        recorder.start()

        // demo: to download after 3sec
        setTimeout(() => {
            console.log("stopping");
            recorder.stop();
        }, 3000);
    } else {
        console.warn('no recorder, doing nothing')
    }
}

function stopRecorder() {
    ipcRenderer.send('record', 'stop');
}

function handleUploadReply(event, arg) {
    if (arg != 'OK') {
        console.log('video saved successfully')
    } else {
        console.log('error saving video: ${arg}')
    }
}
