import CustomError from "src/error/CustomError";

class BankValidation {
	async getAccountFromCard(response: any) {
		// check data field
		if (response?.data?.balance === undefined || response?.data?.provision === undefined || response?.data?.cards === undefined) {
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("getAccountFromCard")
				.setMessage("response data field is not exist")
				.build()
				.throwError();
		}
	}

	async validateAddProvision(oldAccountInformation: any, newAccountInformation: any, provision: any) {
		// cast type
		const oldBalance = +oldAccountInformation.balance;
		const newBalance = +newAccountInformation.balance;
		const oldProvision = +oldAccountInformation.provision;
		const newProvision = +newAccountInformation.provision;

		// check new balance
		if (oldBalance - provision != newBalance)
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("validateAddProvision")
				.setMessage("after add provision new balance is not updated as expected")
				.build()
				.throwError();

		// check new provision
		if (newProvision != oldProvision + provision)
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("validateAddProvision")
				.setMessage("after add provision new provision is not updated as expected")
				.build()
				.throwError();
	}

	async validateRemoveProvision(oldAccountInformation: any, newAccountInformation: any, provision: any) {
		// cast type
		const oldBalance = +oldAccountInformation.balance;
		const newBalance = +newAccountInformation.balance;
		const oldProvision = +oldAccountInformation.provision;
		const newProvision = +newAccountInformation.provision;

		// check new balance
		if (newBalance != oldBalance + provision)
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("validateAddProvision")
				.setMessage("after remove provision new balance is not updated as expected")
				.build()
				.throwError();

		// check new provision
		if (newProvision != oldProvision - provision)
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("validateAddProvision")
				.setMessage("after remove provision new provision is not updated as expected")
				.build()
				.throwError();
	}
}

export default BankValidation;
