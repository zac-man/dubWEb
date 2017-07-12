var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./models");

for(var m in models){ 
	mongoose.model(m,new Schema(models[m]));
}

module.exports = { 
	getModel: function(type){
		console.log("collection:"+type);
		return _getModel(type);
	}
};

var _getModel = function(type){ 
	return mongoose.model(type);
};