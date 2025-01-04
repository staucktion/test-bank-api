import addContext from "mochawesome/addContext";
import HealthFacade from "src/facade/health/HealthFacade";

const healthFacade = new HealthFacade();

describe("Health Check Tests", function () {
	it("[GET] /health", async function () {
		// add context information
		addContext(this, "Checking server status.");

		// perform operation
		await healthFacade.checkServerStatus();
	});

	it("[GET] /health/info", async function () {
		// add context information
		addContext(this, "Checking app information.");

		// perform operation
		await healthFacade.checkInfo();
	});
});
