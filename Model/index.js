const { db } = require("../Utils/mongodb");

// export collections
const UserCollection = db.collection("user");
const PageCollection = db.collection("pages");

module.exports = {
  UserCollection,
  PageCollection,
};
