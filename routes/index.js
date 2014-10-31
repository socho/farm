var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var vegetables = req.db.get('vegetables');
	vegetables.find({}, function(err,result){
		if (err) {
			res.send(err);
		}else {
			res.render('index', {vegetables: result});
		}
	})
});

module.exports = router;