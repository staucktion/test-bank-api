import CustomError from "src/error/CustomError";

class HealthValidation {
	async checkInfo(response: any) {
		// check data field
		if (response?.data?.description === undefined || response?.data?.mode === undefined) {
			CustomError.builder()
				.setErrorType("Validation Error")
				.setClassName(this.constructor.name)
				.setMethodName("checkInfo")
				.setMessage("response data field is not exist")
				.build()
				.throwError();
		}
	}
}

export default HealthValidation;
