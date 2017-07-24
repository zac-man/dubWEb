var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var dubSchema = new Schema({
    name: String,
    type: String,
    url: String,
    createTime: String,
    checked: Boolean
});


var dubSchema = mongodb.mongoose.model("dubs", dubSchema);
var dubDao = function () {
};


/*******
 保存
 ********/
dubDao.prototype.save = function (obj, callback) {
    var instance = new dubSchema(obj);
    instance.save(function (err, doc) {
        callback(err, doc);
    })
};


/**
 *  查询所有的数据
 */
dubDao.prototype.findAll = function (callback) {
    dubSchema.find(function (err, obj) {
        callback(err, obj);
    })
};


/**
 *  更新数据
 */

dubDao.prototype.updateBy_id = function (data, callback) {
    dubSchema.update({_id: data._id}, data, function (err, obj) {
        callback(err, obj);
    });
};

/**
 * 删除
 */
dubDao.prototype.deleteBy_id = function (_id, callback) {
    dubSchema.remove({_id: _id}, function (err) {
        callback(err);
    });
};
/**
 * 改变状态
 */

dubDao.prototype.updateCheckedBy_id = function (_id, checked, callback) {
    dubSchema.update({_id: _id}, {checked: checked}, function (err) {
        callback(err);
    });
};
module.exports = new dubDao();