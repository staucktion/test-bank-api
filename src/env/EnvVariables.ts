import dotenv from "dotenv";
dotenv.config();

class EnvVariables {
	static baseUrl = process.env.BASE_URL || "http://localhost:8081";

	static explicitErrorLog = process.env.EXPLICIT_ERROR_LOG === "true";

	static senderCardNumber = process.env.SENDER_CARD_NUMBER || "4242424242424242";
	static senderCardExpirationDate = process.env.SENDER_CARD_EXPIRATION_DATE || "12/25";
	static senderCardCvv = process.env.SENDER_CARD_CVV || "123";

	static targetCardNumber = process.env.TARGET_CARD_NUMBER || "4000056655665556";
	static targetCardExpirationDate = process.env.TARGET_CARD_EXPIRATION_DATE || "04/26";
	static targetCardCvv = process.env.TARGET_CARD_CVV || "678";
}

export default EnvVariables;
