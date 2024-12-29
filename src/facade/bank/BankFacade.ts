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
					.setMessage("provision shouldnt be added as it is higher than balance, but updated")
					.build()
					.throwError();
		}
	}
}

export default BankFacade;
