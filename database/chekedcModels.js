var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;



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
    console.log("--------");
    console.log(obj);
    console.log("--------");
    instance.save(function (err, doc) {
        callback(err, doc);
    })
};

/**
 *  查询所有的数据
 */

checkedDao.prototype.findAll = function (callback) {
    checkedSchema.find(function (err, obj) {
        console.log(obj);
        callback(err, obj);
    })
};

/**
 *  更新数据
 */


/**
 * 删除
 */

/**
 * 改变状态
 */


module.exports = new checkedDao();