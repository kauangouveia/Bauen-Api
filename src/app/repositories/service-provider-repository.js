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
      room: serviceProvider.room
    });
  }

  async findByEmailAndPassword(email, password) {
    return await bauen("tb_service_provider AS serviceProvider")
      .join(
        "tb_address AS address",
        "serviceProvider.id_service_provider",
        "address.id_service_provider"
      )
      .select({ name: "serviceProvider.name", city: "address.city", room:"serviceProvider.room" })
      .where("serviceProvider.email", email)
      .andWhere("serviceProvider.password", password)
      .first()
      .options({ nestTables: true });
  }
}

export default new ServiceProviderRepository();
