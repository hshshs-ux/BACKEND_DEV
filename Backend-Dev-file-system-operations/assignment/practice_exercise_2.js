const fs = require('fs');

function logMessage(message) {
  const timeStamp = new Date().toISOString();
  const logEntry = `[${timeStamp}] ${message}\n`;

  fs.appendFileSync('app.log', logEntry, 'utf8');
}

logMessage("Application started");
logMessage("User logged in");
logMessage("Application finished");
