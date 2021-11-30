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

  //
  async listFastService() {
    return await bauen("tb_fast_services as fastservice")
      .join("tb_client as client", "fastservice.id_client", "client.id_client")
      .select("*")
      .where("started_service_at", null);
  }

  // Realizando updated no campo de inicio de serviço
  async acceptFastServices(date, idServiceFast) {
    return await bauen("tb_fast_services")
      .update("started_service_at", date)
      .where("id_fast_service", idServiceFast);
  }
  // Inserindo novo serviço rapido na tabela intermediaria
  async sendFastService(idFastService, idProvider) {
    return await bauen("tb_fast_services_service_provider").insert({
      id_fast_service: idFastService,
      id_service_provider: idProvider,
    });
  }
  // Listando todos os serviços pendentes do prestador logado

  async listPendingServices(idProvider) {
    return await bauen(
      "tb_fast_services_service_provider as fastServicesProvider"
    )
      .join(
        "tb_fast_services as fastService",
        "fastServicesProvider.id_fast_service",
        "fastService.id_fast_service"
      )
      .join("tb_client as client", "fastService.id_client", "client.id_client")
      .where("id_service_provider", idProvider)
      .andWhere("service_finished_confirmed_by_client", null);
    // .select("title", "photo_service", "type_service", "started_service_at", "name", "phone", "finished_at_by_service_provider"  )
  }
  // completando um serviço rapido
  async completeService(time, idFastService) {
    return await bauen("tb_fast_services")
      .update("finished_at_by_service_provider", time)
      .where("id_fast_service", idFastService);
  }

  async addPhotoPortifolio(idProvider, urlPhoto) {
    return await bauen("tb_portfolio_provider").insert({
      id_service_provider: idProvider,
      photo_portifolio: urlPhoto,
    });
  }

  async listPhotosPortifolio(idProvider) {
    return await bauen("tb_portfolio_provider")
      .select("photo_portifolio")
      .where("id_service_provider", idProvider);
  }
}

export default new ServiceProviderRepository();
