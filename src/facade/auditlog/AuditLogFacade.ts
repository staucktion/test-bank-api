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
		await this.bankFacade.getAccountFromCard({
			cardNumber: queryData.senderCard.cardNumber,
			expirationDate: queryData.senderCard.expirationDate,
			cvv: queryData.senderCard.cvv,
		});

		// query auditlogs
		const response = await this.auditLogService.getAuditLog();

		// make validation
		await this.auditLogValidation.auditGetAccountFromCard(
			{
				cardNumber: queryData.senderCard.cardNumber,
				expirationDate: queryData.senderCard.expirationDate,
				cvv: queryData.senderCard.cvv,
			},
			response
		);
	}

	async makeTransaction(data: any) {
		// make transaction
		await this.bankService.makeTransaction({
			senderCardNumber: data.senderCard.cardNumber,
			senderExpirationDate: data.senderCard.expirationDate,
			senderCvv: data.senderCard.cvv,
			targetCardNumber: data.targetCard.cardNumber,
			amount: data.amount,
			description: data.description,
		});

		// query auditlogs
		const response = await this.auditLogService.getAuditLog();

		// make validation
		await this.auditLogValidation.auditMakeTransaction(
			{
				senderCardNumber: data.senderCard.cardNumber,
				targetCardNumber: data.targetCard.cardNumber,
				amount: data.amount,
			},
			response
		);
	}

	async addProvision(data: any) {
		// add provision
		await this.bankService.addProvision({
			cardNumber: data.senderCard.cardNumber,
			expirationDate: data.senderCard.expirationDate,
			cvv: data.senderCard.cvv,
			provision: data.provision,
		});

		// query auditlogs
		const response = await this.auditLogService.getAuditLog();

		// make validation
		await this.auditLogValidation.auditAddProvision(
			{
				cardNumber: data.senderCard.cardNumber,
				expirationDate: data.senderCard.expirationDate,
				cvv: data.senderCard.cvv,
				provision: data.provision,
			},
			response
		);
	}

	async removeProvision(data: any) {
		// add provision first
		await this.bankService.addProvision({
			cardNumber: data.senderCard.cardNumber,
			expirationDate: data.senderCard.expirationDate,
			cvv: data.senderCard.cvv,
			provision: data.provision,
		});

		// remove provision first
		await this.bankService.removeProvision({
			cardNumber: data.senderCard.cardNumber,
			expirationDate: data.senderCard.expirationDate,
			cvv: data.senderCard.cvv,
			provision: data.provision,
		});

		// query auditlogs
		const response = await this.auditLogService.getAuditLog();

		// make validation
		await this.auditLogValidation.auditRemoveProvision(
			{
				cardNumber: data.senderCard.cardNumber,
				expirationDate: data.senderCard.expirationDate,
				cvv: data.senderCard.cvv,
				provision: data.provision,
			},
			response
		);
	}
}

export default AuditLogFacade;
