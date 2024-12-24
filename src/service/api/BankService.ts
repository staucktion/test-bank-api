import Config from "src/config/Config";
import CustomError from "src/error/CustomError";
import { AxiosServiceBuilder } from "src/util/AxiosService";

class BankService {
  async getAccountFromCard(data) {
    // prepare request
    const url = `${Config.baseUrl}/bank/account/`;
    const method = "post";

    // send request
    try {
      const axiosServiceBuilder = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setData(data);
      // todo  bak bakalım direkt olarak build edebliyor muyuz.
      const axiosService = axiosServiceBuilder.build();
      const response = await axiosService.request();

      console.log(response);

      return "ahmet";
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
}

export default BankService;
