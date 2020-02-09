const EventEmitter = require('events');

class RecordEmitter extends EventEmitter {}

class Recorder {

  constructor() {
    this.recordProcess = null;
    this.emitter = new RecordEmitter();
  }

  startRecord() {}
  stopRecord() {}

}


module.exports = Recorder;