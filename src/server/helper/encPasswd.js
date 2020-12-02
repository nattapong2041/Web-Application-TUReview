const bcrypt = require("bcrypt");
const plainPassword = "something";
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plainPassword, salt, (err, hash) => {
        console.log(hash)
    })
})
