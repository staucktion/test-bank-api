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
    } catch (error: any) {
      CustomError.builder()
        .setErrorType("Axios Error")
        .setClassName(this.constructor.name)
        .setMethodName("checkServerStatus")
        .setError(error)
        .build()
        .throwError();
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
    } catch (error: any) {
      CustomError.builder()
        .setErrorType("Axios Error")
        .setClassName(this.constructor.name)
        .setMethodName("checkInfo")
        .setError(error)
        .build()
        .throwError();
    }
  }
}

export default HealthService;
