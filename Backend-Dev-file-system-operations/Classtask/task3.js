const fs = require('fs');
const readline = require('readline');

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node task3.js <logFilePath> <outputFilePath>');
    process.exit(1);
}

const [logFilePath, outputFilePath] = args;

let totalLines = 0;
let errorCount = 0;
let warningCount = 0;
let infoCount = 0;

const readStream = fs.createReadStream(logFilePath, { encoding: 'utf8' });
const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    totalLines++;
    const lowerLine = line.toLowerCase();
    if (lowerLine.includes('error')) {
        errorCount++;
    }
    if (lowerLine.includes('warning')) {
        warningCount++;
    }
    if (lowerLine.includes('info')) {
        infoCount++;
    }
});

rl.on('close', () => {
    const summary = `Summary Report:\nTotal lines: ${totalLines}\nERROR: ${errorCount}\nWARNING: ${warningCount}\nINFO: ${infoCount}\n`;
    fs.writeFile(outputFilePath, summary, 'utf8', (err) => {
        if (err) {
            console.error('Error writing summary file:', err);
            process.exit(1);
        }
        console.log('Summary report generated successfully.');
    });
});

rl.on('error', (err) => {
    console.error('Error reading log file:', err);
    process.exit(1);
});
