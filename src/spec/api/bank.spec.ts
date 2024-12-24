import addContext from "mochawesome/addContext";
import BankFacade from "src/facade/api/BankFacade";

const bankFacade = new BankFacade();

before(async () => {});

describe("Bank Tests [bank.spec]", function () {
  it("[POST] /bank/account/", async function () {
    // add context information
    addContext(this, "Get account information from card details.");

    // perform operation
    await bankFacade.getAccountFromCard();
  });
});
