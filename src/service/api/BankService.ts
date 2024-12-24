import Config from "src/config/Config";
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
    } catch (e: any) {
      throw new Error(
        `${
          this.constructor.name
        }.getAccountFromCard:: Axios error: ${JSON.stringify(
          e.response.data,
          null,
          2
        )}`
      );
    }
  }
}

export default BankService;
