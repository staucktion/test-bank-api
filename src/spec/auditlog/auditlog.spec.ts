import addContext from "mochawesome/addContext";
import Config from "src/config/Config";
import AuditLogFacade from "src/facade/auditlog/AuditLogFacade";

const auditLogFacade = new AuditLogFacade();

before(async () => {});

describe("Audit Log Tests", function () {
	it("[BU1, BU2, BU3, BU4][GET] /auditlogs", async function () {
		// add context information
		addContext(this, "Get audit logs for the account query.");

		// prepare data
		const data = {
			senderCard: Config.senderCard,
			targetCard: Config.targetCard,
			provision: 800,
			amount: 1000,
			description: "automation test description",
		};

		// perform operation
		await auditLogFacade.auditGetAccountFromCard(data);
		await auditLogFacade.addProvision(data);
		await auditLogFacade.removeProvision(data);
		await auditLogFacade.makeTransaction(data);
	});
});
