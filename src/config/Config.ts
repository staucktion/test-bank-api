import EnvVariables from "src/env/EnvVariables";

class Config {
	static baseUrl = EnvVariables.baseUrl;

	static card = {
		cardNumber: EnvVariables.cardNumber,
		expirationDate: EnvVariables.cardExpirationDate,
		cvv: EnvVariables.cardCvv,
	};

	static targetCard = {
		cardNumber: EnvVariables.targetCardNumber,
		expirationDate: EnvVariables.targetCardExpirationDate,
		cvv: EnvVariables.targetCardCvv,
	};
}

export default Config;
