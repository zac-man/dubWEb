/**
 * Created by manjh on 2017/7/9.
 */
var express = require('express');
var router = express.Router();
var dubModel = require('../database/dubModels');
var checkedModel = require('../database/chekedcModels');


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
        createTime: Date.now(),
        checked: false
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

/**
 * 改变状态
 */
router.post('/updateChecked', function (req, res, next) {
    var _id = req.body._id;
    var checked = req.body.checked;

    dubModel.updateCheckedBy_id(_id, checked, function (err) {
        res.status(200).json({success: true});
    });

});
/**
 * 添加一条checklist 记录
 */
router.get('/addList', function (req, res, next) {
    var checkedList = {
        list: '专题配音'
    };
    checkedModel.findAll(function (err, doc) {
        if (doc.length >= 1) {
            res.status(200).json({success: false});
        } else {
            checkedModel.save(checkedList, function (err, doc) {
                var reqMsg = {
                    status: 200,
                    data: doc,
                    success: true
                };
                res.status(200).json(reqMsg);
            });
        }
    });

});
/**
 *  找到添加的那一条记录
 */
router.get('/findCheckedList', function (req, res, next) {
    checkedModel.findAll(function (err, doc) {
        var reqMsg = {
            status: 200,
            data: doc,
            success: true
        };
        res.status(200).json(reqMsg);
    })
});

/**
 *  更新checkList
 */
router.post('/updateCheckedList', function (req, res, next) {
    var _id = req.body._id;
    var checkList = req.body.checkList;

    checkedModel.updateBy_id(_id, checkList, function (err) {
        res.status(200).json({success: true});
    });

});

module.exports = router;
