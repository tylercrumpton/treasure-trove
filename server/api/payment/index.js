'use strict';

var express = require('express');
var controller = require('./payment.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole("admin"), controller.index);
router.get('/:id', auth.hasRole("admin"), controller.show);
router.post('/', auth.hasRole("admin"), controller.create);
router.put('/:id', auth.hasRole("admin"), controller.update);
router.patch('/:id', auth.hasRole("admin"), controller.update);
router.delete('/:id', auth.hasRole("admin"), controller.destroy);

router.get('/users/:name/:year/:month', auth.hasRole("admin"), controller.showByNameYearMon)
router.delete('/users/:name/:year/:month', auth.hasRole("admin"), controller.destroyByNameYearMon)
router.get('/users/:name/:year', auth.hasRole("admin"), controller.showByNameYear)

router.get('/export/json', auth.hasRole("admin"), controller.genJsonExport)

module.exports = router;
