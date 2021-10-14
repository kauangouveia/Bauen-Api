import { bauen } from "../../config/database/connection";

class ClientRepository {
  async create(client) {
    console.log("🚀 ~ file: client-repository.js ~ line 5 ~ ClientRepository ~ create ~ client", client)
    return await bauen("tb_client").insert({
      phone: client.phone,
      name: client.name,
      document: client.document,
      password: client.password,
      email: client.email,
      birth_date: client.birth_date,
      profile_photo: client.profile_photo,
      is_client: client.is_client
    });
  }
}

export default new ClientRepository();
