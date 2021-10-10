const restartEvent =  require('./restartEvent');
const {spawn, execFile} = require("child_process");
const _os = require("os");

module.exports = {
    windowOs,
    linuxOs
};


function windowOs(option){
    var stats1 = _getCPUInfo();
	let prevProcess = process.cpuUsage();
    let timerId = setInterval(_calculateCpuUsage, 1000,{"stat1":stats1,"prevProcess":prevProcess});

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


function _getCPUInfo(){ 
    var cpus = _os.cpus();
	
    var user = 0;
    var nice = 0;
    var sys = 0;
    var idle = 0;
    var irq = 0;
    var total = 0;
	
    for(var cpu in cpus){
        if (!cpus.hasOwnProperty(cpu)) continue;	
        user += cpus[cpu].times.user;
        nice += cpus[cpu].times.nice;
        sys += cpus[cpu].times.sys;
        irq += cpus[cpu].times.irq;
        idle += cpus[cpu].times.idle;
    }
	
    var total = user  + sys +nice + idle + irq;
	
    return {
        'total': total
    };
}

function _calculateCpuUsage(options){
        let stats2 = _getCPUInfo();
        let endTotal = stats2.total;

        let currProcess = process.cpuUsage(options.prevProcess);
        options.prevProcess = currProcess;

        let procesCpuUsage = (currProcess.user + currProcess.system); //millisec

        let total 	= endTotal - options.stat1.total;
        options.stat1 = stats2;
        let perc = (procesCpuUsage / (total * 10));

        console.log("pecentage: ",perc);

        if(perc > 70.00){
            restartEvent.emit('restart',perc);
        }


}
