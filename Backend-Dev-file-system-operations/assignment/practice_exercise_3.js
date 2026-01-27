const fs=require('fs');
function logMessage(message){
    const timestamp=new Date().toISOString();
    const log=`[${timestamp}] ${message}\n`;
    fs.appendFileSync('log.txt', log, 'utf8');
}

logMessage("Server started");
logMessage("User logged in");
logMessage("Process finished");
