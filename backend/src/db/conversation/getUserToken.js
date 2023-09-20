const getDb = require("../db").getDb;

module.exports = getUserToken = async (userId) => {
  try {
    const connection = await getDb();
    const user = await connection.collection("users").findOne({ id: userId });

    if (user) return user.token;
    else null;
  } catch (err) {
    console.log("getUser " + err.message);
    throw err;
  }
};
