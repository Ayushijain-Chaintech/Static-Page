const jwt = require("jsonwebtoken");
const { key } = require("../Config/connect");

// generate token

function generateToken(payload) {
return jwt.sign(payload, key, { expiresIn: "1h" });
}

// verify token

function verifyToken(token) {
let tokens = token.split(" ")[1];
return jwt.verify(tokens, key);
}

function authenticate(req, res, next) {
const token = req.headers.authorization;
if (!token) {
return res.status(401).json({ message: "Unauthorized" });
}

try {
const decoded = verifyToken(token);
req.user = decoded;
next();
} catch (error) {
return res.status(401).json({ message: "Invalid token" });
}
}

module.exports = { generateToken, verifyToken, authenticate };