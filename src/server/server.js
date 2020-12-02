const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var morgan = require('morgan');
let jwt = require('jsonwebtoken');
let jwtConfig = require('./config/jwtConfig');
let auth = require('./helper/Bearer-passport')();
let controller = require('./controllers/UserController');

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(auth.initialize());
app.use(auth.session());

var mongoose = require("mongoose");
const config = require('./config/database');
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', () => { console.log('Database error'); });

//////////////////////////////////////////////////
////////////////SCHEMA&MODEL//////////////////////
//////////////////////////////////////////////////
var users = require('./routes/UserRouter');
var resSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  category: String,
  carPark: Boolean,
  Wi_Fi: Boolean,
  CreditCard: Boolean,
  timeOpen: String,
  timeClose: String,
  day: String,
  price: String,
  location: String,
  other: String,
  recommend: Boolean,
  score: String,
});
var resModel = mongoose.model('restaurant', resSchema, 'restaurant');
/*COMMENT*/
var comSchema = mongoose.Schema({
  restaurant: String,
  title: String,
  user: String,
  image: String,
  date: String,
  score: Number,
  discription: String,
});
var comModel = mongoose.model('comment', comSchema, 'comment');

/*USER*/
var userSchema = mongoose.Schema({

  firstName: String,
  lastName: String,
  email: String,
  password: String,
  typeUser: String,

});
var userModel = mongoose.model('User', userSchema, 'user');

app.use('/api/user', users);

//////////////////////////////////////////////////
//////////////GET&PUT&POST&DELETE/////////////////
//////////////////////////////////////////////////
/*GET*/
app.get('/restaurantData', (req, res) => {
  resModel.find((err, data) => {
    if (err) console.log(err);
    res.json(data);
  })
});

app.get('/commentData', (req, res) => {
  comModel.find((err, data) => {
    if (err) console.log(err);
    res.json(data);
  })
});

///////////////REQ RESTAURANT FROM NAME///////////////
app.post('/resFromName', (req, res) => {
  resModel.find({ title: req.body.title })
    .then(data => {
      res.json(data);
    })
});

///////////////CAL OVERALL SCORE/////////////////////
// app.put('/updateScoreRes', (req, res)=>{
//   var overAll=0;
//   var number=0;
//   comModel.find({ restaurant: req.body.title})
//   .then(data =>{
//       data.forEach(a => {
//         overAll += a.score;
//         number++;
//       });
//       return overAll/number;
//   })  
//   .then(a =>{
//     console.log(""+a);
//     resModel.findOneAndUpdate({title: req.body.title}, { score:(""+a),},)});
// });

app.get('/userData', (req, res) => {
  userModel.find((err, data) => {
    if (err) console.log(err);
    res.json(data);
  })
});
/*POST*/
app.post('/addRes', (req, res) => {
  var data = new resModel(req.body);
  data.save()
    .then(item => {
      res.send("เพิ่มร้านค้าเสร็จสิ้น");
    })
    .catch(err => {
      res.status(400).send("ไม่สามารถเพิ่มร้านค้าได้");
    });
});

app.post('/addComment', (req, res) => {
  var data = new comModel(req.body);
  console.log(req.body)
  data.save()
    .then(item => {
      res.send("เพิ่มcommentเสร็จสิ้น");
    })
    .catch(err => {
      res.status(400).send("ไม่สามารถเพิ่มcommentได้");
    });
});

app.post('/addUser', (req, res) => {
  var data = new userModel(req.body);
  data.save()
    .then(item => {
      res.send("เพิ่มบัญชีผู้ใช้เสร็จสิ้น");
    })
    .catch(err => {
      res.status(400).send("ไม่สามารถเพิ่มบัญชีผู้ใช้ได้");
    });
});

/*PUT*/
app.put('/updateRes', (req, res) => {
  console.log(req.body.title);
  resModel.findOneAndUpdate({ title: req.body.title }, {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    carPark: req.body.carPark,
    Wi_Fi: req.body.Wi_Fi,
    CreditCard: req.body.CreditCard,
    timeOpen: req.body.timeOpen,
    timeClose: req.body.timeClose,
    day: req.body.day,
    price: req.body.price,
    location: req.body.location,
    other: req.body.other,
    recommend: req.body.recommend,
    score: req.body.score,
  })
    .then(item => {
      res.send("อัพเดตร้านค้าเสร็จสิ้น");
    })
    .catch(err => {
      res.status(400).send("ไม่สามารถอัพเดตร้านค้าได้");
    });

});

/*DELETE*/
app.delete('/deleteRes', (req, res) => {
  resModel.deleteOne({ title: req.body.title })
    .then(item => {
      res.send("ลบร้านค้าเสร็จสิ้น");
    })
    .catch(err => {
      res.status(400).send("ไม่สามารถลบร้านค้าได้");
    });

});

const port = 4000;
app.listen(port, function () {
  console.log(`This server run at port: ${port}!`);
})