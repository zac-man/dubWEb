/**
 * Created by manjh on 2017/7/9.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dubWeb');
exports.mongoose = mongoose;