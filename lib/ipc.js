const {ipcMain} = require('electron');

const {RecordEmitter, RecorderInstance} = require('./recorder');


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('record', (event, arg) => {
  switch(arg) {
    case 'start':
      console.log('start recording');
      RecorderInstance.startRecording()
      break;
    case 'stop':
      console.log('stop recording');
      break;
    default:
      break;
    }
})


console.log(typeof RecordEmitter)
console.log(typeof RecorderInstance)
const recordListener = new RecordEmitter();

recordListener.on('recording', () => {
  ipcMain.send('record', 'recording');
});

recordListener.on('finished', () => {
  ipcMain.send('record', 'finished');
});
