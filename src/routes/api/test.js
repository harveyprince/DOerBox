/**
 * Created by harveyprince on 16/8/11.
 */
var Test = require('../../model/test');
module.exports = function (router) {
    var uri = '/test';
    router.get(uri, function (req, res, next) {
        Test
            .findOne({
                name: 'harveyprince'
            })
            .exec()
            .then((doc) => {
                console.log(doc);
                return doc;
            })
            .then((doc) => {
                console.log(doc);
            });
        res.json({
            result: 'result'
        });
    });
    router.post(uri, function (req, res, next) {
        var name = req.body.name;
        var test = new Test({
            name
        });
        test.save();
        res.json({
            result: 'result'
        });
    });
}