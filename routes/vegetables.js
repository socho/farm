var express = require('express');
var router = express.Router();


var utils = require('../utils/utils');

/*
  GET /vegetables
  No request parameters
  Response:
    - success: true if the server succeeded in getting all vegetables
    - content: on success, an object with a single field 'vegetables', which contains a list of the
    vegetables
    - err: on failure, an error message
*/
router.get('/', function(req, res) {
  var vegetables = req.db.get('vegetables');
  vegetables.find({}, function(err, vegetables) {
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error occurred.');
    } else {
      utils.sendSuccessResponse(res, { vegetables: vegetables });
    }
  });
});


/*
  POST /vegetables
  Request body:
    - type: the type of vegetable (e.g. "pumpkin")
    - cycle: growth cycle in minutes (e.g. 3 means 3 minutes)
    - time: timeCreated in secs
  Response:
    - success: true if the server succeeded in recording the vegetable
    - err: on failure, an error message
*/
router.post('/', function(req, res) {
  var vegetables = req.db.get('vegetables');
  vegetables.insert({
    type: req.body.type,
    cycle: req.body.cycle,
    time: req.body.time,
    harvested: false
  }, function(err, vegetable) {
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error occurred.');
    } else {
      utils.sendSuccessResponse(res, vegetable);
    }
  });
});

/*
  PUT /vegetables/:vegetable_id
  Request parameters:
    - vegetable_id: a String representation of the MongoDB _id of the vegetable
  Response:
    - success: true if the server succeeded in marking the vegetable harvested
    - err: on failure, an error message
*/
router.put('/:vegetable_id', function(req, res) {
  var vegetables = req.db.get('vegetables');
  vegetables.update( { _id: req.params.vegetable_id }, {
    $set: {
      harvested: true
    }
  }, function(err, result) {
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error occurred.');
    } else {
      utils.sendSuccessResponse(res, result);
    }
  });
});

/*
  DELETE /vegetables/:vegetable_id
  Request parameters:
    - vegetable_id: a String representation of the MongoDB _id of the vegetable
  Response:
    - success: true if the server succeeded in deleting the vegetable (dead)
    - err: on failure, an error message
*/
router.delete('/:vegetable_id', function(req, res) {
  var vegetables = req.db.get('vegetables');
  vegetables.remove({ _id: req.params.vegetable_id }, function(err, result) {
    if (err, result) {
      utils.sendErrResponse(res, 500, 'An unknown error occurred.');
    } else {
      utils.sendSuccessResponse(res, result);
    }
  });
});


module.exports = router;