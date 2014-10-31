/* This file is copied from https://github.com/kongming92/6170-p3demo/blob/master/utils/utils.js */

var utils = {};

/*
  Send a 200 OK with success:true in the request body to the
  response argument provided.
  The caller of this function should return after calling
*/
utils.sendSuccessResponse = function(res, content, status) {
  res.status(status || 200).send({
    success: true,
    content: content
  });
};

/*
  Send an error code with success:false and error message
  as provided in the arguments to the response argument provided.
  The caller of this function should return after calling
*/
utils.sendErrResponse = function(res, errcode, err) {
  res.status(errcode).send({
    success: false,
    err: err
  });
};

module.exports = utils;