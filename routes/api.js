/**
 * Created by manjh on 2017/7/9.
 */
var express = require('express');
var router = express.Router();
var dubModel = require('./../database/models');


// 默认登录页面
router.get('/', function (req, res, next) {
    res.render('system/login', {title: 'api'});
});

router.post('/create', function (req, res, next) {
    var dubData = {
        name: req.body.name,
        type: req.body.type,
        url: req.body.url,
        createTime: Date.now()
    };
    if (dubData.name == ''||dubData.name == ''||dubData.name == ''){
        res.status(200).json({success:false});
    }else{
        dubModel.save(dubData, function (err, doc) {
            var reqMsg = {
                status: 200,
                data: doc,
                success: true
            };
            res.status(200).json(reqMsg);
        });
    }
});
router.get('/dubAll', function (req, res, next) {
    console.log("dubAll");
    dubModel.findAll(function(err, doc){
        var reqMsg = {
            status: 200,
            data: doc,
            success: true
        };
        res.status(200).json(reqMsg);
    });

});

module.exports = router;
