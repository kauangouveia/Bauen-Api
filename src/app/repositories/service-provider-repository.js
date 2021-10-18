import { bauen } from "../../config/database/connection";

class ServiceProviderRepository {
  async create(serviceProvider) {
    return await bauen("tb_service_provider").insert({
      phone: serviceProvider.phone,
      name: serviceProvider.name,
      rg: serviceProvider.rg,
      cpf: serviceProvider.cpf,
      password: serviceProvider.password,
      email: serviceProvider.email,
      born: serviceProvider.born,
    });
  }

  async findByEmailAndPassword(email, password) {
    const user = await bauen("tb_service_provider")
      .select("id_service_provider")
      .where("email", email)
      .andWhere("password", password)
      .first();
    return user;
  }
}

export default new ServiceProviderRepository();
