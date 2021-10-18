import addressRepository from "../../repositories/address-repository";
import clientRepository from "../../repositories/client-repository";
import { badRequestWithErrors } from "../../../utils/response";
import { generateToken } from "../../../utils/token";

class ClientController {

  async create(req, res) {
    const [client] = await clientRepository.create(req.body);
    const address = await addressRepository.create(req.body.address, client);
    return res.json({
      message: "cliente registrado com sucesso",
    });
  }

  async authenticateLoginClient(req, res) {
    const { email, password } = req.body;
    const client = await clientRepository.findByEmailAndPassword(
      email,
      password
    );
    if (!client) {
      badRequestWithErrors(res, "usuário não encontrado", [
        {
          param: "email/password",
          message: "email ou senha invalidos",
        },
      ]);
    }

    const token = generateToken(client.id_client);
    return res.json({ user: client, token });
  }
}

export default new ClientController();
