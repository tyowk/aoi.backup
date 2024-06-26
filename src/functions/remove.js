module.exports = class BackupRemove {
    constructor(backup) {
        this.name = '$backupRemove';
        this.type = 'djs';
        this.backup = backup;
    }

    run(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);
        try {
            const [ backupId ] = data.inside.splits;
            if (!backupId) throw new Error('No Backup ID Provided');
            this.backup.remove(backupId);
            data.result = null;
            return { code: d.util.setCode(data) };
        } catch (err) {
            return d.aoiError.fnError(d, 'custom', {}, `${err.name}: ${err.message}`);
        }
    }
}
