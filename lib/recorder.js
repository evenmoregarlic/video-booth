const EventEmitter = require('events');
const {spawn} = require('child_process');


class RecordEmitter extends EventEmitter {}

/**
 * Recorder
 * 
 * - Start recording:
 * emit start recording event on start
 * emit end recording on end
 */
class Recorder {

  constructor() {
    this.recordProcess = null;
    this.emitter = new RecordEmitter();
  }

  startRecording() {
    console.log('recording')
    this.emitter.emit('recording')
    const cmd = spawn('./record.sh', {
      shell: true
    })
    
    cmd.on('close', (code) => {
      console.log('closed with code ', code);
      this.emitter.emit('finished');
    });

    cmd.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

  }


  cancelRecording() {
    console.log('stop recording!')
  }

}




exports.RecorderInstance = new Recorder();
exports.RecordEmitter = RecordEmitter;

