const Promise = require('bluebird')
const data = require('./data')
const bc = require('bcrypt')

Promise.prototype.store = function(varname) {
    this.then(val => { global[varname] = val })
}


function encrypt_passwd(passwd) {
    var salt = bc.genSaltSync(10)
    return bc.hashSync(passwd, salt) 
}

// function test_passwd(guess, hash) {
//     return bc.compareSync(guess, hash)
// }


var users = {
    addUser(winName, dispName, passwd, cb) {
        var hash = encrypt_passwd(passwd)
        data.addRecord('user', { winName, dispName, password: hash }).then(() => {
            cb(null, null)
        }).catch(err => {
            cb(err)
        })
    },
    setPassword(winName, new_passwd, cb) {
        var hash = encrypt_passwd(new_passwd)
        data.updRecord('user', { password: hash }, { winName }).then(() => {
            cb(null, null)
        }).catch(err => {
            cb(err)
        })
    },
    testPassword(winName, test_passwd, cb) {
        data.listRecords('user', { winName }).then(arr => {
            if (arr.length !== 1) {
                return cb('Could not find unique match')
            }
            var user = arr[0]
            cb(null, bc.compareSync(test_passwd, user.password))
        }).catch(err => {
            cb(err)
        })
    },
    findByUsername(name, cb) {
        data.listRecords('user', { winName: name }).then(arr => {
            if (arr.length !== 1) {
                return cb('Could not find unique match')
            }
            cb(null, arr[0])
        }).catch(err => {
            cb(err)
        })
    },
    findById(id, cb) {
        data.listRecords('user', { id: id }).then(arr => {
            if (arr.length !== 1) {
                return cb('Could not find unique match')
            }
            cb(null, arr[0])
        }).catch(err => {
            cb(err)
        })
    }
}

users = Promise.promisifyAll(users)

module.exports = {
    users
}