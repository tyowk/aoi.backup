module.exports = class BackupListFunc {
    constructor(backup) {
        this.name = '$backupList';
        this.type = 'djs';
        this.backup = backup;
    }

    async execute(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        const [ separator = ',' ] = data.inside.splits;
        const backupList = this.backup.list();

        data.result = backupList.join(separator);
        return {
            code: d.util.setCode(data),
        };
    }
}
