import dotenv from "dotenv";
dotenv.config();

class EnvVariables {
	static baseUrl = process.env.BASE_URL || "http://localhost:8081";

	static cardNumber = process.env.CARD_NUMBER || "4242424242424242";
	static cardExpirationDate = process.env.CARD_EXPIRATION_DATE || "12/25";
	static cardCvv = process.env.CARD_CVV || "123";
	
	static targetCardNumber = process.env.TARGET_CARD_NUMBER || "4000056655665556";
	static targetCardExpirationDate = process.env.TARGET_CARD_EXPIRATION_DATE || "04/26";
	static targetCardCvv = process.env.TARGET_CARD_CVV || "678";
}

export default EnvVariables;
