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
    });
  }
  async findByEmailAndPassword(email, password) {
    const user = await bauen("tb_client")
      .select("id_client")
      .where("email", email)
      .andWhere("password", password)
      .first();

    return user;
  }
}

export default new ClientRepository();
