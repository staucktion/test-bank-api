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
    if (
      lastRow.action !==
      `Bank account information for card number "${queryData.cardNumber}" is queried.`
    )
      CustomError.builder()
        .setErrorType("Validation Error")
        .setClassName(this.constructor.name)
        .setMethodName("auditGetAccountFromCard")
        .setMessage("auditlog and query is not match")
        .build()
        .throwError();
  }
}

export default AuditLogValidation;
