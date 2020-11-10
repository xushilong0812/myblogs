
小工具  cnpm i --save   nodemon   自动保存
更改  nodemon 

# 登录
    需求描述
- 实现用户登录  
- 登录成功是否，跳转到不同的页面
- 访问项目的登录拦截；除了登录注册，全部拦截回登录
- 登陆成功，记录成功


# 重定向




# 写文章
- 创建写文章路由 并导出 article.js

- app.js 里 导入路由 并 配置他

- var articlesRouter = require('./routes/articles'); 配置

- 使用 app.use('/articles',articlesRouter)



# 富文本
导入图片

/**
 * 上传文件
 * 写入到服务器
 * 展示到富文本框
 */
  ```js
ckfinder:{
    uploadUrl:'//articles/upload'//上传文件
}
 ``` 

 //需要技术： fs、 multiparty
 1. 步骤  导入需要的包 
 ``` cmd
 cnpm install multiparty --save
 ```
 2. 使用 包的 Form()
 ```js
 var form = multiparty.Form()
 ```
 3. 使用 form.parse( )

// 第一个 请求   ， 函数( err,fields,files) err：错误 fields:   ,files:当前文件


```js
let file =files.upload[0]

let re =fs.createReadStream(file.path)
let newRs="/uploud" +file.originalFilename
//将新目录写入 public里面
let ws=fs.createWriteStream('./public'+newRs)
rs.pipe(ws)//边读边写

//当文件读取关闭，箭头close事件
ws.on(close, function( ){
    //这一步 是 ck要求返回的参数
    res.send({
        uploaded:1,
        url:newRs
    })//结果将从文本域进入数据库
})
```




# 异步获取 列表信息
```js
router.get('/', async function(req, res, next) {
  let username=req.session.username||""
  await UserText.find(  (err, user)=> {
    if(err){
      console.log("错误");
    }else if(user.length>0){
      console.log('获取到列表');
    }
  })
  res.render('index', {username,user});
})
```
"# blogs" 
