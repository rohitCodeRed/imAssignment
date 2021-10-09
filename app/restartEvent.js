const EventEmitter = require('events');
const restartEvent = new EventEmitter();


restartEvent.on('restart',function(output){
    //console.log("output",process.pid);

    //restart ther node server....
    setTimeout(function () {
        process.on("exit", function () {

            require("child_process").spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached : true,
                stdio: "inherit"
            });
        });
        process.exit();
    }, 1000);
});

restartEvent.on('error',function(err){
    console.error('whoops! error occured during event....');
});


module.exports = restartEvent;