const fs = require('fs');
const path = require('path');
const backup = require('@outwalk/discord-backup');
const package = require('../package.json');

class AoiBackup {
    constructor(client, basePath = './backups') {
        (async () => {
            try {
                if (!fs.existsSync(basePath)) {
                    fs.mkdirSync(basePath);
                }
                backup.setStorageFolder(path.join(process.cwd(), basePath))
                const files = await fs.readdirSync(path.join(__dirname, 'functions'));
                for (const file of files) {
                    const FunctionClass = require(`./functions/${file}`);
                    const funcData = new FunctionClass(backup);
                    client.functionManager.createFunction({
                        name: funcData.name,
                        type: funcData.type,
                        code: funcData.execute.bind(funcData)
                    });
                }
                console.log(`\x1b[34m[${packageJson.name.toUpperCase()}]\x1b[0m :: Functions loaded successfully.`);
            } catch (err) {
                console.error(`\x1b[34m[${packageJson.name.toUpperCase()}]\x1b[0m :: \x1b[31mError loading functions:\x1b[0m`, err);
            }
            
            try {
                const res = await (await fetch(`https://registry.npmjs.org/${package.name}`, { headers: { "User-Agent": package.name }})).json();
                if (!res.versions[package.version]) return console.log(`\x1b[34m[${package.name.toUpperCase()}]\x1b[0m :: \x1b[33mThis is a dev version. Some stuff may be incomplete or unstable.\x1b[0m`);
                if (package.version !== res["dist-tags"].latest) return console.log(`\x1b[34m[${package.name.toUpperCase()}]\x1b[0m :: \x1b[31m${package.name} is outdated!\x1b[0m`);
            } catch (err) {
                console.log(`\x1b[34m[${package.name.toUpperCase()}]\x1b[0m :: \x1b[31mThere was an error fetching ${package.name} info on npm.\x1b[0m`);
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
