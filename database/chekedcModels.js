var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var dubModel = require('../database/dubModels');

var checkedSchema = new Schema({
    list: String
});


var checkedSchema = mongodb.mongoose.model("checked", checkedSchema);

var checkedDao = function () {
};

/*******
 保存
 ********/

checkedDao.prototype.save = function (obj, callback) {
    var instance = new checkedSchema(obj);
    instance.save(function (err, doc) {
        callback(err, doc);
    })
};

/**
 *  查询所有的数据
 */

checkedDao.prototype.findAll = function (callback) {
    checkedSchema.find(function (err, obj) {

        callback(err, obj);
    })
};

/**
 * 多表查询
 */


checkedDao.prototype.findAllSplitType = function (callback) {
    checkedSchema.find(function (err, obj) {
        var typeList = obj[0].list.split(",");
        dubModel.findOneByType(typeList, function (err, doc, type) {

            callback(err, type, doc);
        });
    })
};

/**
 *  更新数据
 */

checkedDao.prototype.updateBy_id = function (_id, str, callback) {
    checkedSchema.update({_id: _id}, {list: str}, function (err, obj) {
        callback(err, obj);
    });
};

/**
 * 删除
 */

/**
 * 改变状态
 */


module.exports = new checkedDao();