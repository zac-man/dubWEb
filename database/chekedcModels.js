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
var dubSchema = new Schema({
    name: String,
    type: String,
    url: String,
    createTime: String,
    checked: Boolean
});



checkedDao.prototype.findAllSplitType = function (callback) {
    checkedSchema.find(function (err, obj) {
        var typeList = obj[0].list.split(",");
        var aa = [];
        console.log(typeList);
        for (var i = 0; i < typeList.length; i++) {
            var temp ;
           dubModel.findOneByType(typeList[i], function (err, doc) {
                temp = {type: typeList[i], list: doc};
                console.log(temp);
                aa.push(temp);
                //res.status(200).json(reqMsg);
            });
            console.log(temp);
            aa.push(i)
        }
        console.log(aa);
        /*
         var typeList = doc[0].list.split(",");

         for (var i = 0; i < typeList.length; i++) {
         console.log("-------------------------" + i);
         dubModel.findOneByType(typeList[i], function (err, doc) {
         var temp = {type: typeList[i], list: doc};
         console.log(doc);
         reqMsg.data.push(temp);
         //res.status(200).json(reqMsg);
         });
         }
         */
        callback(err, obj);
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