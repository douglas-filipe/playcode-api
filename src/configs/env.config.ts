import { config } from "dotenv";

config();

const SECRET = process.env.SECRET;
const EXPIRE_IN = process.env.EXPIRE_IN;
const MAIL_HOST = process.env.MAIL_HOST as string;
const MAIL_USER = process.env.MAIL_USER as string;
const MAIL_PASS = process.env.MAIL_PASS as string;
const MAIL_PORT = Number(process.env.MAIL_PORT) as number;

export { SECRET, EXPIRE_IN, MAIL_HOST, MAIL_PASS, MAIL_USER, MAIL_PORT };
