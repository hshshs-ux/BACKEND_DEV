const { getSystemInfo } = require('./systemInfo');
const { logSystemData } = require('./logger');

console.log('System Monitor started. Logging every 5 seconds...');
console.log('Logs saved to system-log.txt');
console.log('Press Ctrl+C to stop\n');

const monitorSystem = () => {
    const systemData = getSystemInfo();
    
    
    console.log('CPU:', systemData.cpuCount);
    console.log('Platform:', systemData.platform);
    console.log('Total Memory:', (systemData.totalMemory / 1024 / 1024 / 1024).toFixed(2), 'GB');
    console.log('Free Memory:', (systemData.freeMemory / 1024 / 1024 / 1024).toFixed(2), 'GB');
    console.log('Usage:', systemData.memoryUsagePercent, '%');
    console.log('Uptime:', systemData.uptime);
    console.log('─'.repeat(50));
    
    logSystemData(systemData);
};

setInterval(monitorSystem, 5000);

monitorSystem();
