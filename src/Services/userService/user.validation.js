const validator = require('validator');
const ServerError = require("../../utils/serverError");


const isStrongPasswordConfiguration = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    returnScore: true,
    pointsForContainingLower: 10,
    pointsForContainingUpper: 10,
    pointsForContainingNumber: 10,
}
exports.createUserValidation = (data) => {
    const { email, password } = data;
    const passwordScore = validator.isStrongPassword(password, isStrongPasswordConfiguration)
    if (!email) {
        throw new ServerError("The email address is missing", 403)
    }
    if (!validator.isEmail(email)) {
        throw new ServerError("Email is not valid", 400)
    }
    if (!password) {
        throw new ServerError("Password is not exist", 403)
    }
    if (passwordScore < 30) {
        throw new ServerError("Password must contain minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1", 400)
    }
}


exports.loginValidation = (data) => {
    const { email, password } = data;
    const isStrongPasswordConfiguration = {
        minLength: 8
    }
}

exports.updateUserValidation = (data) => {
    const { id, email, password } = data;
    const passwordScore = validator.isStrongPassword(password, isStrongPasswordConfiguration)
    // if (!id) {
    //     throw new ServerError("missing id", 404)
    // }
    // if (!validator.isNumeric(id)) {
    //     throw new ServerError("Id is not Numeric", 404)
    // }
    // if (email && !validator.isEmail(email)) {
    //     throw new ServerError("Email is not valid", 400)
    // }
    // if (password && passwordScore < 30) {
    //     throw new ServerError("Password must contain minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1", 400)
    // }
}