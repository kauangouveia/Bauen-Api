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
      // room: client.room,
    });
  }
  async findByEmailAndPassword(email, password) {
    return await bauen("tb_client AS client")
      .join("tb_address AS address", "client.id_client", "address.id_client")
      .select({
        name: "client.name",
        city: "address.city"
      })
      .where("client.email", email)
      .andWhere("client.password", password)
      .first()
      .options({ nestTables: true });
  }

  async sendFastService(Urlphoto, titleService) {
    return await bauen("tb_fast_services")
      .insert({photo: Urlphoto, title: titleService })
  }


  
}

export default new ClientRepository();
