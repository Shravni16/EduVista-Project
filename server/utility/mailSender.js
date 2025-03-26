const nodemailer =require("nodemailer");

async function mailSender(email,title,body){
      try{
          let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
          });

          const mailSent=transporter.sendMail({
            from:"StudyNotion",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
          })

         return mailSent;
      }catch(error){
        console.log(error);
        console.log("Error While Sending mail")
      }
}

module.exports=mailSender;