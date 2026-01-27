const fs = require('fs').promises;
const path = require('path');
const args = process.argv.slice(2);
const command = args[0];

const commands = {
    write: async () => {
        if (args.length < 3) throw new Error('Please provide a file path and content to write.');
        const content = args.slice(2).join(' ');
        await fs.writeFile(args[1], content, 'utf8');
        console.log(`Successfully wrote to ${args[1]}`);
    },
    append: async () => {
        if (args.length < 3) throw new Error('Please provide a file path and content to append.');
        const content = args.slice(2).join(' ');
        await fs.appendFile(args[1], content, 'utf8');
        console.log(`Successfully appended to ${args[1]}`);
    },
    copy: async () => {
        if (args.length < 3) throw new Error('Please provide source and destination paths.');
        await fs.copyFile(args[1], args[2]);
        console.log(`Successfully copied ${args[1]} to ${args[2]}`);
    },
    delete: async () => {
        if (args.length < 2) throw new Error('Please provide a file path to delete.');
        await fs.unlink(args[1]);
        console.log(`Successfully deleted ${args[1]}`);
    },
    list: async () => {
        const dir = args[1] || '.';
        const files = await fs.readdir(dir);
        console.log(`Files in ${path.resolve(dir)}:`);
        files.forEach(file => console.log(file));
    }
};

if (!command || !commands[command]) {
    console.log('Usage: node fileManager.js <command> [arguments]');
    console.log('Commands: read <filePath>, write <filePath> <content>, append <filePath> <content>, copy <sourcePath> <destinationPath>, delete <filePath>, list [directoryPath]');
    process.exit(1);
}

(async () => {
    try {
        await commands[command]();
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Error: File or directory not found.');
        } else if (error.code === 'EACCES') {
            console.error('Error: Permission denied.');
        } else {
            console.error(`Error: ${error.message}`);
        }
        process.exit(1);
    }
})();


// shorter version(CHATGPT):
// const fs = require('fs').promises;
// const path = require('path');

// const [,, cmd, ...args] = process.argv;

// const run = async () => {
//   try {
//     switch (cmd) {
//       case 'read':
//         console.log(await fs.readFile(args[0], 'utf8'));
//         break;

//       case 'write':
//         await fs.writeFile(args[0], args.slice(1).join(' '));
//         break;

//       case 'append':
//         await fs.appendFile(args[0], '\n' + args.slice(1).join(' '));
//         break;

//       case 'copy':
//         await fs.copyFile(args[0], args[1]);
//         break;

//       case 'delete':
//         await fs.unlink(args[0]);
//         break;

//       case 'list':
//         (await fs.readdir(args[0] || '.')).forEach(f => console.log(f));
//         break;

//       default:
//         console.log(`Usage:
// node fileManager.js read <file>
// node fileManager.js write <file> <content>
// node fileManager.js append <file> <content>
// node fileManager.js copy <src> <dest>
// node fileManager.js delete <file>
// node fileManager.js list [dir]`);
//     }
//   } catch (e) {
//     console.error(e.code === 'ENOENT' ? 'File not found' : e.message);
//   }
// };

// run();
