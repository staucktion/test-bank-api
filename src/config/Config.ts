import EnvVariables from "src/env/EnvVariables";

class Config {
	static baseUrl = EnvVariables.baseUrl;

	static senderCard = {
		cardNumber: EnvVariables.senderCardNumber,
		expirationDate: EnvVariables.senderCardExpirationDate,
		cvv: EnvVariables.senderCardCvv,
	};

	static targetCard = {
		cardNumber: EnvVariables.targetCardNumber,
		expirationDate: EnvVariables.targetCardExpirationDate,
		cvv: EnvVariables.targetCardCvv,
	};
}

export default Config;
