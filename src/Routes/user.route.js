const { createUser } = require('../Controller/user.controller');
const router = require('express').Router();

router.post('/create', createUser);

module.exports = router;