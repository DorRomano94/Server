const bcrypt = require('bcryptjs');
const userQuery = require("../../DAL/queries/user.queries")
const { executeWithParameters } = require('../../DAL/config/db.connection')
const ServerError = require("../../utils/serverError")

const createUser = async (email, password) => {
  try {
    //Check if user exist
    const userByEmail = await executeWithParameters(userQuery.findUserByEmail, email);
    if (userByEmail.length !== 0) {
      throw new ServerError('Email is already exist.', 400)
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const parameters = [email, hashedPassword]
    await executeWithParameters(createUser, parameters)

  } catch (error) {
    next(error)
  }
}


exports.loginUser = async (email, password) => {
  //Check if user exist
  const userByEmail = await executeWithParameters(userQuery.findUserByEmail, email);
  console.log(userByEmail);
  return userByEmail
}

const updateUser = async (newUserDetails) => {
  console.log("ds");
  try {
    //Get user
    const [user] = await executeWithParameters(userQuery.findUserById, [+newUserDetails.id]);
    let parameters = []
    if (user[0].length === 0) {
      throw new ServerError('No user found by this ID.', 404)
    }
    if (newUserDetails.email) {
      parameters.push(newUserDetails.email)
    }
    if (newUserDetails.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUserDetails.password, salt);
      newUserDetails.password = hashedPassword
      parameters.push(newUserDetails.password)
    }
    parameters.push(+newUserDetails.id)
    await executeWithParameters(userQuery.updateUserById(newUserDetails), parameters)
  } catch (error) {
    throw new ServerError(error.message, 500)
  }
}

module.exports = {
  createUser,
  updateUser
}