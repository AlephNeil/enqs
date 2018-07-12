# enqs

Let's define some milestones.

1. Reach a point where can interactively
    do all the CRUD operations.
2. Develop a 'user accounts' solution:
     - implement CRUD operations for listing, adding, modifying, deleting users
     - implement an authentication system with user-resettable passwords (allow them to be blank)
3. Organize the databases and test data:
     - Want a live db and a test db.
     - Want a script that will create a db skeleton from nothing
         and optionally populate it with test users and test data
         [NOTE: such scripts should be written in sql, not js]
4. Design the user interface
     - HTML+CSS
     - Connect to backend

Each of these steps will take time. Let's create some estimates:

Step (1). Want to have it ready by tomorrow morning, I think.

Step (2). Ready by close of play Friday.

Step (3). Do over the weekend, have ready for Monday.

Step (4). Allow Monday-Tuesday.

#### Notes

1. The interaction between the config.json file and sequelize-cli is less than fully explicit:
    - If the NODE_ENV variable is set to value x then we look up the value associated to key x in the config.json dictionary.
    - If NODE_ENV variable is not set then we look up value associated to key 'development'.
    - If there is no key 'development' then we use the entire config.json dictionary as our configuration.

2. Sequelize likes to pluralize table names.

3. When sequelize adds an .associate method to each model, it's something that will be called automatically by the generated
    code.
