const insertuser = require("../../db/authentication/insertuser");
const getUsers = require("../../db/authentication/getUsers");

module.exports = insertSignUpRoute = {
  path: "/user/signup",
  method: "post",
  handler: async (req, res) => {
    try {
      const { number, name, email } = req.body;
      const user = await getUsers(number);
      if (user)
        return res
          .status(400)
          .send({ message: "User already registered", navigate: "false" });
      const response = await insertuser(number, name, email);
      return res
        .status(200)
        .send({ message: "Sign Up successfully!", navigate: "true" });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Server Error!", navigate: "false" });
    }
  },
};
