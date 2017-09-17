var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');
var formidable = require("formidable");

var admin = require('./routes/admin');
var routes = require('./routes/index');
var api = require('./routes/api');
var dubModel = require('./database/dubModels');

// 数据库 设定
// global.dbHandel = require('./database/dbHandel');
// global.db = mongoose.connect("mongodb://localhost:27017/nodedb");


// 声明express框架
var app = express();

// session 时间设定
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

// ejs 修改为 html
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
//app.set("view engine","ejs");
app.set('view engine', 'html');

// app.use(favicon(__dirname + '/public/imgs/favicon.ico'));
// 加载中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(multer());
app.use(cookieParser());
//
app.use(express.static(path.join(__dirname, 'public')));

//前台展示页面路由
app.use('/', routes);  // 即为为路径 / 设置路由

// 管理员后台路由
app.use('/admin', admin);

// api对外接口
app.use('/api', api);


//上传

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/upload");
    },
    filename: function (req, file, callback) {
        console.log(file.originalname.split(".")[1]);
        callback(null, "dub_" + Date.now() + "." + file.originalname.split(".")[1]);
    }
});
var upload = multer({storage: Storage}).array("dubUploader", 10); //Field name and max count

app.post("/upload", function (req, res) {
    /* if(!req.session.user){ 					//到达/home路径首先判断是否已经登录
     res.redirect("/admin");				//未登录则重定向到 /login 路径
     }*/
    upload(req, res, function (err) {
        if (err) {
            // return res.end("Something went wrong!");
            return res.status(500).json({"success": false});
        }
        console.log(req.files);
        return res.status(200).json({"success": true, 'files': req.files});
    });
});

//多附件上传
//注意上传界面中的 <input type="file" name="photos"/>中的name必须是下面代码中指定的名
app.post('/mulUpload', function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    var form = new formidable.IncomingForm();
    var dubType = '';
    form.parse(req, function (err, fields, files) {
        dubType = fields.dubType;
    });

    upload(req, res, function (err) {
        if (err) {
            // return res.end("Something went wrong!");
            return res.status(500).json({"success": false});
        }

        for (var i = 0; i < req.files.length; i++) {
            var nameSplitByPoint = req.files[i].originalname.split(".")[0];
            var dubData = {
                name: nameSplitByPoint,
                type: dubType,
                url: req.files[i].filename,
                createTime: Date.now(),
                checked: false
            };
            dubModel.save(dubData, function (err, doc) {
                var reqMsg = {
                    status: 200,
                    data: doc,
                    success: true
                };
                console.log(doc);
            });
        }

        //console.log(req.files);
        return res.status(200).json({"success": true, 'files': req.files});
    });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 if(err.status == 404){
 res.redirect("/");
 }
 });*/

module.exports = app;