const Sqlize = require('sequelize')
// const sequelize = new Sequelizer('sql.db', '', '', {
//     host: 'localhost',
//     dialect: 'sqlite',
//     operatorsAliases: false,

//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000,
//     },

//     storage: 'sql.db',
// })

async function main() {
    const sqlize = new Sqlize('mainDB', null, null, {
        dialect: 'sqlite',
        storage: './sql.db',
    })

    try {
        sqlize.authenticate()

        const User = sqlize.define('user', {
            username: Sqlize.STRING,
            birthday: Sqlize.DATE,
        })

        await sqlize.sync()
        var jane = await User.create({
            username: 'janedoe',
            birthday: new Date(1980, 6, 20),
        })
        console.log(jane.toJSON())
    }
    catch (err) {
        console.log(`Unable to connect: ${err}`)
    }
}


if (require.main === module) {
    main()
}

// Let's define some milestones.

// (1) Reach a point where can interactively
//     do all the CRUD operations.
// (2) Develop a 'user accounts' solution:
//      i) implement CRUD operations for listing, adding, modifying, deleting users
//      ii) implement an authentication system with user-resettable passwords (allow them to be blank)
// (3) Organize the databases and test data:
//      i) Want a live db and a test db.
//      ii) Want a script that will create a db skeleton from nothing
//          and optionally populate it with test users and test data
// (4) Design the user interface
//      i) HTML+CSS
//      ii) Connect to backend

// Each of these steps will take time. Let's create some estimates:
// Step (1). Want to have it ready by tomorrow morning, I think.
// Step (2). Ready by close of play Friday.
// Step (3). Do over the weekend, have ready for Monday.
// Step (4). Allow Monday-Tuesday.