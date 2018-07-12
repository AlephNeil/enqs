const Sqlize = require('sequelize')

sequelize.query("SELECT * FROM `users`", { type: sequelize.QueryTypes.SELECT})
  .then(users => {
    // We don't need spread here, since only the results will be returned for select queries
  })

class Governor {
    constructor(dbname, dbpath) {
        this.sqlize = new Sqlize(dbname, null, null, {
            dialect: 'sqlite',
            storage: dbpath,
        })
    }

    async tableExists(tableName) {
        var sql = `SELECT name FROM sqlite_master WHERE type='table' AND name=${tableName}`
        var tables = await this.sqlize.query(sql, { type: this.sqlize.QueryTypes.SELECT })
        return tables.length > 0
    }

    async redoTable(tableName, attrs, opts) {
        await this.sqlize.query(`DROP TABLE IF EXISTS ${tableName}`)
        if (await this.tableExists(tableName)) {
            await this.sqlize.query('DROP ')
        }
    }

    async init() {
        var nonblankString = {type: Sqlize.STRING, allowNull: false}
        if (await this.tableExists('enquiry'))
        this.sqlize.define('enquiry', {
            name: nonblankString,
            phone: Sqlize.STRING,
            whoFor: nonblankString,
            details: nonblankString,
            remarks: Sqlize.STRING,
        })
    }
}
