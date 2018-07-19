const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('test.db')
const { escape } = require('sqlstring-sqlite')
const _ = require('underscore')


function gizmo(sql, method) {
    if (process.env['DEBUG']) console.log(`GIZMO: method=${method}, sql=${sql}`)
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

function clausewitz(obj, updateSetFlag) {
    return _.keys(obj).map(k => {
        var v = obj[k]
        var value, op
        if (Array.isArray(v)) {
            [op, value] = v    
        }
        else {
            value = v
            op = updateSetFlag ? '=' : (v === null ? 'IS' : '=')
        }
        var opener = updateSetFlag ? '' : '('
        var closer = updateSetFlag ? '' : ')'
        return `${opener}${k} ${op} ${escape(value)}${closer}`
    })
}

function mahan(obj, updateSetFlag) {
    if (_.isEmpty(obj)) {
        if (updateSetFlag) throw new Error('Nothing to set')
        return '1 = 1'
    }
    return clausewitz(obj, updateSetFlag).join(updateSetFlag ? ' AND ' : ', ')
}

function addRecord(tableName, obj) {
    var keys = _.keys(obj)
    var vals = keys.map(k => escape(obj[k]))
    var sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${vals.join(', ')})`
    return gizmo(sql)
}

function delRecord(tableName, obj) {
    var sql = `DELETE FROM ${tableName} WHERE ${mahan(obj)}`
    return gizmo(sql)
}

function updRecord(tableName, setObj, whereObj) {
    var sql = `UPDATE ${tableName} SET ${mahan(setObj, true)} WHERE ${mahan(whereObj)}`
    return gizmo(sql)
}

function listRecords(tableName, whereObj) {
    var sql = `SELECT * FROM ${tableName} WHERE ${mahan(whereObj)}`
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