var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var dubSchema = new Schema({
    name: String,
    type: String,
    url: String,
    createTime: String
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
        callback(err,obj);
    })
};
/**
 按照电影名称精确查询
 **/
dubDao.prototype.findByName = function (name, callback) {
    dubSchema.findOne({name: name}, function (err, obj) {
        //callback(err,obj);
    });
};

module.exports = new dubDao();