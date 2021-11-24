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
      .join(
        "tb_service_provider_service as serviceProviderService",
        "serviceProvider.id_service_provider",
        "serviceProviderService.id_service_provider"
      )
      .join(
        "tb_service as service",
        "service.id_service",
        "serviceProviderService.id_service"
      )
      .select("*");
  }

  findAllServices() {
    return bauen("tb_service AS service")
      .select("nameService", "id_service")
      .whereNull("finished_at");
  }

  async updatedPhotoProfile(photo, id) {
    return await bauen("tb_service_provider AS serviceProvider")
      .update("photo", photo)
      .where("serviceProvider.id_service_provider", id);
  }

  async findInformations(id) {
    return await bauen("tb_service_provider AS serviceProvider")
      .select("photo")
      .where("serviceProvider.id_service_provider", id);
  }
  async findServiceByName(nameServices) {
    return await bauen("tb_service AS service")
      .select("id_service")
      .where("nameService", nameServices);
  }
  async createService(idService, idServiceprovider) {
    return await bauen("tb_service_provider_service").insert({
      id_service: idService,
      id_service_provider: idServiceprovider,
    });
  }

  async chekingInformations(idServiceProvider) {
    return await bauen("tb_service_provider AS serviceProvider")
      .select("photo")
      .where("id_service_provider", idServiceProvider);
  }

  async showServices(idServico) {
    return await bauen("tb_service_provider AS serviceProvider")
      .join(
        "tb_service_provider_service as serviceProviderService",
        "serviceProvider.id_service_provider",
        "serviceProviderService.id_service_provider"
      )
      .join(
        "tb_service as service",
        "service.id_service",
        "serviceProviderService.id_service"
      )
      .select({
        name: "serviceProvider.name",
        id_service: "serviceProviderService.id_service",
        id: "serviceProviderService.id_service_provider_service",
        idPrestador: "serviceProvider.id_service_provider",
        nameService: "service.nameService",
      })
      .where("serviceProvider.id_service_provider", idServico);
  }

  async pendingservices(pedingService) {
    return await bauen("tb_pending_services").insert({
      id_client_fast_services: pedingService.idTableIntermediary,
      id_client: pedingService.idClient,
      id_service_provider: pedingService.idServiceProvider,
      nameClient: pedingService.nameClient,
      title_of_project: pedingService.titleProject,
      photo: pedingService.photo,
    });
  }

  async listPendingServices(idServiceProvider) {
    return await bauen("tb_pending_services")
      .select("nameClient", "title_of_project", "photo")
      .where("id_service_provider", idServiceProvider);
  }

  // async sendNotifications(notifications) {
  //   return await bauen("tb_pending_services").insert({
  //     finished_at: notifications,
  //   })
  // }

  async chekingFastServices() {
    return await bauen("tb_pending_services as pendingservices").join(
      "tb_client_fast_services as clientFastService",
      "clientFastService.id_client_fast_services",
      "pendingservices.id_client_fast_services"
    );
  }
}

export default new ServiceProviderRepository();
