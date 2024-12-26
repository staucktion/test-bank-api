import addContext from "mochawesome/addContext";
import Config from "src/config/Config";
import AuditLogFacade from "src/facade/auditlog/AuditLogFacade";

const auditLogFacade = new AuditLogFacade();

before(async () => {});

describe("Audit Log Tests [auditlog.spec]", function () {
  it("[GET] /auditlog/", async function () {
    // add context information
    addContext(this, "Get audit logs for the account query.");

    // prepare data
    const data = Config.card;

    // perform operation
    await auditLogFacade.auditGetAccountFromCard(data);
  });
});