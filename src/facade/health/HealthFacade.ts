import Config from "src/config/Config";
import CustomError from "src/error/CustomError";
import HealthService from "src/service/health/HealthService";
import HealthValidation from "src/validation/health/HealthValidation";

class HealthFacade {
	private healthService: HealthService;
	private healthValidation: HealthValidation;

	constructor() {
		this.healthService = new HealthService();
		this.healthValidation = new HealthValidation();
	}

	async checkServerStatus() {
		// perform operation
		try {
			await this.healthService.checkServerStatus();
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}
	}

	async checkInfo() {
		try {
			// perform operation
			const response = await this.healthService.checkInfo();

			// make validation
			await this.healthValidation.checkInfo(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}
	}
}

export default HealthFacade;
