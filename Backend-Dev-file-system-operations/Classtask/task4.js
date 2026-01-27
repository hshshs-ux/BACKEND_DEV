const fs = require('fs').promises;
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node task4.js <sourceDir> <backupBaseDir>');
    process.exit(1);
}

const [sourceDir, backupBaseDir] = args;

async function logOperation(message) {
    const logPath = path.join(backupBaseDir, 'backup.log');
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: ${message}\n`;
    try {
        await fs.appendFile(logPath, logMessage);
    } catch (err) {
        console.error('Error writing to log:', err);
    }
}

async function ensureDirectory(dirPath) {
    try {
        await fs.access(dirPath);
    } catch {
        await fs.mkdir(dirPath, { recursive: true });
        await logOperation(`Created directory: ${dirPath}`);
    }
}

async function backupAndCleanup() {
    try {
        await ensureDirectory(backupBaseDir);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupDir = path.join(backupBaseDir, `backup-${timestamp}`);
        await fs.mkdir(backupDir, { recursive: true });
        await logOperation(`Created backup directory: ${backupDir}`);

        const files = await fs.readdir(sourceDir);
        const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

        for (const file of files) {
            const filePath = path.join(sourceDir, file);
            const stat = await fs.stat(filePath);
            if (stat.isFile()) {
                const backupPath = path.join(backupDir, file);
                await fs.copyFile(filePath, backupPath);
                await logOperation(`Backed up: ${filePath} to ${backupPath}`);

                if (stat.mtime.getTime() < sevenDaysAgo) {
                    await fs.unlink(filePath);
                    await logOperation(`Deleted old file: ${filePath}`);
                }
            }
        }

        console.log('Backup and cleanup completed.');
    } catch (err) {
        console.error('Error:', err);
        await logOperation(`Error: ${err.message}`);
    }
}

backupAndCleanup();
