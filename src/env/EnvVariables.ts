import dotenv from "dotenv";
dotenv.config();

const envVariables = {
  baseUrl: process.env.BASE_URL || "http://localhost:8080",
  preKey: process.env.PRE_KEY || "api-test_",
  adminEmail: process.env.ADMIN_EMAIL || "admin@hotmail.com",
  adminPassword: process.env.ADMIN_PASSWORD || "admin",
};

export default envVariables;
