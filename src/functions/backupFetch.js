module.exports = class BackupFetchFunc {
    constructor(backup) {
        this.name = '$backupFetch';
        this.type = 'djs';
        this.backup = backup;
    }

    async execute(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);
        try {
            const [backupId, type] = data.inside.splits;
            if (!backupId) {
                return d.aoiError.fnError(d, 'custom', {}, 'No Backup ID Provided In');
            }
            
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
                    result = await backupData.data;
                    break;
                default:
                    result = await backupData;
            }

            data.result = result;
            return {
                code: d.util.setCode(data),
            };
        } catch (err) {
            return d.aoiError.fnError(d, 'custom', {}, `${err.name}: ${err.message}`);
        }
    }
}
