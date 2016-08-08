var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create a Schema
var userSchema = new Schema({
    nick:String,
    sex:String,
    birthday:Date,
    head_icon:String,
    _accountId:{ type: Schema.Types.ObjectId, ref: 'Account' },
    createAt: {type:Date, default:Date.now}
});
var User = mongoose.model('User', userSchema);

//export
module.exports = User;
