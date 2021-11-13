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
    const  client  = await clientRepository.findByEmailAndPassword(
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

    const token = generateToken(
      client.client.id,
      client.client.email,
      client.client.room,
      client.client.name
    );
    return res.json({ client, token });
  }

  async sendPhotoClient(req, res) {
    const photoUser = req.file;

    const [Bearer, token] = req.headers.authorization.split(" ");

    const userId = await jwt.verify(token, TOKEN.SECRET);

    await clientRepository.updatedPhotoProfileClient(
      photoUser.firebaseUrl,
      userId.id
    );
  }

  async fastService(req, res) {
    const fastService = req.file;
    const { title, TypeOfService } = req.body;
    const [Bearer, token] = req.headers.authorization.split(" ");
    const userId = await jwt.verify(token, TOKEN.SECRET);
    const [choiceTypeOfService] = await clientRepository.choiceTypeOfService(
      TypeOfService
    );

    const FindIdAndCreateFastService = await clientRepository.sendFastService(
      fastService.firebaseUrl,
      title,
      choiceTypeOfService.nameService
    );

    await clientRepository.sendServicesFastTableIntermediary(
      FindIdAndCreateFastService,
      userId.id
    );

    return res.json({ photo: fastService.firebaseUrl, title, TypeOfService });
  }

  async listFastServices(req, res) {
    const listServices = await clientRepository.showServices();
    return res.json(listServices);
  }

  async gettinhPhoto(req, res) {
    const [Bearer, token] = req.headers.authorization.split(" ");
    const userId = await jwt.verify(token, TOKEN.SECRET);
    const [photo] = await clientRepository.getPhoto(userId.id);
    if (photo.photo == null) {
      return res.json({ message: "Nao contem foto no perfil" });
    } else return res.json(photo);
  }
}

export default new ClientController();
