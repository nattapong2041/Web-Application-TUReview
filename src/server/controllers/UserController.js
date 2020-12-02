// ./controllers/UserController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/UserModel');
const config = require("../config/jwtConfig");

exports.checkLogon = (req, res) => {
  const { email, password } = req.body;
  console.log("Check Logon ", email, password)
  if (!email || !password) {
    return res.status(404).json({ errors: { global: "Invalid credential" } });
  }

  User.findOne({ email: email }).exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ errors: "ข้อมูลรับรองไม่ถูกต้อง (อีเมลล์/รหัสผ่าน)" });
      }
      bcrypt.compare(password, user.password)
        .then(matched => {
          if (matched) {
            const token = jwt.sign({ email: user.email, _id: user._id },
              config.jwtSecret,
              { expiresIn: 3600 }); 
            
            return res.json({
              user: {
                id: user._id,
                firstName: user.firstName, 
                lastName: user.lastName,
                email: user.email,
                typeUser: user.typeUser
              },
              success: true,
              token: "Bearer " + token,
            });
          }
          else return res.status(404).json({ errors: "รหัสไม่ถูกต้อง" });
        })
        .catch(err => { console.log(err); return res.status(404).json({ errors: "ข้อมูลรับรองไม่ถูกต้อง" }) });
    })
    .catch((err) => {
      res.status(400).json({ errors: "ข้อมูลรับรองไม่ถูกต้อง" })
    });
}


/**
 * Register
 */
exports.register = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(422).send({ errors: "โปรดกรอกให้ครบทุกช่อง" });
  }
  if (!validator.isEmail(email)) {
    return res.status(422).json({ errors: 'อีเมลล์ไม่ถูกต้อง' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(422).send({ errors: "อีเมลล์นี้ถูกสมัครใช้งานแล้ว" });
    }
    const user = new User({ firstName, lastName, email, password, ...req.body });

    user.save((err) => {
      if (err) { return next(err); }
      res.json({ firstName, lastName, email });
    });
  });
};


/*
 * Get a single user 
 * Find a single User with a userId
*/
exports.get = (req, res) => {
  const id = req.params.userId;
  const usrFieldProjection = {
    __v: false,
    //_id: false,
    password: false
  };
  User.findById(id, usrFieldProjection)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          errors: "User not found with id " + req.params.userId
        });
      }
      res.json(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          errors: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        errors: "Error retrieving User with id " + req.params.userId
      });
    });
};

/* other methods: not implemented yet */
exports.list = (req, res) => { console.log("list"); res.send('NOT IMPLEMENTED: User list GET'); res.end(); }
exports.findByEmail = (req, res) => res.send('Authenticated But This function is NOT IMPLEMENTED: User findByEmail GET');
exports.put = (req, res) => res.send('NOT IMPLEMENTED: User put');
exports.delete = (req, res) => res.send('NOT IMPLEMENTED: User delete POST');

exports.validateToken = (req, res) => {
  const token = req.headers['authorization'].substring(7);
  try {
    var decode = jwt.verify(token, config.jwtSecret);
    res.json(decode);
  }
  catch (err) {
    res.status(401).json({ err });
  }
};
