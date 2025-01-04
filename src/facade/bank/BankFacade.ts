import Config from "src/config/Config";
import CustomError from "src/error/CustomError";
import BankService from "src/service/bank/BankService";
import BankValidation from "src/validation/bank/BankValidation";

class BankFacade {
	private bankService: BankService;
	private bankValidation: BankValidation;

	constructor() {
		this.bankService = new BankService();
		this.bankValidation = new BankValidation();
	}

	async getAccountFromCard(data: any) {
		let response;

		try {
			// query account information from card
			response = await this.bankService.getAccountFromCard(data);

			// make validation
			await this.bankValidation.getAccountFromCard(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}
	}

	async makeTransaction(data: any) {
		let senderOldAccountInformation, senderNewAccountInformation;
		let targetOldAccountInformation, targetNewAccountInformation;

		// sunny day scenario
		try {
			// query account information from card
			senderOldAccountInformation = (
				await this.bankService.getAccountFromCard({ cardNumber: data.senderCard.cardNumber, expirationDate: data.senderCard.expirationDate, cvv: data.senderCard.cvv })
			).data;

			targetOldAccountInformation = (
				await this.bankService.getAccountFromCard({ cardNumber: data.targetCard.cardNumber, expirationDate: data.targetCard.expirationDate, cvv: data.targetCard.cvv })
			).data;

			if (+senderOldAccountInformation.balance >= data.amount) {
				// make transaction
				await this.bankService.makeTransaction({
					senderCardNumber: data.senderCard.cardNumber,
					senderExpirationDate: data.senderCard.expirationDate,
					senderCvv: data.senderCard.cvv,
					targetCardNumber: data.targetCard.cardNumber,
					amount: data.amount,
					description: data.description,
				});

				// query account information from card
				senderNewAccountInformation = (
					await this.bankService.getAccountFromCard({ cardNumber: data.senderCard.cardNumber, expirationDate: data.senderCard.expirationDate, cvv: data.senderCard.cvv })
				).data;
				targetNewAccountInformation = (
					await this.bankService.getAccountFromCard({ cardNumber: data.targetCard.cardNumber, expirationDate: data.targetCard.expirationDate, cvv: data.targetCard.cvv })
				).data;

				// validate
				await this.bankValidation.validateMakeTransaction(senderOldAccountInformation, senderNewAccountInformation, targetOldAccountInformation, targetNewAccountInformation, data.amount);
			}
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}

		// scenario that when balance is not sufficient for make transaction
		try {
			senderOldAccountInformation = (
				await this.bankService.getAccountFromCard({ cardNumber: data.senderCard.cardNumber, expirationDate: data.senderCard.expirationDate, cvv: data.senderCard.cvv })
			).data;
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}

		data = { ...data, amount: 100000000000 };
		if (data.amount > +senderOldAccountInformation.balance) {
			// try make transaction
			try {
				await this.bankService.makeTransaction({
					senderCardNumber: data.senderCard.cardNumber,
					senderExpirationDate: data.senderCard.expirationDate,
					senderCvv: data.senderCard.cvv,
					targetCardNumber: data.targetCard.cardNumber,
					amount: data.amount,
					description: data.description,
				});
			} catch (error: any) {
				if (error instanceof CustomError) {
					if (error.getBody().statusCode !== 400) {
						if (Config.explicitErrorLog) error.log();
						error.throwError();
					}
				}
			}

			// query account information from card
			try {
				senderNewAccountInformation = (
					await this.bankService.getAccountFromCard({
						cardNumber: data.senderCard.cardNumber,
						expirationDate: data.senderCard.expirationDate,
						cvv: data.senderCard.cvv,
					})
				).data;
			} catch (error: any) {
				if (error instanceof CustomError) {
					if (Config.explicitErrorLog) error.log();
					error.throwError();
				}
			}

			let hasError = false;
			// validate
			try {
				await this.bankValidation.validateMakeTransaction(senderOldAccountInformation, senderNewAccountInformation, targetOldAccountInformation, targetNewAccountInformation, data.amount);
				hasError = true;
			} catch (err: any) {}

			if (hasError) {
				const error = CustomError.builder().setErrorType("Validation Error").setMessage("Transaction shouldn't be done as it is higher than balance.").build();
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}
	}

	async addProvision(data: any) {
		let oldAccountInformation, newAccountInformation;

		// sunny day scenario
		try {
			// query account information from card
			oldAccountInformation = (await this.bankService.getAccountFromCard(data)).data;

			if (+oldAccountInformation.balance > data.provision) {
				// add provision
				await this.bankService.addProvision(data);

				// query account information from card
				newAccountInformation = (await this.bankService.getAccountFromCard(data)).data;

				// validate
				await this.bankValidation.validateAddProvision(oldAccountInformation, newAccountInformation, data.provision);
			}
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}

		// scenario that when provision number is higher than balance
		// query account information from card
		try {
			oldAccountInformation = (await this.bankService.getAccountFromCard(data)).data;
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}

		data = { ...data, provision: 100000000000 };
		if (data.provision > +oldAccountInformation.balance) {
			// try add provision
			try {
				await this.bankService.addProvision(data);
			} catch (error: any) {
				if (error instanceof CustomError) {
					if (error.getBody().statusCode !== 400) {
						if (Config.explicitErrorLog) error.log();
						error.throwError();
					}
				}
			}

			// query account information from card
			try {
				newAccountInformation = (await this.bankService.getAccountFromCard(data)).data;
			} catch (error: any) {
				if (error instanceof CustomError) {
					if (Config.explicitErrorLog) error.log();
					error.throwError();
				}
			}

			// validate
			let hasError = false;
			try {
				await this.bankValidation.validateAddProvision(oldAccountInformation, newAccountInformation, data.provision);
				hasError = true;
			} catch (error: any) {}

			if (hasError) {
				const error = CustomError.builder().setErrorType("Validation Error").setMessage("Provision shouldn't be added as it is higher than balance.").build();
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}
	}

	async removeProvision(data: any) {
		let oldAccountInformation, newAccountInformation;

		// before remove provision lets make provision first
		await this.addProvision(data);

		// sunny day scenario
		// query account information from card
		try {
			oldAccountInformation = (await this.bankService.getAccountFromCard(data)).data;

			if (+oldAccountInformation.provision >= data.provision) {
				// remove provision
				await this.bankService.removeProvision(data);

				// query account information from card
				newAccountInformation = (await this.bankService.getAccountFromCard(data)).data;

				// validate
				await this.bankValidation.validateRemoveProvision(oldAccountInformation, newAccountInformation, data.provision);
			}
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}

		// scenario that when provision number is higher than requested provision
		try {
			oldAccountInformation = (await this.bankService.getAccountFromCard(data)).data;
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}

		data = { ...data, provision: 100000000000 };
		if (data.provision > +oldAccountInformation.provision) {
			// try remove provision
			try {
				await this.bankService.removeProvision(data);
			} catch (error: any) {
				if (error instanceof CustomError) {
					if (error.getBody().statusCode !== 400) {
						if (Config.explicitErrorLog) error.log();
						error.throwError();
					}
				}
			}

			// query account information from card
			try {
				newAccountInformation = (await this.bankService.getAccountFromCard(data)).data;
			} catch (error: any) {
				if (error instanceof CustomError) {
					if (Config.explicitErrorLog) error.log();
					error.throwError();
				}
			}

			// validate
			let hasError = false;
			try {
				await this.bankValidation.validateRemoveProvision(oldAccountInformation, newAccountInformation, data.provision);
				hasError = true;
			} catch (error: any) {}

			if (hasError) {
				const error = CustomError.builder().setErrorType("Validation Error").setMessage("Provision shouldn't be removed as current provision is not enough for requested provision").build();
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}
	}
}

export default BankFacade;
