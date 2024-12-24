import CustomError from "src/error/CustomError";

class BankValidation {
  async getAccountFromCard(response: any) {
    // check data field
    if (
      response?.data?.balance === undefined ||
      response?.data?.provision === undefined ||
      response?.data?.cards === undefined
    ) {
      CustomError.builder()
        .setErrorType("Validation Error")
        .setClassName(this.constructor.name)
        .setMethodName("getAccountFromCard")
        .setMessage("response data field is not exist")
        .build()
        .throwError();
    }
  }
}

export default BankValidation;
