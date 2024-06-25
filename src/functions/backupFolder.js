const path = require('path');
const fs = require('fs');

module.exports = class BackupFolderFunc {
    constructor(backup) {
        this.name = '$backupFolder';
        this.type = 'djs';
        this.backup = backup;
    }

    async execute(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        const [basePath] = data.inside.splits;
        if (!basePath) return d.aoiError.fnError(d, 'custom', {}, 'No Folder Provided In');
        
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath);
        }

        this.backup.setStorageFolder(path.join(process.cwd(), basePath));

        data.result = null;
        return {
            code: d.util.setCode(data),
        };
    }
}
