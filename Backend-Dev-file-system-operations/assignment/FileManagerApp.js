const fs = require("fs");
const path = require("path");

const cmd = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (cmd) {

    case "read":
        fs.readFile(arg1, "utf8", (err, data) => {
            if (err) {
                console.log("Error reading file");
            } else {
                console.log(data);
            }
        });
        break;

    case "write":
        fs.writeFile(arg1, arg2, (err) => {
            if (err) {
                console.log("Error writing file");
            } else {
                console.log("File written successfully");
            }
        });
        break;

    case "copy":
        fs.copyFile(arg1, arg2, (err) => {
            if (err) {
                console.log("Error copying file");
            } else {
                console.log("File copied successfully");
            }
        });
        break;

    case "delete":
        fs.unlink(arg1, (err) => {
            if (err) {
                console.log("Error deleting file");
            } else {
                console.log("File deleted");
            }
        });
        break;

    case "list":
        fs.readdir(arg1, (err, files) => {
            if (err) {
                console.log("Error reading directory");
            } else {
                files.forEach(file => console.log(file));
            }
        });
        break;

    default:
        console.log("Invalid command");
}
