import addressRepository from "../../repositories/address-repository";
import clientRepository from "../../repositories/client-repository";
import { badRequestWithErrors } from "../../../utils/response";
import { generateToken } from "../../../utils/token";
import jwt from "jsonwebtoken";
import { TOKEN } from "../../../utils/constants";

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
    const { client } = await clientRepository.findByEmailAndPassword(
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

    const token = generateToken(client.id, client.email, client.room,client.name);
    return res.json({ client, token });
  }

  async fastService(req, res) {
    const fastService = req.file;

    const { title, TypeOfService } = req.body;

    const [Bearer, token] = req.headers.authorization.split(" ");
    const userId = await jwt.verify(token, TOKEN.SECRET);

    const idFastServiceCreate = await clientRepository.sendFastService(
      fastService.firebaseUrl,
      title,
    );
// Cadastrar o tipo de serviço
    await clientRepository.sendServicesFastTableIntermediary(
      idFastServiceCreate,
      userId.id
    );

    return res.json({ photo: fastService.firebaseUrl, title, });
  }

  async listFastServices(req, res) {
    const listServices = await clientRepository.showServices();
    return res.json(listServices);
  }
}

export default new ClientController();
