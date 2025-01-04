import CustomError from "src/error/CustomError";
import ValidationUtil from "src/util/ValidationUtil";

class HealthValidation {
	async checkInfo(response: any) {
		const requiredFields: string[] = ["description", "mode"];

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
}

export default HealthValidation;
