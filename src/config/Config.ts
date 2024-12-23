import envVariables from "src/env/EnvVariables";

class Config {
  static baseUrl = envVariables.baseUrl;
  static preKey = envVariables.preKey;

  static admin = {
    email: envVariables.adminEmail,
    password: envVariables.adminPassword,
  };
}

export default Config;
