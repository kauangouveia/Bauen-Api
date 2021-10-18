import { bauen } from "../../config/database/connection";

class AddressRepository {
  async create(address, id_client) {
    return await bauen("tb_address").insert({
      ...address,
      id_client: id_client
    });
  }
}

export default new AddressRepository();
