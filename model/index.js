var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/xslBlog').then(()=>{
    console.log("数据库链接成功");
}).catch((err)=>{
    console.log('数据库链接失败,错误提示:'+err);
})
module.exports =mongoose