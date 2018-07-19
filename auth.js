const express = require('express')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const db = require('./db')
// const bc = require('bcrypt')


// function encrypt_passwd(passwd) {
//     var salt = bc.genSaltSync(10)
//     return bc.hashSync(passwd, salt) 
// }

// function test_passwd(guess, hash) {
//     return bc.compareSync(guess, hash)
// }


passport.use(new Strategy({
        passReqToCallback: true,
    },
    function(req, username, password, cb) {
        console.log('Here I am!')
        db.users.findByUsername(username, function(err, user) {
            if (err) return cb(err)
            if (!user) return cb(null, false, { message: 'User not found' })
            db.users.testPassword(username, password, function(err, res) {
                console.log('...testing password...')
                if (err) return cb(err)
                if (res) {
                    console.log('success')
                    cb(null, user)
                }
                else {
                    console.log('failed')
                    cb(null, false, { message: 'Incorrect password' })
                }
            })
        })
    })
)

passport.serializeUser(function(user, cb) {
    cb(null, user.id)
})

passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function(err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
})

module.exports = passport