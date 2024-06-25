const fs = require('fs');
const path = require('path');
const backup = require('@outwalk/discord-backup');
const packageJson = require('../package.json');

class AoiBackup {
    constructor(client, basePath = './backups') {
        this.__loadFunctions(client, basePath);

        (async () => {
            try {
                const res = await (await fetch(`https://registry.npmjs.org/${packageJson.name}`, {
                    headers: {
                        "User-Agent": packageJson.name,
                    },
                })).json();

                if (!res.versions[packageJson.version]) {
                    console.log(`\x1b[34m[${packageJson.name.toUpperCase()}]\x1b[0m :: \x1b[33mThis is a dev version. Some stuff may be incomplete or unstable.\x1b[0m`);
                    return;
                }

                if (packageJson.version !== res["dist-tags"].latest) {
                    console.log(`\x1b[34m[${packageJson.name.toUpperCase()}]\x1b[0m :: \x1b[31m${packageJson.name} is outdated!\x1b[0m`);
                }
            } catch (e) {
                console.log(`\x1b[34m[${packageJson.name.toUpperCase()}]\x1b[0m :: \x1b[31mThere was an error fetching ${packageJson.name} info on npm.\x1b[0m`);
            }
        })();
    }

    async __loadFunctions(client, basePath = './backups') {
        try {
            if (!fs.existsSync(basePath)) {
                fs.mkdirSync(basePath);
            }
            backup.setStorageFolder(path.join(process.cwd(), basePath))
            const files = await fs.readdirSync(path.join(__dirname, 'functions'));
            for (const file of files) {
                if (file.endsWith('.js')) {
                    const FunctionClass = require(`./functions/${file}`);
                    const funcData = new FunctionClass(backup);
                    client.functionManager.createFunction({
                        name: funcData.name,
                        type: funcData.type,
                        code: funcData.execute.bind(funcData)
                    });
                }
            }
            console.log(`\x1b[34m[${packageJson.name.toUpperCase()}]\x1b[0m :: Functions loaded successfully.`);
        } catch (err) {
            console.error(`\x1b[34m[${packageJson.name.toUpperCase()}]\x1b[0m :: \x1b[31mError loading functions:\x1b[0m`, err);
        }
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
