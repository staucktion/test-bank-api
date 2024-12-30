import addContext from "mochawesome/addContext";
import Config from "src/config/Config";
import AuditLogFacade from "src/facade/auditlog/AuditLogFacade";

const auditLogFacade = new AuditLogFacade();

before(async () => {});

describe("Audit Log Tests", function () {
	it("[GET] /auditlogs", async function () {
		// add context information
		addContext(this, "Get audit logs for the account query.");

		// prepare data
		const data = { ...Config.card, provision: 800 };

		// perform operation
		await auditLogFacade.auditGetAccountFromCard(data);
		await auditLogFacade.addProvision(data);
		await auditLogFacade.removeProvision(data);
	});
});
