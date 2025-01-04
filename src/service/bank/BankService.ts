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
			let status;
			if (error?.response?.status) status = error.response.status;
			CustomError.builder().setStatusCode(status).setErrorType("Axios Error").setMessage("Axios error.").build().throwError();
		}
	}

	async makeTransaction(data) {
		// prepare request
		const url = `${Config.baseUrl}/transactions`;
		const method = "post";

		// send request
		try {
			const response = await AxiosService.builder().setUrl(url).setMethod(method).setData(data).build().request();
			return response;
		} catch (error: any) {
			let status;
			if (error?.response?.status) status = error.response.status;
			CustomError.builder().setStatusCode(status).setErrorType("Axios Error").setMessage("Axios error.").build().throwError();
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
			let status;
			if (error?.response?.status) status = error.response.status;
			CustomError.builder().setStatusCode(status).setErrorType("Axios Error").setMessage("Axios error.").build().throwError();
		}
	}

	async removeProvision(data) {
		// prepare request
		const url = `${Config.baseUrl}/provisions/remove`;
		const method = "put";

		// send request
		try {
			const response = await AxiosService.builder().setUrl(url).setMethod(method).setData(data).build().request();
			return response;
		} catch (error: any) {
			let status;
			if (error?.response?.status) status = error.response.status;
			CustomError.builder().setStatusCode(status).setErrorType("Axios Error").setMessage("Axios error.").build().throwError();
		}
	}
}

export default BankService;
