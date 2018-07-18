const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('test.db')
const { escape } = require('sqlstring-sqlite')
const _ = require('underscore')


function gizmo(sql, method) {
    if (process.env['DEBUG']) console.log(sql)
    method = method ? method : 'run'
    return new Promise((res, rej) => {
        db[method](sql, {}, (err, ...args) => {
            if (err) {
                rej(err)
            }
            else {
                res(...args)
            }
        })
    })
}

function clausewitz(obj, suppress) {
    return _.keys(obj).map(k => {
        var v = obj[k]
        var value, op
        if (Array.isArray(v)) {
            [op, value] = v    
        }
        else {
            value = v
            op = suppress ? '=' : (v === null ? 'IS' : '=')
        }
        return `(${k} ${op} ${escape(value)})`
    })
}

function addRecord(tableName, obj) {
    var keys = _.keys(obj)
    var vals = keys.map(k => escape(obj[k]))
    var sql = `INSERT INTO ${tableName} (${keys.join(', ')})
                VALUES (${vals.join(', ')})`
    return gizmo(sql)
}

function delRecord(tableName, obj) {
    var sql = `DELETE FROM ${tableName}
                WHERE ${clausewitz(obj).join(' AND ')}`
    return gizmo(sql)
}

function updRecord(tableName, setObj, whereObj) {
    if (_.isEmpty(setObj)) {
        throw new Error('Nothing to set')
    }
    var setStr = clausewitz(setObj, true).join(', ')
    var whereStr = clausewitz(whereObj).join(' AND ')
    whereStr = whereStr !== '' ? wherestr : '1 = 1'
    var sql = `UPDATE ${tableName} SET ${setStr} WHERE ${whereStr}`
    return gizmo(sql)
}

function listRecords(tableName, whereObj) {
    var whereStr = clausewitz(whereObj).join(' AND ')
    whereStr = whereStr !== '' ? whereStr : '1 = 1'
    var sql = `SELECT * FROM ${tableName}
                WHERE ${whereStr}`
    return gizmo(sql, 'all')
}

module.exports = {
    addRecord,
    delRecord,
    updRecord,
    listRecords,
}

/* Example:

var data = await listRecords('table', {
    alpha: ['>=', 1],
    beta: 'yes'
})
*/