const bcrypt = require("bcrypt");

const passHash = async (password) => {
return await bcrypt.hash(password, 10);
};

const verifyPassHash = async (password, hashPass) => {
return await bcrypt.compare(password, hashPass);
};

module.exports = { passHash, verifyPassHash };