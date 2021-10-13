import { bauen } from "../../config/database/connection";

class ClientRepository {
  async create(client) {
    return await bauen("tb_client").insert({
      phone: client.phone,
      name: client.name,
      document: client.document,
      password: client.password,
      email: client.email,
      birth_date: client.birth_date,
      profile_photo: client.profile_photo,
    });
  }
}

export default new ClientRepository();
