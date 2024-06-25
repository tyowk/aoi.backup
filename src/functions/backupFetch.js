module.exports = class BackupFetchFunc {
    constructor(backup) {
        this.name = '$backupFetch';
        this.type = 'djs';
        this.backup = backup;
    }

    async execute(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        const [backupId, type] = data.inside.splits;
        if (!backupId) {
            return d.aoiError.fnError(d, 'custom', {}, 'No Backup ID Provided In');
        }
        if (!type) {
            return d.aoiError.fnError(d, 'custom', {}, 'No Backup Fetch Type Provided In');
        }

        try {
            const backupData = await this.backup.fetch(backupId);
            if (!backupData) {
                return d.aoiError.fnError(d, 'custom', {}, 'No Backup Found');
            }

            let result;
            switch (type) {
                case 'id':
                    result = backupData.id;
                    break;
                case 'size':
                    result = backupData.size;
                    break;
                case 'data':
                    result = backupData.data;
                    break;
                default:
                    return d.aoiError.fnError(d, 'custom', {}, 'Invalid Backup Fetch Type Provided In');
            }

            data.result = result;
            return {
                code: d.util.setCode(data),
            };
        } catch (error) {
            return d.aoiError.fnError(d, 'custom', {}, error.name);
        }
    }
}
