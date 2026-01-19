const fs =require('fs');
// const inputFile='input.txt';
// const outputFile='word_count.txt';
fs.readFile("nodejs_assignment/input.txt", "utf-8", (err, data) => {
    if (err) return;

    const words = data.trim().split(/\s+/);
    const count = words.length;

    fs.writeFile("nodejs_assignment/word_count.txt", `Word Count: ${count}`, () => {});
});
