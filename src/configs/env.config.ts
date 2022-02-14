import { config } from "dotenv";

config();

const SECRET = process.env.SECRET;
const EXPIRE_IN = process.env.EXPIRE_IN;
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;
const MAIL_PORT = process.env.MAIL_PORT;

export { SECRET, EXPIRE_IN, MAIL_HOST, MAIL_PASS, MAIL_USER, MAIL_PORT };
