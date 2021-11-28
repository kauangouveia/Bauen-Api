import { bauen } from "../../config/database/connection";

class ClientRepository {
  async create(client) {
    return await bauen("tb_client").insert({
      phone: client.phone,
      name: client.name,
      rg: client.rg,
      cpf: client.cpf,
      password: client.password,
      email: client.email,
      born: client.born,
      room: client.room,
    });
  }
  async findByEmailAndPassword(email, password) {
    return await bauen("tb_client AS client")
      .join("tb_address AS address", "client.id_client", "address.id_client")
      .select({
        email: "client.email",
        name: "client.name",
        room: "client.room",
        city: "address.city",
        id: "client.id_client",
      })
      .where("client.email", email)
      .andWhere("client.password", password)
      .first()
      .options({ nestTables: true });
  }

  async choiceTypeOfService(typeService) {
    return await bauen("tb_service")
      .select("nameService", "id_service")
      .where("nameService", typeService);
  }

  async sendFastService({ userId, titleService, typeOfService, urlPhoto }) {
    const created = await bauen("tb_fast_services").insert({
      id_client: userId,
      title: titleService,
      type_service: typeOfService,
      photo_service: urlPhoto,
    });

    console.log("AQUI: ", created);
  }

  async sendServicesFastTableIntermediary(idFastService, idClient) {
    return await bauen("tb_client_fast_services").insert({
      id_fast_service: idFastService,
      id_client: idClient,
    });
  }

  // async showServices() {
  //   return await bauen("tb_client AS client")
  //     .join(
  //       "tb_client_fast_services as clientFastServices",
  //       "client.id_client",
  //       "clientFastServices.id_client"
  //     )
  //     .join(
  //       "tb_fast_services as fastService",
  //       "fastService.id_fast_service",
  //       "clientFastServices.id_fast_service"
  //     )
  //     .select({
  //       name: "client.name",
  //       id: "client.id_client",
  //       idServiceFast: "clientFastServices.id_fast_service",
  //       idTableIntermediary: "clientFastServices.id_client_fast_services",
  //       title: "fastService.title",
  //       typeService: "fastService.typeService",
  //       photoClient: "client.photo",
  //       photoService: "fastService.photo",
  //     });
  // }

  async updatedPhotoProfileClient(photo, id) {
    return await bauen("tb_client AS client")
      .update("photo", photo)
      .where("client.id_client", id);
  }

  async getPhoto(idClient) {
    return await bauen("tb_client")
      .select("photo", "name")
      .where("id_client", idClient);
  }
  async findServiceProvider(nameProvider) {
    return await bauen("tb_service_provider as provider")
      .join(
        "tb_address as address",
        "address.id_service_provider",
        "provider.id_service_provider"
      )
      .join(
        "tb_service_provider_service as serviceProviderService",
        "provider.id_service_provider",
        "serviceProviderService.id_service_provider"
      )
      .join(
        "tb_service as service",
        "service.id_service",
        "serviceProviderService.id_service"
      )
      .select(
        "name",
        "photo",
        "city",
        "provider.id_service_provider",
        "serviceProviderService.id_service_provider_service",
        "nameService",
        "service.id_service"
      )
      .where("provider.id_service_provider", nameProvider);
  }

  async findRoom(idProvider) {
    return await bauen("tb_service_provider")
      .select("room")
      .where("id_service_provider", idProvider);
  }
  async servicesInProgress(idClient) {
    return await bauen("tb_fast_services as fastService")
      .join(
        "tb_fast_services_service_provider as fastServiceProvider",
        "fastServiceProvider.id_fast_service",
        "fastService.id_fast_service"
      )
      .join(
        "tb_service_provider as provider",
        "fastServiceProvider.id_service_provider",
        "provider.id_service_provider"
      )
      .select("*")
      .where("id_client", idClient);
  }
}

export default new ClientRepository();
