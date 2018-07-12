const Sqlize = require('sequelize')

const sqlize = new Sqlize('mainDB', null, null, {
    dialect: 'sqlite',
    storage: './sql.db',
})
