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
    userValidation.loginValidation(req.body);
    const user = await userService.loginUser(req.body.email, req.body.password);
    // logger.info(`The user ${verifyUser.username} logged in ${new Date().toString()}`)
    res.send(user);
  } catch (err) {
    // logger.error(`Error while Login - User - ${req.body.userName} : ${err.message}`)
    next(err);
  }
}

const updateUser = async (req, res, next) => {
  try {
    let userDetails = req.body
    userDetails.id = req.params.user_id
    console.log({ userDetails });
    // userValidation.updateUserValidation(userDetails)
    await userService.updateUser(userDetails)
    res.status(201).send("User updated")
  } catch (err) {
    console.log(err);
    next(err);
  }
}



module.exports = {
  createUser,
  loginUser,
  updateUser
}