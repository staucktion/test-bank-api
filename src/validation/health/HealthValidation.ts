import CustomError from "src/error/CustomError";

class HealthValidation {
  async checkInfo(response: any) {
    // check data field
    if (
      response.data.description === undefined ||
      response.data.modea === undefined
    ) {
      const customError = new CustomError("Validation Error", this.constructor.name, "checkInfo", null, "field not exist");
      customError.throwError();
    }
  }
}

export default HealthValidation;
