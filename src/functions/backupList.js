module.exports = class BackupList {
    constructor(backup) {
        this.name = '$backupList';
        this.type = 'djs';
        this.backup = backup;
    }

    execute(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        try {
            const separator = data.inside.splits[0] || ', ';
            const backupList = this.backup.list();
            data.result = backupList.join(separator);
            return { code: d.util.setCode(data) };
        } catch (err) {
            return d.aoiError.fnError(d, 'custom', {}, `${err.name}: ${err.message}`);
        }
    }
};
