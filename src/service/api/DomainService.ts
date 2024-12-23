import Config from "src/config/Config";
import CommonUtil from "src/util/CommonUtil";
import CoreEntityService from "./core/CoreEntityService";

class DomainService extends CoreEntityService {
  constructor() {
    super("domains");
  }

  async getDefaultCreateData() {
    return {
      name: `${Config.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };
  }
}

export default DomainService;
