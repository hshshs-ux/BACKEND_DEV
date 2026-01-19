const fs=require('fs');
const os=require('os');

function logSystemInfo(){
    const stats={
        platform:os.platform(),
        cpuCores:os.cpus().length,
        totalMemGB:(os.totalmem()/1024**3).toFixed(2),
        freeMemGB:(os.freemem()/1024**3).toFixed(2),
        uptimeHours:(os.uptime()/3600).toFixed(2),
        timestamp:new Date().toISOString()
    };
    const logEntry =JSON.stringify(stats) + '\n';
    fs.appendFile('system.log', logEntry, (err) =>{
        if(err) console.error('ERROR:', err);
        else console.log('Logged system info');
        } 









    
    );

    }

    setInterval(logSystemInfo, 4000);
    logSystemInfo();
