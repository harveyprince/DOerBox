var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create a Schema
var todoSchema = new Schema({
    content: String,
    tag_finish: {type: Boolean, default: false},
    createAt: {type: Date, default: Date.now}
});
var userSchema = new Schema({
    nick: String,
    sex: String,
    birthday: Date,
    head_icon: String,
    _accountId: {type: Schema.Types.ObjectId, ref: 'Account'},
    createAt: {type: Date, default: Date.now},
    todos: [todoSchema]
});
var User = mongoose.model('User', userSchema);

//export
module.exports = User;
