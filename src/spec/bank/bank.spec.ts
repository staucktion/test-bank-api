import addContext from "mochawesome/addContext";
import Config from "src/config/Config";
import BankFacade from "src/facade/bank/BankFacade";

const bankFacade = new BankFacade();

before(async () => {});

describe("Bank Tests", function () {
	it("[BU1, BU3][POST] /accounts", async function () {
		// add context information
		addContext(this, "Get account information from card details.");

		// prepare data
		const data = Config.card;

		// perform operation
		await bankFacade.getAccountFromCard(data);
	});

	it("[BU2, BU3][POST] /transactions", async function () {
		// add context information
		addContext(this, "Make a transaction.");

		// prepare data
		const data = { senderCard: Config.card, targetCard: Config.targetCard, amount: 500 };

		// perform operation
		await bankFacade.makeTransaction(data);
	});

	it("[BU3, BU4][PUT] /provisions/add", async function () {
		// add context information
		addContext(this, "Make a provision.");

		// prepare data
		const data = { ...Config.card, provision: 700 };

		// perform operation
		await bankFacade.addProvision(data);
	});

	it("[BU3, BU4][PUT] /provisions/remove", async function () {
		// add context information
		addContext(this, "Remove provision.");

		// prepare data
		const data = { ...Config.card, provision: 300 };

		// perform operation
		await bankFacade.removeProvision(data);
	});
});
