const userValidation = require('../Services/userService/user.validation')
const userService = require('../Services/userService/user.service')

const createUser = async (req, res, next) => {
  try {
    userValidation.createUserValidation(req.body)
    const user = await userService.createUser(req.body.email, req.body.password)
    res.status(201).send("User created")
  } catch (err) {
    next(err);
  }
}



const loginUser = async (req, res, next) => {
  try {
    // Validate
    loginValidation(req.body);
    const verifyUser = await userService.loginUser(req.body.email, req.body.password);
    logger.info(`The user ${verifyUser.username} logged in ${new Date().toString()}`)
    res.json(verifyUser);
  } catch (err) {
    logger.error(`Error while Login - User - ${req.body.userName} : ${err.message}`)
    next(err);
  }
}

module.exports = {
  createUser,
  loginUser
}