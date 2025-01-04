import Config from "src/config/Config";
import CustomError from "src/error/CustomError";
import AxiosService from "src/util/AxiosService";

class AuditLogService {
	async getAuditLog() {
		// prepare request
		const url = `${Config.baseUrl}/auditlogs`;
		const method = "get";

		// send request
		try {
			const response = await AxiosService.builder().setUrl(url).setMethod(method).build().request();
			return response;
		} catch (error: any) {
			let status;
			if (error?.response?.status) status = error.response.status;
			CustomError.builder().setStatusCode(status).setErrorType("Axios Error").setMessage("Axios error.").build().throwError();
		}
	}
}

export default AuditLogService;
