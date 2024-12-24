import dotenv from "dotenv";
dotenv.config();

class EnvVairables {
  static baseUrl = process.env.BASE_URL || "http://localhost:8081";

  static preKey = process.env.PRE_KEY || "api-test_";

  static cardNumber = process.env.CARD_NUMBER || "4242424242424242";
  static cardExpirationDate = process.env.PRE_KEY || "12/25";
  static cardCvv = process.env.PRE_KEY || "123";
}

export default EnvVairables;
