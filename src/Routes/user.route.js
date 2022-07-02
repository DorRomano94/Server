const { createUser, loginUser, updateUser } = require('../Controller/user.controller')
const router = require('express').Router()

router.post('/create', createUser)
router.post('/login', loginUser)
router.put('/update/:user_id', updateUser)


module.exports = router