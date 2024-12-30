import EnvVairables from "src/env/EnvVariables";

class Config {
	static baseUrl = EnvVairables.baseUrl;

	static card = {
		cardNumber: EnvVairables.cardNumber,
		expirationDate: EnvVairables.cardExpirationDate,
		cvv: EnvVairables.cardCvv,
	};
}

export default Config;
