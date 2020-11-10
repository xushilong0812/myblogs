var express = require('express');
var router = express.Router();
var { UserText } = require('../model/model.js')
var multiparty = require('multiparty');
var fs = require('fs');
// 提交文章
router.post('/article', function (req, res, next) {
   
    let id = req.body.id
    console.log(id,"id");
        //模板
    if(id){
        let Users = {
            title: req.body.title,
            content: req.body.content,
        };
        console.log(2);
        UserText.update({_id:id},Users,function(err,data){
            if(err){
                console.error(err);
            }else{
                console.log(data);
                res.redirect('/')
            }
        })
    }else{
            //模板
            console.log(1);
            let Users = {
                title: req.body.title,
                content: req.body.content,
                username: req.session.username,
                id: Date.now(),
            };
            //实例化对象
            var userInfo = new UserText(Users)
            //传入 数据
            // userInfo.save()
            res.redirect('/')
    }
  

    

})
//上传文件接口
router.post('/upload', function (req, res, next) {
    var form = new multiparty.Form()
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('上传失败');
        } else {
            //获取图片
            let file = files.upload[0]
            //读取文件
            let rs = fs.createReadStream(file.path)
            //新建要储存的图片路径     创建 一个文件夹
            let newRs = "/uploud" + file.originalFilename
            //将新目录写入 public里面
            let ws = fs.createWriteStream('./public' + newRs)
            rs.pipe(ws)//边读边写
            ws.on('close', function( ){
                //这一步 是 ck要求返回的参数
         
                res.send({
                    uploaded:1,  //1
                    url:newRs   //路径
                })//结果将从文本域进入数据库
            
            })
       
        }

    })
})


module.exports = router;