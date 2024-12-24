import addContext from "mochawesome/addContext";
import HealthCheckFacade from "src/facade/health/HealthCheckFacade";

const healthCheckFacade = new HealthCheckFacade();

describe("Health Check Tests [health-check.spec]", function () {
  it("[GET] /health", async function () {
    // add context information
    addContext(this, "Checking server status.");

    // perform operation
    await healthCheckFacade.checkServerStatus();
  });

  it("[GET] /health/info", async function () {
    // add context information
    addContext(this, "Checking app information.");

    // perform operation
    await healthCheckFacade.checkInfo();
  });
});
