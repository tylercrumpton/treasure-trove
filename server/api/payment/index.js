'use strict';

var express = require('express');
var controller = require('./payment.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/users/:name/:year/:month', controller.showByNameYearMon)
router.delete('/users/:name/:year/:month', controller.destroyByNameYearMon)
router.get('/users/:name/:year', controller.showByNameYear)

module.exports = router;
