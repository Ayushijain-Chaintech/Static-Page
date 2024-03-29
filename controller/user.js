const { UserCollection } = require("../Model");
const errorHandler = require("../Utils/Errorhandler");
const { passHash, verifyPassHash } = require("../Utils/bcrypt");
const logger = require("../Utils/pino");
const { generateToken } = require("../middleware/auth");

// User Registration
const Register = async (req, res, next) => {
const { email, password } = req.body;
try {
if (!email || !password) {
logger.error("email and password are required");
return next(errorHandler(400, "email and password are required"));
}
// Check if user already exists
const userExist = await UserCollection.findOne({ email });
if (userExist) {
return next(errorHandler(400, "This email already exists"));
}
// Hash the password
const HashPassword = await passHash(password);
// Insert the user into the database
await UserCollection.insertOne({
email,
password: HashPassword,
});
logger.info(`User ${email} registered successfully`);
res.status(201).json({
success: true,
message: "You are successfully registered",
});
} catch (error) {
logger.error(error);
next(error);
}
};

// User Login
const Login = async (req, res, next) => {
const { email, password } = req.body;
try {
if (!email || !password) {
logger.error("email and password are required");
return next(errorHandler(400, "email and password are required"));
}
// Find user by email
const validUser = await UserCollection.findOne({ email });

if (!validUser) {
return next(errorHandler(404, "User not found"));
}
// Compare passwords
const isPasswordValid = await verifyPassHash(password, validUser.password);
if (!isPasswordValid) {
return next(errorHandler(401, "Invalid Credentials"));
}
const token = generateToken({
email: validUser.email,
password: validUser.password,
});
res.status(201).json({
message: "user logged in Successfully",
token,
});
} catch (error) {
logger.error(error);
next(error);
}
};

module.exports = { Register, Login };