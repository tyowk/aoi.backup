module.exports = class BackupRemoveFunc {
    constructor(backup) {
        this.name = '$backupRemove';
        this.type = 'djs';
        this.backup = backup;
    }

    async execute(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        const [ backupId ] = data.inside.splits;
        if (!backupId) return d.aoiError.fnError(d, 'custom', {}, 'No Backup ID Provided In');

        try {
            this.backup.remove(backupId);
        } catch (err) {
            return d.aoiError.fnError(d, 'custom', {}, err.name);
        }

        data.result = null;
        return {
            code: d.util.setCode(data),
        };
    }
}
