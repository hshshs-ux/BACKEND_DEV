const os = require('os');

function getSystemInfo() {
    return {
        timestamp: new Date().toISOString(),
        cpuCount: os.cpus().length,
        platform: os.platform(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        memoryUsagePercent: Math.round(((os.totalmem() - os.freemem()) / os.totalmem()) * 100),
        uptime: Math.floor(os.uptime() / 60) + ' minutes'
    };
}

module.exports = { getSystemInfo };
