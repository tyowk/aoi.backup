const fs = require('fs');
const path = require('path');
const backup = require('@outwalk/discord-backup');
const packageJson = require('../package.json');

class AoiBackup {
    constructor(client, basePath = './backups') {
        (async () => {
            try {
                if (!fs.existsSync(basePath)) {
                    fs.mkdirSync(basePath);
                }
                backup.setStorageFolder(path.join(process.cwd(), basePath));
                const files = await fs.promises.readdir(path.join(__dirname, 'functions'));
                for (const file of files) {
                    const FunctionClass = require(`./functions/${file}`);
                    const funcData = new FunctionClass(backup);
                    client.functionManager.createFunction({
                        name: funcData.name,
                        type: funcData.type,
                        code: funcData.execute.bind(funcData)
                    });
                }
                console.log('\x1b[1m[\x1b[96mAoi.backup\x1b[0m\x1b[1m] :: \x1b[92mFunctions loaded successfully!\x1b[0m');
            } catch (err) {
                console.log('\x1b[1m[\x1b[96mAoi.backup\x1b[0m\x1b[1m] :: \x1b[91mAn error occurred: \x1b[0m', err);
            }

            try {
                const res = await fetch(`https://registry.npmjs.org/${packageJson.name}`, { headers: { "User-Agent": packageJson.name } }).then(res => res.json());
                if (!res.versions[packageJson.version]) {
                    console.log('\x1b[1m[\x1b[96mAoi.backup\x1b[0m\x1b[1m] :: \x1b[93mThis is a dev version. Some stuff may be incomplete or unstable\x1b[0m');
                    return;
                }
                if (packageJson.version !== res["dist-tags"].latest) {
                    console.log('\x1b[1m[\x1b[96mAoi.backup\x1b[0m\x1b[1m] :: \x1b[93mAoi.backup is outdated. Update to latest version!\x1b[0m');
                }
            } catch (err) {
                console.log('\x1b[1m[\x1b[96mAoi.backup\x1b[0m\x1b[1m] :: \x1b[91mAn error occurred: \x1b[0m', err);
            }
        })();
    }
}

module.exports = {
    AoiBackup,
    Backup: {
        Create: backup.create,
        Load: backup.load,
        Fetch: backup.fetch,
        Remove: backup.remove,
        List: backup.list,
        Folder: backup.setStorageFolder
    }
};
