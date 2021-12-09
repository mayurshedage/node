const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users.controller');

router.get('/', UserController.findAll);

router.post('/', UserController.create);

module.exports = router;