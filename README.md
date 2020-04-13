# Video booth

## How I am running this
Running this on the pi under /home/pi/workspace/video-1
ssh onto it from vscode and see it work using vnc.


## What are we doing
Electron app will send "record" to server, whch will do stuff. After it's done, send 'record finished' message back. OR we can use the `ipcRenderer.invoke` method which takes a callback. 