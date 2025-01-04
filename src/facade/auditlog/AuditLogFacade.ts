import Config from "src/config/Config";
import CustomError from "src/error/CustomError";
import AuditLogService from "src/service/auditlog/AuditLogService";
import BankService from "src/service/bank/BankService";
import AuditLogValidation from "src/validation/auditlog/AuditLogValidation";
import BankFacade from "../bank/BankFacade";

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
		try {
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
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}
	}

	async makeTransaction(data: any) {
		try {
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
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}
	}

	async addProvision(data: any) {
		try {
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
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}
	}

	async removeProvision(data: any) {
		try {
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
		} catch (error: any) {
			if (error instanceof CustomError) {
				if (Config.explicitErrorLog) error.log();
				error.throwError();
			}
		}
	}
}

export default AuditLogFacade;
