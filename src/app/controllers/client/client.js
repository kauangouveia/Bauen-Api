import addressRepository from "../../repositories/address-repository";
import clientRepository from "../../repositories/client-repository";

class ClientController {
  async create(req, res) {
    const [client] = await clientRepository.create(req.body);
    const address = await addressRepository.create(req.body.address, client);
    return res.json({
      message: "cliente registrado com sucesso",
    });
  }
}

export default new ClientController();
