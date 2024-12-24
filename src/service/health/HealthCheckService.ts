import Config from "src/config/Config";
import { AxiosServiceBuilder } from "src/util/AxiosService";

class HealthCheckService {
  private prefix: string;
  constructor() {
    this.prefix = "health";
  }

  async checkServerStatus() {
    // prepare request
    const url = `${Config.baseUrl}/${this.prefix}`;
    const method = "get";

    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .build();
      await axiosService.request();
    } catch (e: any) {
      throw new Error(
        `${
          this.constructor.name
        }.checkServerStatus:: Axios error: ${JSON.stringify(
          e.response.data,
          null,
          2
        )}`
      );
    }
  }
  async checkInfo() {
    // prepare request
    const url = `${Config.baseUrl}/${this.prefix}/info`;
    const method = "get";

    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .build();
      const response = await axiosService.request();
      return response;
    } catch (e: any) {
      throw new Error(
        `${
          this.constructor.name
        }.checkAppInformation:: Axios error: ${JSON.stringify(
          e.response.data,
          null,
          2
        )}`
      );
    }
  }
}

export default HealthCheckService;
