var express = require('express');
var router = express.Router();

/**
 * 主页
 */
router.get('/', function (req, res, next) {
    res.render('dub/index', {title: 'Express'});
});

/**
 * 在线试听
 */
router.get('/online', function (req, res, next) {
    res.render('dub/online', {title: 'Express'});
});
/**
 * 关于我们
 */
router.get('/about', function (req, res, next) {
    res.render('dub/about', {title: 'Express'});
});
/**
 * 业务范畴
 */
router.get('/business', function (req, res, next) {
    res.render('dub/business', {title: 'Express'});
});
/**
 * 合作流程
 */
router.get('/cooperation', function (req, res, next) {
    res.render('dub/cooperation', {title: 'Express'});
});

module.exports = router;
