const restartEvent =  require('./restartEvent');
const {spawn, execFile} = require("child_process");

module.exports = {
    windowOs,
    linuxOs
};


function windowOs(option){
    //TODO
    console.log(option.pid);

}

function linuxOs(option){
    let pid = option.pid.toString();
    const sysCall = execFile("ps",['-p',pid, '-o', '%cpu'], (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        let output = stdout.toString().replace('%CPU','').trim();
        if(parseFloat(output) > 70.0){
            restartEvent.emit('restart',output);
        }
        //console.log(output);
      });
}

