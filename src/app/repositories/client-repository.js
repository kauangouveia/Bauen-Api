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

  async sendFastService(Urlphoto, titleService,TypeOfService) {
    return await bauen("tb_fast_services")
      .insert({
        photo: Urlphoto,
        title: titleService,
        typeService: TypeOfService
      })
      .select("id_fast_service");
  }

  async sendServicesFastTableIntermediary(idFastService, idClient) {
    return await bauen("tb_client_fast_services").insert({
      id_fast_service: idFastService,
      id_client: idClient,
    });
  }

  async showServices() {
    return await bauen("tb_client AS client")
      .join(
        "tb_client_fast_services as clientFastServices",
        "client.id_client",
        "clientFastServices.id_client"
      )
      .join(
        "tb_fast_services as fastService",
        "fastService.id_fast_service",
        "clientFastServices.id_fast_service"
      )
      .select({
        name: "client.name",
        id: "client.id_client",
        idServiceFast: "clientFastServices.id_fast_service",
        title: "fastService.title"
      });
  }
}

export default new ClientRepository();
