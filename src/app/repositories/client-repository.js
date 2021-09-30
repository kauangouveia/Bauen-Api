import { bauen } from "../../config/database/connection";

class ClientRepository{
    async create(client){
        await bauen("tb_client").insert(client)
    }
}

export default new ClientRepository();