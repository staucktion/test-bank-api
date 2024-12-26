import AuditLogService from "src/service/auditlog/AuditLogService";
import AuditLogValidation from "src/validation/auditlog/AuditLogValidation";
import BankFacade from "../bank/BankFacade";

class AuditLogFacade {
  private auditLogService: AuditLogService;
  private auditLogValidation: AuditLogValidation;
  private bankFacade: BankFacade;

  constructor() {
    this.auditLogService = new AuditLogService();
    this.auditLogValidation = new AuditLogValidation();
    this.bankFacade = new BankFacade();
  }

  async auditGetAccountFromCard(queryData: any) {
    // query for account information
    await this.bankFacade.getAccountFromCard(queryData);

    // query auditlogs
    const response = await this.auditLogService.getAuditLog();

    // make validation
    await this.auditLogValidation.auditGetAccountFromCard(queryData, response);
  }
}

export default AuditLogFacade;
