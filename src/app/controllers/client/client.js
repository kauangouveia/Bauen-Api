import addressRepository from "../../repositories/address-repository";
import clientRepository from "../../repositories/client-repository";

class ClientController {
  async create(req, res) {
    const [client] = await clientRepository.create(req.body);
    console.log(client, "sou o client");
    const andress = await addressRepository.create(req.body.address, client);
    console.log(andress);
    return res.json({
      message: "cliente registrado com sucesso",
    });
  }
}

export default new ClientController();
