const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process');
const fs = require('fs')
const raspividStream = require('raspivid-stream');
const WebSocket = require('ws');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('browser/index.html')
  

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });

  // streamVideo();

}

app.on('ready', createWindow)


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})


function recordVideo() {
  console.log("recording")


  const videoIn = spawn('raspivid', ['-o', '-', '-rot', '270', '-t', '0'], {
    stdio: ['ignore', 'pipe', 'inherit'],
    detached: true,
  })


  const convertToFile = spawn('ffmpeg', [
    '-use_wallclock_as_timestamps', '1',
    '-thread_queue_size',           '10240',
    '-f',                           'h264',
    '-r',                           '25',
    '-b',                           '6000000',
    '-vcodec',                      'copy',
    '-ar',                          '44100',
    '-ab',                          '256k',
    '-i',                           'pipe:0',
    'out.mp4'
  ],
  {
    detached: true,
    stdio: 'pipe',
  })

  videoIn.stdout.pipe(process.stdout)
  videoIn.stdout.pipe(convertToFile.stdin)

  console.log("started?")
}



function streamVideo() {
  wsServer = spawn('node', ['./server.js'], {
    detached: true,
  });

  wsServer.stdout.on('data', function(data) {
    console.log(`server: ${data}`); 
  });

  wsServer.stderr.on('data', function(data) {
    console.log(`server err: ${data}`); 
  });

  console.log('spawned server in child process');
}