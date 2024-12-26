import AuditLogService from "src/service/auditlog/AuditLogService";
import AuditLogValidation from "src/validation/auditlog/AuditLogValidation";
import BankFacade from "../bank/BankFacade";

const auditLogService = new AuditLogService();
const auditLogValidation = new AuditLogValidation();
const bankFacade = new BankFacade();

class AuditLogFacade {
  async auditGetAccountFromCard(queryData: any) {
    // query for account information
    await bankFacade.getAccountFromCard(queryData);

    // query auditlogs
    const response = await auditLogService.getAuditLog();

    // make validation
    await auditLogValidation.auditGetAccountFromCard(queryData, response);
  }
}

export default AuditLogFacade;
