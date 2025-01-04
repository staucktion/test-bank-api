import CustomError from "src/error/CustomError";
import ValidationUtil from "src/util/ValidationUtil";

class BankValidation {
	async getAccountFromCard(response: any) {
		const requiredFields: string[] = ["balance", "provision", "cards"];

		// validate response
		try {
			ValidationUtil.checkObjectExistence(response);
			ValidationUtil.checkObjectExistence(response.data);
		} catch (error: any) {
			if (error instanceof CustomError) CustomError.builder().setErrorType("Validation Error").setMessage("Response is not exist.").build().throwError();
		}

		// validate required fields
		try {
			ValidationUtil.checkRequiredFields(requiredFields, response.data);
		} catch (error: any) {
			if (error instanceof CustomError) CustomError.builder().setErrorType("Validation Error").setMessage(`Response data invalid. ${error.getBody().externalMessage}`).build().throwError();
		}
	}

	async validateMakeTransaction(senderOldAccountInformation: any, senderNewAccountInformation: any, targetOldAccountInformation: any, targetNewAccountInformation: any, amount: number) {
		// cast type
		const senderOldBalance = +senderOldAccountInformation.balance;
		const senderNewBalance = +senderNewAccountInformation.balance;
		const targetOldBalance = +targetOldAccountInformation.balance;
		const targetNewBalance = +targetNewAccountInformation.balance;

		// check new balance of sender
		if (senderOldBalance - amount != senderNewBalance)
			CustomError.builder().setErrorType("Validation Error").setMessage("After make transaction sender new balance is not updated as expected.").build().throwError();

		// check new balance of target
		if (targetOldBalance + amount != targetNewBalance)
			CustomError.builder().setErrorType("Validation Error").setMessage("After make transaction target new balance is not updated as expected.").build().throwError();
	}

	async validateAddProvision(oldAccountInformation: any, newAccountInformation: any, provision: any) {
		// cast type
		const oldBalance = +oldAccountInformation.balance;
		const newBalance = +newAccountInformation.balance;
		const oldProvision = +oldAccountInformation.provision;
		const newProvision = +newAccountInformation.provision;

		// check new balance
		if (oldBalance - provision != newBalance) CustomError.builder().setErrorType("Validation Error").setMessage("After add provision new balance is not updated as expected.").build().throwError();

		// check new provision
		if (newProvision != oldProvision + provision)
			CustomError.builder().setErrorType("Validation Error").setMessage("After add provision new provision is not updated as expected.").build().throwError();
	}

	async validateRemoveProvision(oldAccountInformation: any, newAccountInformation: any, provision: any) {
		// cast type
		const oldBalance = +oldAccountInformation.balance;
		const newBalance = +newAccountInformation.balance;
		const oldProvision = +oldAccountInformation.provision;
		const newProvision = +newAccountInformation.provision;

		// check new balance
		if (newBalance != oldBalance + provision)
			CustomError.builder().setErrorType("Validation Error").setMessage("After remove provision new balance is not updated as expected.").build().throwError();

		// check new provision
		if (newProvision != oldProvision - provision)
			CustomError.builder().setErrorType("Validation Error").setMessage("After remove provision new provision is not updated as expected.").build().throwError();
	}
}

export default BankValidation;
