var express = require('express');
var router = express.Router();
var { User, UserText } = require('../model/model.js')
var moment= require('moment');
// 注册
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', function (req, res, next) {

  let Users = {
    username: req.body.username,
    password: req.body.password,
    password2: req.body.password2
  };
  var userInfo = new User(Users)
  userInfo.save()
  res.send(Users);
});
// 登录  获取信息
router.post('/login', function (req, res, next) {
  let Users1 = {
    username: req.body.username,
    password: req.body.password
  };
  User.find(Users1, (err, docs) => {
    if (err) {
      console.log("错误");
    } else if (docs.length > 0) {
      req.session.username = Users1.username
      res.redirect('/')
    } else {
      console.log("失败");
      res.redirect('/login')
    }
  })

});
//退出登录
router.get('/quit', function (req, res, next){
  req.session.username =''
  res.redirect('/')
})

//删除 列表数据
router.get('/delet',function (req, res, next){
let delet=req.query.delet
let page=req.query.page
console.log(page);
  UserText.remove({_id:delet},function(err,data){
    if(err){
      console.log("错误"+err);
    }else{
      res.redirect('/?page='+page)
  
    }
  })

})
// 新增详情页页面
router.get('/newly',async function (req, res, next){
  //获取 用户名
  let username=req.session.username||""
      //获取 文章信息
      let data= await UserText.findOne({ _id: req.query.id})
      data['time']= moment(data.id).format('YYYY/MM/DD HH:mm')
      //提交到页面
      res.render('newly',{data,username})


})





module.exports = router;
