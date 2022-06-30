const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail } = require("../../DAL/queries/user.queries")
const { executeWithParameters } = require('../../DAL/config/db.connection')
const ServerError = require("../../utils/serverError")


exports.createUser = async (email, password) => {
  //Check if user exist
  const userByEmail = await executeWithParameters(findUserByEmail, email);
  if (userByEmail.length !== 0) {
    throw new ServerError('Email is already exist.', 400)
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const parameters = [email, hashedPassword]
  await executeWithParameters(createUser, parameters)
}


exports.loginUser = async (email, password) => {
  //Check if user exist
  const userByEmail = await executeWithParameters(findUserByEmail, email);
  

}