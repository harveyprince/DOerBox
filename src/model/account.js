var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create a Schema
/**
  here the password
    md5( md5(real) + salt )
  of course you can change this logic
 */
var accountSchema = new Schema({
  _id:Schema.Types.ObjectId,
  email:String,
  password:String,
  salt:String,
  cellphone:String,
  name:String,
  createAt:{type: Date, default: Date.now}
});
var Account = mongoose.model('Account', accountSchema);

//exports
module.exports = Account;
