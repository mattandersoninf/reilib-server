// user account routes


const express = require('express')

//controller functions
const {getUsers, signupUser, loginUser} = require('../controllers/user-controller')

const router = express.Router()

router.get('/',getUsers)

//login route
router.post('/login', loginUser)

// signup
router.post('/signup', signupUser)

module.exports = router
 