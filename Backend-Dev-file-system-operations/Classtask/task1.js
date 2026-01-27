const fs=require('fs');

const readStream=fs.createReadStream("input.txt", {
    encoding:"utf8",
    highWaterMark:64*1024,
})
const writeStream=fs.createWriteStream("output.txt");

readStream.pipe(writeStream);
writeStream.on('finish',()=>{
    console.log("File copy completed");
})


