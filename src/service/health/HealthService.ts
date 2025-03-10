import Config from "src/config/Config";
import CustomError from "src/error/CustomError";
import AxiosService from "src/util/AxiosService";

class HealthService {
	private pathPrefix: string;

	constructor() {
		this.pathPrefix = "health";
	}

	async checkServerStatus() {
		// prepare request
		const url = `${Config.baseUrl}/${this.pathPrefix}`;
		const method = "get";

		// send request
		try {
			await AxiosService.builder().setUrl(url).setMethod(method).build().request();
		} catch (error: any) {
			CustomError.builder().setErrorType("Axios Error").setStatusCode(error.statusCode).setMessage("Axios cannot perfrom http request.").setExternalMessage(error.message).build().throwError();
		}
	}

	async checkInfo() {
		// prepare request
		const url = `${Config.baseUrl}/${this.pathPrefix}/info`;
		const method = "get";

		// send request
		try {
			const response = await AxiosService.builder().setUrl(url).setMethod(method).build().request();
			return response;
		} catch (error: any) {
			CustomError.builder().setErrorType("Axios Error").setStatusCode(error.statusCode).setMessage("Axios cannot perfrom http request.").setExternalMessage(error.message).build().throwError();
		}
	}
}

export default HealthService;
