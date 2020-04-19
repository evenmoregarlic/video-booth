# Video booth

## How I am running this
Running this on the pi under /home/pi/workspace/video-1
ssh onto it from vscode and see it work using vnc.


## What are we doing
Electron app will send "record" to server, whch will do stuff. After it's done, send 'record finished' message back. OR we can use the `ipcRenderer.invoke` method which takes a callback. 


## Installation

Running on mac: `npm install --arch=x64`

Running on raspbian: `npm install --arch=armvl7` (or whatever the output of `uname -m` is)


### Whats going on

- pressing 'record' on the UI sends comms to the recorder to run `record.sh`. This command is not working when you run it through electron, but it works if you run `./record` from the CLI.
- used `arecord -L` to list hardware available on the pi and used the value in `plughw` instead of the values dad had in his bash script.

next steps:
- Whats the difference between running bash scripts via a node child process in electron vs from the CLI?
