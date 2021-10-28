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
      room: serviceProvider.room,
    });
  }

  async findByEmailAndPassword(email, password) {
    return await bauen("tb_service_provider AS serviceProvider")
      .join(
        "tb_address AS address",
        "serviceProvider.id_service_provider",
        "address.id_service_provider"
      )
      .select({
        name: "serviceProvider.name",
        city: "address.city",
        room: "serviceProvider.room",
        id: "serviceProvider.id_service_provider",
      })
      .where("serviceProvider.email", email)
      .andWhere("serviceProvider.password", password)
      .first()
      .options({ nestTables: true });
  }

  async findUserByPhoto(photo) {
    return await bauen("tb_service_provider AS serviceProvider")
      .select("serviceProvider.id_service_provider")
      .where("serviceProvider.photo", photo)
      .first();
  }

  findAll() {
    return bauen("tb_service_provider AS serviceProvider")
      .select("*")
      .whereNull("finished_at");
  }
  findAllServices() {
    return bauen("tb_service AS service")
      .select("name", "id_service")
      .whereNull("finished_at");
  }

  async updatedPhotoProfile(photo, id) {
    return await bauen("tb_service_provider AS serviceProvider")
      .update("photo", photo)
      .where("serviceProvider.id_service_provider", id);
  }
}

export default new ServiceProviderRepository();
