import AuditLogService from "src/service/auditlog/AuditLogService";
import AuditLogValidation from "src/validation/auditlog/AuditLogValidation";
import BankFacade from "../bank/BankFacade";
import BankService from "src/service/bank/BankService";

class AuditLogFacade {
	private auditLogService: AuditLogService;
	private auditLogValidation: AuditLogValidation;
	private bankFacade: BankFacade;
	private bankService: BankService;

	constructor() {
		this.auditLogService = new AuditLogService();
		this.auditLogValidation = new AuditLogValidation();
		this.bankFacade = new BankFacade();
		this.bankService = new BankService();
	}

	async auditGetAccountFromCard(queryData: any) {
		// query for account information
		await this.bankFacade.getAccountFromCard(queryData);

		// query auditlogs
		const response = await this.auditLogService.getAuditLog();

		// make validation
		await this.auditLogValidation.auditGetAccountFromCard(queryData, response);
	}

	async addProvision(data: any) {
		// add provision
		await this.bankService.addProvision(data);

		// query auditlogs
		const response = await this.auditLogService.getAuditLog();

		// make validation
		await this.auditLogValidation.auditAddProvision(data, response);
	}
}

export default AuditLogFacade;
