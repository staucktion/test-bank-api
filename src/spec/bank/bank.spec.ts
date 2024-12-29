import addContext from "mochawesome/addContext";
import Config from "src/config/Config";
import BankFacade from "src/facade/bank/BankFacade";

const bankFacade = new BankFacade();

before(async () => {});

describe("Bank Tests [bank.spec]", function () {
	it("[POST] /accounts", async function () {
		// add context information
		addContext(this, "Get account information from card details.");

		// prepare data
		const data = Config.card;

		// perform operation
		await bankFacade.getAccountFromCard(data);
	});

	it("[PUT] /provisions/add", async function () {
		// add context information
		addContext(this, "Make a provision.");

		// prepare data
		const data = Config.card;

		// perform operation
		await bankFacade.addprovision(data);
	});
});
