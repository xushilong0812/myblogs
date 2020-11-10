var mongoose = require('./index.js')

var users = mongoose.Schema({
    username:String,
    password:String,
    password2:String
})


var usertext = mongoose.Schema({
    title:String,
    content:String,
    username:String,
    id:Number
})
var User = mongoose.model('User',users)
var UserText= mongoose.model('UserText',usertext)

module.exports ={User,UserText}