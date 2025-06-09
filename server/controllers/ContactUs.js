const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utility/mailSender")

exports.contactUsController = async (req, res) => {
  // console.log("hellooooo")
  const { email, firstName, lastName, message, phoneNo, countryCode } = req.body;
  const myemail="shravnidhokare@gmail.com";
  console.log(req.body);
  console.log("In contact us controller")
  try {
    const emailRes = await mailSender(
      myemail,
      "Your Data send successfully",
      contactUsEmail(email, firstName, lastName, message, phoneNo, countryCode)
    )
    // console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {   
    // console.log("Error", error)
    // console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
