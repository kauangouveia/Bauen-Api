import { bauen } from "../../config/database/connection";

class ServiceProviderRepository {
  async create(serviceProvider) {
    await bauen("tb_service_provider").insert(serviceProvider);
  }
  async findByEmailAndPassword(email, password) {
    const user = await bauen("tb_service_provider")
      .select("profile_photo", "id_service_provider")
      .where("email", email)
      .andWhere("password", password)
      .first();
    return user;
  }
}

export default new ServiceProviderRepository();
