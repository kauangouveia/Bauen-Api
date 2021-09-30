import { bauen } from "../../config/database/connection";

class ServiceProviderRepository {
  async create(serviceProvider) {
    await bauen("tb_service_provider").insert(serviceProvider);
  }
}

export default new ServiceProviderRepository();
