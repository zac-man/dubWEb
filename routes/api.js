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
/**
 * 创建一个
 */
router.post('/create', function (req, res, next) {
    var dubData = {
        name: req.body.name,
        type: req.body.type,
        url: req.body.url,
        createTime: Date.now()
    };
    if (dubData.name == '' || dubData.type == '' || dubData.url == '') {
        res.status(200).json({success: false});
    } else {
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

/**
 * 更新
 */
router.post('/update', function (req, res, next) {
    var dubData = {
        _id: req.body._id,
        name: req.body.name,
        type: req.body.type
    };
    dubModel.updateBy_id(dubData, function (err, doc) {
        if (!err) {
            res.status(200).json({success: true});
        } else {
            res.status(200).json({success: false});
        }
    });
});
/**
 * 删除一条记录
 */
router.post('/delete', function (req, res, next) {
    var _id = req.body._id;
    dubModel.deleteBy_id(_id, function (err) {
        if (!err) {
            res.status(200).json({success: true});
        } else {
            res.status(200).json({success: false});
        }
    });
});

/**
 * 获取所有的列表
 */
router.get('/dubAll', function (req, res, next) {
    dubModel.findAll(function (err, doc) {
        var reqMsg = {
            status: 200,
            data: doc,
            success: true
        };
        res.status(200).json(reqMsg);
    });

});

module.exports = router;
