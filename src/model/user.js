var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create a Schema
var userSchema = new Schema({
    nick:String
});
var User = mongoose.model('User', userSchema);

//export
module.exports = User;
