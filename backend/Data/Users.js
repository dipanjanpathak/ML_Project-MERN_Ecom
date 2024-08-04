const bcrypt = require('bcryptjs')

const Users = [
    {
        name: 'admin',
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123456',10,),isAdmin: true,
    },
    {
        name: 'Dipanjan',
        email: "dipanjan@gmail.com",
        password: bcrypt.hashSync('123456',10,),
    },
    {
        name: 'Bapan',
        email: "bapan@gmail.com",
        password: bcrypt.hashSync('123456',10,),
    },
]

module.exports = Users