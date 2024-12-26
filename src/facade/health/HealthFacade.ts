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
    await this.healthService.checkServerStatus();
  }

  async checkInfo() {
    // perform operation
    const response = await this.healthService.checkInfo();

    // make validation
    await this.healthValidation.checkInfo(response);
  }
}

export default HealthFacade;
