const fs = require('fs');
const path = require('path');
const backup = require('@outwalk/discord-backup');
const packageJson = require('../package.json');

exports.AoiBackup = class AoiBackup {
    constructor(client, basePath = './backups') {
        try {
            if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);
            backup.setStorageFolder(path.join(process.cwd(), basePath));

            const files = fs.readdirSync(path.join(__dirname, 'functions'));
            for (const file of files) {
                const FuncClass = require(`./functions/${file}`);
                const funcData = new FuncClass(backup);
                client.functionManager.createFunction({
                    name: funcData.name,
                    type: funcData.type,
                    code: funcData.run.bind(funcData)
                });
            }

            console.log('\x1b[1m[\x1b[96mAoi.backup\x1b[0m\x1b[1m] :: \x1b[92mFunctions loaded successfully!\x1b[0m');
        } catch (err) {
            console.error('\x1b[1m[\x1b[96mAoi.backup\x1b[0m\x1b[1m] :: \x1b[91mAn error occurred:\x1b[0m', err);
        }

        fetch(`https://registry.npmjs.org/${packageJson.name}`, { headers: { "User-Agent": packageJson.name } })
            .then(res => res.json())
            .then(data => {
                if (!data.versions[packageJson.version]) return console.warn('\x1b[1m[\x1b[96mAoi.backup\x1b[0m\x1b[1m] :: \x1b[93mThis is a dev version. Some stuff may be incomplete or unstable\x1b[0m');
                if (packageJson.version !== data["dist-tags"].latest) return console.warn('\x1b[1m[\x1b[96mAoi.backup\x1b[0m\x1b[1m] :: \x1b[93mAoi.backup is outdated. Update to the latest version!\x1b[0m');
            })
            .catch(err => {
                console.error('\x1b[1m[\x1b[96mAoi.backup\x1b[0m\x1b[1m] :: \x1b[91mAn error occurred:\x1b[0m', err);
            });
    }
}
