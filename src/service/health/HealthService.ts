import Config from "src/config/Config";
import CustomError from "src/error/CustomError";
import { AxiosServiceBuilder } from "src/util/AxiosService";

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
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .build();
      await axiosService.request();
    } catch (e: any) {
      const customError = new CustomError("Axios Error", this.constructor.name, "checkServerStatus", e);
      await customError.throwError();
    }
  }

  async checkInfo() {
    // prepare request
    const url = `${Config.baseUrl}/${this.pathPrefix}/info`;
    const method = "get";

    // send request
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .build();
      const response = await axiosService.request();
      return response;
    } catch (e: any) {
      const customError = new CustomError("Axios Error", this.constructor.name, "checkInfo", e);
      await customError.throwError();
    }
  }
}

export default HealthService;
