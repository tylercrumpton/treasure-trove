/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /payments              ->  index
 * POST    /payments              ->  create
 * PUT     /payments/:id          ->  update
 * DELETE  /payments/:id          ->  destroy
 *
 * GET     /payments/:name/:year/:month
 * DELETE  /payments/:name/:year/:month
 */

'use strict';

var _ = require('lodash');
var Payment = require('./payment.model');

// Generates a JSON file export
exports.genJsonExport = function(req, res) {
  var searchModel = {};
  Payment.find(searchModel, function (err, payments) {
    if(err) { return handleError(res, err); } 
    res.setHeader('Content-disposition', 'attachment; filename=tt_export.json');
  });
};
// Get a single payment for logged in user
exports.showMineByYearMon = function(req, res) {
  var searchModel = {'name': req.user.name,
                     'year': req.params.year,
                     'month': req.params.month};
  Payment.findOne(searchModel, function (err, payment) {
    if(err) { return handleError(res, err); }
    if(!payment) { return res.json({'paid':false}); }
    return res.json({'paid':true});
  });
};

// Get a year's payments for logged in user
exports.showMineByYear = function(req, res) {
  var searchModel = {'name': req.user.name,
                     'year': req.params.year};
  Payment.find(searchModel, function (err, payments) {
    if(err) { return handleError(res, err); }
    return res.json(200, payments);
  });
};

// Get a single payment
exports.showByNameYearMon = function(req, res) {
  var searchModel = {'name': req.params.name,
                     'year': req.params.year,
                     'month': req.params.month};
  Payment.findOne(searchModel, function (err, payment) {
    if(err) { return handleError(res, err); }
    if(!payment) { return res.json({'paid':false}); }
    return res.json({'paid':true});
  });
};

// Get a year's payments
exports.showByNameYear = function(req, res) {
  var searchModel = {'name': req.params.name,
                     'year': req.params.year};
  Payment.find(searchModel, function (err, payments) {
    if(err) { return handleError(res, err); }
    return res.json(200, payments);
  });
};

// Deletes a payment from the DB.
exports.destroyByNameYearMon = function(req, res) {
  var searchModel = {'name': req.params.name,
                     'year': req.params.year,
                     'month': req.params.month};
  Payment.findOne(searchModel, function (err, payment) {
    if(err) { return handleError(res, err); }
    if(!payment) { return res.send(404); }
    payment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Get list of payments
exports.index = function(req, res) {
  Payment.find(function (err, payments) {
    if(err) { return handleError(res, err); }
    return res.json(200, payments);
  });
};

// Get a single payment
exports.show = function(req, res) {
  Payment.findById(req.params.id, function (err, payment) {
    if(err) { return handleError(res, err); }
    if(!payment) { return res.send(404); }
    return res.json(payment);
  });
};

// Creates a new payment in the DB.
exports.create = function(req, res) {
  Payment.create(req.body, function(err, payment) {
    if(err) { return handleError(res, err); }
    return res.json(201, payment);
  });
};

// Updates an existing payment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Payment.findById(req.params.id, function (err, payment) {
    if (err) { return handleError(res, err); }
    if(!payment) { return res.send(404); }
    var updated = _.merge(payment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, payment);
    });
  });
};

// Deletes a payment from the DB.
exports.destroy = function(req, res) {
  Payment.findById(req.params.id, function (err, payment) {
    if(err) { return handleError(res, err); }
    if(!payment) { return res.send(404); }
    payment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
