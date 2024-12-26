import BankService from "src/service/bank/BankService";
import BankValidation from "src/validation/bank/BankValidation";

const bankValidation = new BankValidation();
const bankService = new BankService();

class BankFacade {
  async getAccountFromCard(data: any) {
    // query account information from card
    const response = await bankService.getAccountFromCard(data);

    // make validation
    await bankValidation.getAccountFromCard(response);
  }
}

export default BankFacade;
