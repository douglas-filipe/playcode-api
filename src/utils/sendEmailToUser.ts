import nodemailer from "nodemailer";

export const sendEmailToUser = (
  emailUser: string,
  text: string,
  subject: string
) => {
  const remetente = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: process.env.email_send,
      pass: process.env.password_user,
    },
  });

  const emailTo = {
    from: process.env.email_send,
    to: emailUser,
    subject: subject,
    text: text,
  };
  remetente.sendMail(emailTo, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
