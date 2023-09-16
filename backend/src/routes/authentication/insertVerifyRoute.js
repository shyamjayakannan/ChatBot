const getOpt = require("../../db/authentication/getOpt");
const deleteOtp = require("../../db/authentication/deleteOtp");
const updateUser = require("../../db/authentication/updateUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = insertVerifyRoute = {
  path: "/user/verify",
  method: "post",
  handler: async (req, res) => {
    try {
      const { otp, number } = req.body;
      const otpHolder = await getOpt(number);
      if (otpHolder.length == 0)
        return res
          .status(400)
          .send({ message: "You are an Expired Otp!", navigate: "false" });
      const rightOtpFind = otpHolder[otpHolder.length - 1];
      const validUser = await bcrypt.compare(otp, rightOtpFind.otp);
      if (rightOtpFind.number == req.body.number && validUser) {
        const token = jwt.sign(
          {
            _id: rightOtpFind._id,
            number: number,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "15d" }
        );
        const response = await updateUser(number, token);
        const result = await deleteOtp(number);
        return res.status(200).send({
          message: "User Sign In Sucessfully",
          token: token,
          data: response,
          navigate: "true",
        });
      } else {
        return res
          .status(200)
          .send({ message: "Your OTP was wrong!", navigate: "false" });
      }
    } catch (err) {
      console.log(err.message);
      return res
        .status(400)
        .send({ message: "Server Error!", navigate: "false" });
    }
  },
};
