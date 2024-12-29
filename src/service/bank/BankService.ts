import Config from "src/config/Config";
import CustomError from "src/error/CustomError";
import AxiosService from "src/util/AxiosService";

class BankService {
	async getAccountFromCard(data) {
		// prepare request
		const url = `${Config.baseUrl}/accounts`;
		const method = "post";

		// send request
		try {
			const response = await AxiosService.builder().setUrl(url).setMethod(method).setData(data).build().request();
			return response;
		} catch (error: any) {
			CustomError.builder()
				.setErrorType("Axios Error")
				.setClassName(this.constructor.name)
				.setMethodName("getAccountFromCard")
				.setError(error)
				.build()
				.throwError();
		}
	}

	async addProvision(data) {
		// prepare request
		const url = `${Config.baseUrl}/provisions/add`;
		const method = "put";

		// send request
		try {
			const response = await AxiosService.builder().setUrl(url).setMethod(method).setData(data).build().request();
			return response;
		} catch (error: any) {
			CustomError.builder()
				.setErrorType("Axios Error")
				.setClassName(this.constructor.name)
				.setMethodName("addprovision")
				.setError(error)
				.build()
				.throwError();
		}
	}
}

export default BankService;
