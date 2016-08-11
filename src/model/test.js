/**
 * Created by harveyprince on 16/8/11.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create a Schema
var testSchema = new Schema({
    name: String,
    createAt: {type:Date, default:Date.now}
});
var Test = mongoose.model('Test', testSchema);
//export
module.exports = Test;