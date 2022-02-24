import nodemailer from "nodemailer";
import {
  MAIL_HOST,
  MAIL_PASS,
  MAIL_PORT,
  MAIL_USER,
} from "../configs/env.config";

export const sendEmailToUser = (
  emailUser: string,
  text: string,
  subject: string
) => {
  const remetente = nodemailer.createTransport({
    host: MAIL_HOST,
    service: "gmail",
    port: MAIL_PORT,
    secure: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

  const emailTo = {
    from: MAIL_USER,
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
