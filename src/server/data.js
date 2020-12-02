// 1.ร้านอาหารญี่ปุ่น 2.คาเฟ่ต์ 3.ร้านปิ้งย่าง 4.ร้านชาบู 5.ร้านอาหารตามสั่ง 6.ร้านอาหารประเภทอื่นๆ
var http = require('http');
var mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

var url = "mongodb://localhost:27017/tuData";

mongoose.connect(url, function (err, res) {
    if (err) {
      console.log ('ERROR connecting to: ' + url + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + url);
    }
});
  
var db = mongoose.connection;
db.on('connected', function() { console.log('Mongoose connected')});
db.on('error', function(err) { console.log('Mongoose error: ' + err) });
db.on('disconnected', function() { console.log('Mongoose disconnected')});

var resSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  category: Number, 
  carPark: Boolean,
  Wi_Fi: Boolean,
  CreditCard: Boolean,
  timeOpen: String,
  timeClose: String,
  day: String,
  price: String,
  location : String,
  other : String,
  recommend: String,     
});

var res = mongoose.model('restaurant', resSchema);
var restaurant = [];

db.res.find().forEach( function(a) { 
    restaurant.push(
        {
            title: a.title,
            description: a.description,
            image: a.image,
            category: a.category, 
                    carPark: a.carPark,
                    Wi_Fi: a.Wi_Fi,
                    CreditCard: a.CreditCard,
                    timeOpen: a.timeOpen,
                    timeClose: a.timeClose,
                    day: a.day,
                    price: a.price,
                    location : a.location,
                    other : a.other,
            recommend: a.recommend,     
            score: a.score,
            scoreImg: 'https://uppic.cc/d/KoRY',
        }
    )
    
});

export default restaurant;