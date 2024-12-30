import dotenv from "dotenv";
dotenv.config();

class EnvVairables {
	static baseUrl = process.env.BASE_URL || "http://localhost:8081";

	static cardNumber = process.env.CARD_NUMBER || "4242424242424242";
	static cardExpirationDate = process.env.CARD_EXPIRATION_DATE || "12/25";
	static cardCvv = process.env.CARD_CVV || "123";
}

export default EnvVairables;
