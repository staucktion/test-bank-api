import HealthService from "src/service/health/HealthService";
import HealthValidation from "src/validation/health/HealthValidation";

const healthService = new HealthService();
const healthValidation = new HealthValidation();

class HealthFacade {
  async checkServerStatus() {
    // perform operation
    await healthService.checkServerStatus();
  }

  async checkInfo() {
    // perform operation
    const response = await healthService.checkInfo();

    // make validation
    await healthValidation.checkInfo(response);
  }
}

export default HealthFacade;
