const fs = require('fs');
const path = require('path');

function logSystemData(data) {
    const logPath = path.join(__dirname, 'system-log.txt');
    const logEntry = `[${data.timestamp}] CPU: ${data.cpuCount} | Platform: ${data.platform} | Total Mem: ${(data.totalMemory / 1024 / 1024 / 1024).toFixed(2)}GB | Free Mem: ${(data.freeMemory / 1024 / 1024 / 1024).toFixed(2)}GB | Usage: ${data.memoryUsagePercent}%\n`;
    
    fs.appendFile(logPath, logEntry, 'utf8', (err) => {
        if (err) {
            console.error('Logging error:', err.message);
        }
    });
}

module.exports = { logSystemData };
