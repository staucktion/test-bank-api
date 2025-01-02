import CustomError from "src/error/CustomError";

class AuditLogValidation {
	async auditGetAccountFromCard(queryData: any, response: any) {
		// check data existence
		if (!response || !response.data || response.data.length == 0) {
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("auditGetAccountFromCard")
				.setMessage("audit log is not created.")
				.build()
				.throwError();
		}

		// get last auditlog
		const lastRow = response.data[response.data.length - 1];

		// check data field
		if (!lastRow.id || !lastRow.action || !lastRow.performed_at) {
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("auditGetAccountFromCard")
				.setMessage("audit log data field is not exist")
				.build()
				.throwError();
		}

		// compare query data and response data
		if (lastRow.action !== `Bank account information for card number "${queryData.cardNumber}" is queried.`)
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("auditGetAccountFromCard")
				.setMessage("auditlog and query is not match")
				.build()
				.throwError();
	}

	async auditMakeTransaction(data: any, response: any) {
		// check data existence
		if (!response || !response.data || response.data.length == 0) {
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("auditMakeTransaction")
				.setMessage("audit log is not created.")
				.build()
				.throwError();
		}

		// get last
		const lastRow = response.data[response.data.length - 1];

		// check data field
		if (!lastRow.id || !lastRow.action || !lastRow.performed_at) {
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("auditMakeTransaction")
				.setMessage("audit log data field is not exist")
				.build()
				.throwError();
		}

		// compare provision log and transaction data
		if (
			lastRow.action !==
			`Transaction of amount "${data.amount}" completed from account with card number: "${data.senderCardNumber}" to account with card number: "${data.targetCardNumber}".`
		)
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("auditMakeTransaction")
				.setMessage("auditlog and query is not match")
				.build()
				.throwError();
	}

	async auditAddProvision(data: any, response: any) {
		// check data existence
		if (!response || !response.data || response.data.length == 0) {
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("auditAddProvision")
				.setMessage("audit log is not created.")
				.build()
				.throwError();
		}

		// get last
		const lastRow = response.data[response.data.length - 1];

		// check data field
		if (!lastRow.id || !lastRow.action || !lastRow.performed_at) {
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("auditAddProvision")
				.setMessage("audit log data field is not exist")
				.build()
				.throwError();
		}

		// compare provision log and provision data
		if (lastRow.action !== `"${data.provision}" provision made for the account with card number: "${data.cardNumber}".`)
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("auditAddProvision")
				.setMessage("auditlog and query is not match")
				.build()
				.throwError();
	}

	async auditRemoveProvision(data: any, response: any) {
		// check data existence
		if (!response || !response.data || response.data.length == 0) {
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("auditAddProvision")
				.setMessage("audit log is not created.")
				.build()
				.throwError();
		}

		// get last
		const lastRow = response.data[response.data.length - 1];

		// check data field
		if (!lastRow.id || !lastRow.action || !lastRow.performed_at) {
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("auditRemoveProvision")
				.setMessage("audit log data field is not exist")
				.build()
				.throwError();
		}

		// compare provision log and provision data
		if (lastRow.action !== `"${data.provision}" provision removed for the account with card number: "${data.cardNumber}".`)
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("auditRemoveProvision")
				.setMessage("auditlog and query is not match")
				.build()
				.throwError();
	}
}

export default AuditLogValidation;
