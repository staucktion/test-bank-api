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

	async addprovision(data: any) {
		let oldAccountInformation, newAccountInformation, provision;

		// sunny day scenario
		oldAccountInformation = (await this.bankService.getAccountFromCard(data)).data;
		provision = 500;
		data = { ...data, provision };
		if (+oldAccountInformation.balance > provision) {
			// add provision
			await this.bankService.addprovision(data);

			// query account information from card
			newAccountInformation = (await this.bankService.getAccountFromCard(data)).data;

			// validate
			await this.bankValidation.validateAddProvision(oldAccountInformation, newAccountInformation, provision);
		}

		// scenario that when provision number is higher than balance
		oldAccountInformation = (await this.bankService.getAccountFromCard(data)).data;
		provision = 1000000000000;
		data = { ...data, provision };
		if (provision > +oldAccountInformation.balance) {
			let hasError;

			// try add provision
			hasError = false;
			try {
				await this.bankService.addprovision(data);
				hasError = true;
			} catch (error: any) {}

			// query account information from card
			newAccountInformation = (await this.bankService.getAccountFromCard(data)).data;

			// validate
			try {
				await this.bankValidation.validateAddProvision(oldAccountInformation, newAccountInformation, provision);
				hasError = true;
			} catch (error: any) {}

			if (hasError)
				CustomError.builder()
					.setErrorType("Validation Error")
					.setClassName(this.constructor.name)
					.setMethodName("addprovision")
					.setMessage("provision shouldnt be added as it is higher than balance, but updated")
					.build()
					.throwError();
		}
	}
}

export default BankFacade;
