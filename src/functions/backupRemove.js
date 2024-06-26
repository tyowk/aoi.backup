module.exports = class BackupRemoveFunc {
    constructor(backup) {
        this.name = '$backupRemove';
        this.type = 'djs';
        this.backup = backup;
    }

    async execute(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);
        
        try {
            const [ backupId ] = data.inside.splits;
            if (!backupId) return throw new Error('No Backup ID Provided In');

            await this.backup.remove(backupId);
            data.result = null;
            return {
                code: d.util.setCode(data),
            };
        } catch (err) {
            return d.aoiError.fnError(d, 'custom', {}, `${err.name}: ${err.message}`);
        }
    }
}
