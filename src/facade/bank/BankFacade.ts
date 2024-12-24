import Config from "src/config/Config";
import BankService from "src/service/bank/BankService";

const bankService = new BankService();
class BankFacade {
  async getAccountFromCard() {
    // prepare data
    const data = Config.card;

    // get account information
    const accountInformation = (await bankService.getAccountFromCard(data)).data;

    // validate
    console.log("accountInformation");
    console.log(accountInformation);
  }
}

export default BankFacade;
