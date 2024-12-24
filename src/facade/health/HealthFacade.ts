import HealthService from "src/service/health/HealthService";

const healthService = new HealthService();

class HealthFacade {
  async checkServerStatus() {
    // perform operation
    await healthService.checkServerStatus();
  }

  async checkInfo() {
    // perform operation
    const response = await healthService.checkInfo();


    // todo check backend tarafında data.data yerine direkt olarak datayı dönmem lazım
    // check data field
    if (
      response.data.data.description === undefined ||
      response.data.data.name === undefined
    )
      throw new Error(`app informations invalid`);
  }
}

export default HealthFacade;
