/**
 * Created by manjh on 2017/7/9.
 */
var express = require('express');
var router = express.Router();

// 默认登录页面
router.get('/', function(req, res, next) {
    res.render('system/login', { title: '登录页面' });
});

// 登录
router.post("/login",function(req,res){    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
    var username = req.body.username;
    var password = req.body.password;
    var reqMsg = {
        status:200,
        success:true
    };
    if(username == 'bailing' && password == 'zcd552288'){
        req.session.user = req.body;
        reqMsg.success = true;
        res.status(reqMsg.status).json(reqMsg);
    }else{
        reqMsg.success = false;
        res.status(reqMsg.status).json(reqMsg);
    }

});

// 后台管理页面
router.get('/system', function(req, res,next) {
    if(!req.session.user){ 					//到达/home路径首先判断是否已经登录
        res.redirect("/admin");				//未登录则重定向到 /login 路径
    }
    res.render('system/system', { title: '系统管理' });
});
// 登出
router.get("/logout",function(req,res){    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
    req.session.user = null;
    res.redirect("/admin");				//未登录则重定向到 /login 路径
});




module.exports = router;
