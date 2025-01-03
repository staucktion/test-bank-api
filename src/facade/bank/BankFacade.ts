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
		// query account information from card
		const response = await this.bankService.getAccountFromCard(data);

		// make validation
		await this.bankValidation.getAccountFromCard(response);
	}

	async makeTransaction(data: any) {
		let senderOldAccountInformation, senderNewAccountInformation;
		let targetOldAccountInformation, targetNewAccountInformation;

		// sunny day scenario
		senderOldAccountInformation = (
			await this.bankService.getAccountFromCard({
				cardNumber: data.senderCard.cardNumber,
				expirationDate: data.senderCard.expirationDate,
				cvv: data.senderCard.cvv,
			})
		).data;
		targetOldAccountInformation = (
			await this.bankService.getAccountFromCard({
				cardNumber: data.targetCard.cardNumber,
				expirationDate: data.targetCard.expirationDate,
				cvv: data.targetCard.cvv,
			})
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
				await this.bankService.getAccountFromCard({
					cardNumber: data.senderCard.cardNumber,
					expirationDate: data.senderCard.expirationDate,
					cvv: data.senderCard.cvv,
				})
			).data;
			targetNewAccountInformation = (
				await this.bankService.getAccountFromCard({
					cardNumber: data.targetCard.cardNumber,
					expirationDate: data.targetCard.expirationDate,
					cvv: data.targetCard.cvv,
				})
			).data;

			// validate
			await this.bankValidation.validateMakeTransaction(
				senderOldAccountInformation,
				senderNewAccountInformation,
				targetOldAccountInformation,
				targetNewAccountInformation,
				data.amount
			);
		}

		// scenario that when balance is not sufficient for make transaction
		senderOldAccountInformation = (
			await this.bankService.getAccountFromCard({
				cardNumber: data.senderCard.cardNumber,
				expirationDate: data.senderCard.expirationDate,
				cvv: data.senderCard.cvv,
			})
		).data;
		data = { ...data, amount: 100000000000 };
		if (data.amount > +senderOldAccountInformation.balance) {
			let hasError;

			// try make transaction
			hasError = false;
			try {
				await this.bankService.makeTransaction({
					senderCardNumber: data.senderCard.cardNumber,
					senderExpirationDate: data.senderCard.expirationDate,
					senderCvv: data.senderCard.cvv,
					targetCardNumber: data.targetCard.cardNumber,
					amount: data.amount,
					description: data.description,
				});
				hasError = true;
			} catch (error: any) {}

			// query account information from card
			senderNewAccountInformation = (
				await this.bankService.getAccountFromCard({
					cardNumber: data.senderCard.cardNumber,
					expirationDate: data.senderCard.expirationDate,
					cvv: data.senderCard.cvv,
				})
			).data;

			// validate
			try {
				await this.bankValidation.validateMakeTransaction(
					senderOldAccountInformation,
					senderNewAccountInformation,
					targetOldAccountInformation,
					targetNewAccountInformation,
					data.amount
				);
				hasError = true;
			} catch (error: any) {}

			if (hasError)
				CustomError.builder()
					.setErrorType("Validation Error")
					.setClassName(this.constructor.name)
					.setMethodName("makeTransaction")
					.setMessage("transaction shouldn't be done as it is higher than balance")
					.build()
					.throwError();
		}
	}

	async addProvision(data: any) {
		let oldAccountInformation, newAccountInformation;

		// sunny day scenario
		oldAccountInformation = (await this.bankService.getAccountFromCard(data)).data;
		if (+oldAccountInformation.balance > data.provision) {
			// add provision
			await this.bankService.addProvision(data);

			// query account information from card
			newAccountInformation = (await this.bankService.getAccountFromCard(data)).data;

			// validate
			await this.bankValidation.validateAddProvision(oldAccountInformation, newAccountInformation, data.provision);
		}

		// scenario that when provision number is higher than balance
		oldAccountInformation = (await this.bankService.getAccountFromCard(data)).data;
		data = { ...data, provision: 100000000000 };
		if (data.provision > +oldAccountInformation.balance) {
			let hasError;

			// try add provision
			hasError = false;
			try {
				await this.bankService.addProvision(data);
				hasError = true;
			} catch (error: any) {}

			// query account information from card
			newAccountInformation = (await this.bankService.getAccountFromCard(data)).data;

			// validate
			try {
				await this.bankValidation.validateAddProvision(oldAccountInformation, newAccountInformation, data.provision);
				hasError = true;
			} catch (error: any) {}

			if (hasError)
				CustomError.builder()
					.setErrorType("Validation Error")
					.setClassName(this.constructor.name)
					.setMethodName("addprovision")
					.setMessage("provision shouldn't be added as it is higher than balance")
					.build()
					.throwError();
		}
	}

	async removeProvision(data: any) {
		let oldAccountInformation, newAccountInformation;

		// before remove provision lets make provision first
		await this.addProvision(data);

		// sunny day scenario
		oldAccountInformation = (await this.bankService.getAccountFromCard(data)).data;
		if (+oldAccountInformation.provision >= data.provision) {
			// remove provision
			await this.bankService.removeProvision(data);

			// query account information from card
			newAccountInformation = (await this.bankService.getAccountFromCard(data)).data;

			// validate
			await this.bankValidation.validateRemoveProvision(oldAccountInformation, newAccountInformation, data.provision);
		}

		// scenario that when provision number is higher than requested provision
		oldAccountInformation = (await this.bankService.getAccountFromCard(data)).data;
		data = { ...data, provision: 100000000000 };
		if (data.provision > +oldAccountInformation.provision) {
			let hasError;

			// try add provision
			hasError = false;
			try {
				await this.bankService.removeProvision(data);
				hasError = true;
			} catch (error: any) {}

			// query account information from card
			newAccountInformation = (await this.bankService.getAccountFromCard(data)).data;

			// validate
			try {
				await this.bankValidation.validateRemoveProvision(oldAccountInformation, newAccountInformation, data.provision);
				hasError = true;
			} catch (error: any) {}

			if (hasError)
				CustomError.builder()
					.setErrorType("Validation Error")
					.setClassName(this.constructor.name)
					.setMethodName("removeProvision")
					.setMessage("provision shouldn't be removed as current provision is not enough for requested provision")
					.build()
					.throwError();
		}
	}
}

export default BankFacade;
