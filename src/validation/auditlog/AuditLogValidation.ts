import CustomError from "src/error/CustomError";
import ValidationUtil from "src/util/ValidationUtil";

class AuditLogValidation {
	async auditGetAccountFromCard(queryData: any, response: any) {
		// validate response
		try {
			ValidationUtil.checkObjectExistence(response);
			ValidationUtil.checkObjectExistence(response.data);
			ValidationUtil.checkArrayData(response.data);
		} catch (error: any) {
			if (error instanceof CustomError) CustomError.builder().setErrorType("Validation Error").setMessage("Response data is not exist.").build().throwError();
		}

		// get last auditlog
		const lastRow = response.data[response.data.length - 1];

		// check data field
		const requiredFields = ["id", "action", "performed_at"];
		try {
			ValidationUtil.checkRequiredFields(requiredFields, lastRow);
		} catch (error: any) {
			if (error instanceof CustomError) CustomError.builder().setErrorType("Validation Error").setMessage(`Response data invalid. ${error.getBody().externalMessage}`).build().throwError();
		}

		// compare query data and response data
		if (lastRow.action !== `Bank account information for card number "${queryData.cardNumber}" is queried.`)
			CustomError.builder().setErrorType("Validation Error").setMessage("Auditlog and query is not match.").build().throwError();
	}

	async auditMakeTransaction(data: any, response: any) {
		// validate response
		try {
			ValidationUtil.checkObjectExistence(response);
			ValidationUtil.checkObjectExistence(response.data);
			ValidationUtil.checkArrayData(response.data);
		} catch (error: any) {
			if (error instanceof CustomError) CustomError.builder().setErrorType("Validation Error").setMessage("Response data is not exist.").build().throwError();
		}

		// get last auditlog
		const lastRow = response.data[response.data.length - 1];

		// check data field
		const requiredFields = ["id", "action", "performed_at"];
		try {
			ValidationUtil.checkRequiredFields(requiredFields, lastRow);
		} catch (error: any) {
			if (error instanceof CustomError) CustomError.builder().setErrorType("Validation Error").setMessage(`Response data invalid. ${error.getBody().externalMessage}`).build().throwError();
		}

		// compare provision log and transaction data
		if (lastRow.action !== `Transaction of amount "${data.amount}" completed from account with card number: "${data.senderCardNumber}" to account with card number: "${data.targetCardNumber}".`)
			CustomError.builder().setErrorType("Validation Error").setMessage("Auditlog and query is not match.").build().throwError();
	}

	async auditAddProvision(data: any, response: any) {
		// validate response
		try {
			ValidationUtil.checkObjectExistence(response);
			ValidationUtil.checkObjectExistence(response.data);
			ValidationUtil.checkArrayData(response.data);
		} catch (error: any) {
			if (error instanceof CustomError) CustomError.builder().setErrorType("Validation Error").setMessage("Response data is not exist.").build().throwError();
		}

		// get last auditlog
		const lastRow = response.data[response.data.length - 1];

		// check data field
		const requiredFields = ["id", "action", "performed_at"];
		try {
			ValidationUtil.checkRequiredFields(requiredFields, lastRow);
		} catch (error: any) {
			if (error instanceof CustomError) CustomError.builder().setErrorType("Validation Error").setMessage(`Response data invalid. ${error.getBody().externalMessage}`).build().throwError();
		}

		// compare provision log and provision data
		if (lastRow.action !== `"${data.provision}" provision made for the account with card number: "${data.cardNumber}".`)
			CustomError.builder().setErrorType("Validation Error").setMessage("Auditlog and query is not match.").build().throwError();
	}

	async auditRemoveProvision(data: any, response: any) {
		// validate response
		try {
			ValidationUtil.checkObjectExistence(response);
			ValidationUtil.checkObjectExistence(response.data);
			ValidationUtil.checkArrayData(response.data);
		} catch (error: any) {
			if (error instanceof CustomError) CustomError.builder().setErrorType("Validation Error").setMessage("Response data is not exist.").build().throwError();
		}

		// get last auditlog
		const lastRow = response.data[response.data.length - 1];

		// check data field
		const requiredFields = ["id", "action", "performed_at"];
		try {
			ValidationUtil.checkRequiredFields(requiredFields, lastRow);
		} catch (error: any) {
			if (error instanceof CustomError) CustomError.builder().setErrorType("Validation Error").setMessage(`Response data invalid. ${error.getBody().externalMessage}`).build().throwError();
		}

		// compare provision log and provision data
		if (lastRow.action !== `"${data.provision}" provision removed for the account with card number: "${data.cardNumber}".`)
			CustomError.builder().setErrorType("Validation Error").setMessage("Auditlog and query is not match.").build().throwError();
	}
}

export default AuditLogValidation;
