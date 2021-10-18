import { bauen } from "../../config/database/connection";

class AddressRepositoryProvaider{
    async create(address, id_service_provider){
        return await bauen("tb_address").insert({
            ...address,
            id_service_provider : id_service_provider
        })
    }
}

export default new AddressRepositoryProvaider();