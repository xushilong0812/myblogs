
var express = require('express');
var router = express.Router();
var { UserText } = require('../model/model.js')
var moment = require('moment');
// 首页
router.get('/', async function (req, res, next) {
  let username = req.session.username || ""
  let page = req.query.page || 1

  let data = {
    torle: '',//总页数
    currentPage: page,//当前页
    list: [] //数据
  }

  let datalist = 5 //每页显示几行 数据

  //获取 列表 数据 传给 user
  let user = await UserText.find((err, user) => {
    if (err) {
      console.log("错误" + err);
    } else if (user.length > 0) {
      console.log('获取到列表');
    }
  }).limit(datalist)//每行显示条数
    .skip(datalist * (data.currentPage - 1))//显示初始位置
    .sort({ _id: -1 })//排列顺序


  //转换时间格式
  user.map(function (itme, index) {
    itme['itme'] = moment(itme.id).format('YYYY/MM/DD HH:mm')
  })

  data.torle = Math.ceil(await UserText.find().count() / datalist) //
  data.list = user //获取的数据 给 data.list


  // 传递数据到页面
  res.render('index', { username, data });
})
// 注册页面
router.get('/register', function (req, res, next) {
  res.render('register', {});
});
//登录界面
router.get('/login', function (req, res, next) {
  res.render('login', {});
});
//写文章页面
router.get('/article', async function (req, res, next) {
  let id= req.query.id
console.log(id);
  let list={
    title:'',
    content:"",
    page:req.query.page,
    id :id
  }
  console.log(list);
  if (id) {
     list = await UserText.findOne({ _id: id }, function (err, res) {
      if (err) {
        console.error(err);
      }
    })
    
    res.render('article', { list });
  } else {
    res.render('article',{list});
  }


})


module.exports = router;
