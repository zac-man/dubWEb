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
 * 根据类型查询
 */
dubDao.prototype.findOneByType = function (type, callback) {
    dubSchema.find({type: {$in: type}}, function (err, obj) {
        callback(err, obj, type);
    });
};

/**
 *  分页查询
 */
dubDao.prototype.findListHasPage = function (params, callback) {
    var page = parseInt(params.pageNo);
    var rows = parseInt(params.pageSize);

    var query = dubSchema.find({});
    var skipNum = (page - 1) * rows;
    if (params.type !== '') {
        query.where('type', params.type)
    }
    if (params.name !== '') {
        var nameRe = new RegExp(params.name);
        query.where('name', nameRe)
    }
    query.skip(skipNum).limit(rows).exec('find', function (err, items) {
        if (err) {
            callback(err, items);
        } else {
            //计算数据总数
            var query2 = dubSchema.find({});
            if (params.type !== '') {
                query2.where('type', params.type)
            }
            if (params.name !== '') {
                var nameRe = new RegExp(params.name);
                query2.where('name', nameRe)
            }
            query2.exec('find', function (err, result) {
                callback(err, items, result.length);
            });
        }
    });
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