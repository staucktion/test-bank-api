import BankService from "src/service/bank/BankService";
import BankValidation from "src/validation/bank/BankValidation";

class BankFacade {
  private bankService: BankService;
  private bankValidation: BankValidation;

  constructor() {
    this.bankService = new BankService();
    this.bankValidation = new BankValidation();
  }
  async getAccountFromCard(data: any) {
    // query account information from card
    const response = await this.bankService.getAccountFromCard(data);

    // make validation
    await this.bankValidation.getAccountFromCard(response);
  }
}

export default BankFacade;
