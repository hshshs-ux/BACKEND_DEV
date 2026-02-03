const fs = require("fs");
const readline = require("readline");

const inputFile = "systemInfo.log";
const outputFile = "report.txt";

let totalLines = 0;
let errorCount = 0;
let warningCount = 0;
let infoCount = 0;

const readStream = fs.createReadStream(inputFile, "utf8");

const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

rl.on("line", (line) => {
    totalLines++;

    if (line.includes("ERROR")) errorCount++;
    else if (line.includes("WARNING")) warningCount++;
    else if (line.includes("INFO")) infoCount++;
});

rl.on("close", () => {
    const summary =
        "Log File Summary\n" +
        "----------------\n" +
        "Total Lines : " + totalLines + "\n" +
        "ERROR       : " + errorCount + "\n" +
        "WARNING     : " + warningCount + "\n" +
        "INFO        : " + infoCount + "\n";

    fs.writeFileSync(outputFile, summary);
    console.log("Report generated");
});
