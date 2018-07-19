


function encrypt_passwd(passwd) {
    var salt = bc.genSaltSync(10)
    return bc.hashSync(passwd, salt) 
}

function test_passwd(guess, hash) {
    return bc.compareSync(guess, hash)
}
