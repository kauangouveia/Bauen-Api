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
    const clientType = "client";
    const token = generateToken(
      client.client.id,
      client.client.room,
      client.client.name,
      client.address.city,
      clientType
    );
    return res.json({ client, clientType, token });
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
    const { userId, title: titleService, TypeOfService } = req.body;

    try {
      await clientRepository.sendFastService({
        userId,
        titleService,
        typeOfService: TypeOfService,
        urlPhoto: fastService.firebaseUrl,
      });

      return res.status(200).json();
    } catch (error) {
      return res.status(500);
    }
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
  async findProfile(req, res) {
    const [provider] = await clientRepository.findServiceProvider(
      req.params.id
    );
    return res.json(provider);
  }
  async findRoom(req, res) {
    const [providerRoom] = await clientRepository.findRoom(req.params.id);
    res.json(providerRoom);
  }
  async acceptFastServices(req, res) {
    const accept = await clientRepository.acceptFastServices(2);
    return res.json({ accept, message: " Seu serviço foi aceito" });
  }
  // listando todos os serviços em andamento do cliente
  async serviceProgress(req, res) {
    const progress = await clientRepository.servicesInProgress(req.params.id);
    return res.json(progress);
  }
  // Confirmando finalização de um serviço

  async confirmFinishService(req, res) {
    const date = new Date();
    const time =
      date.getFullYear() +
      "-" +
      parseInt(date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    const { idService } = req.body;
    try {
      await clientRepository.confirmFastService(time, idService);
      return res
        .status(200)
        .json({ message: "Confirmado finalização de serviço" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao finalizar um serviço" });
    }
  }

  async coment(req, res) {
    const { idProvider, idClient, coment } = req.body;
    try {
      await clientRepository.comentsServices(idProvider, idClient, coment);
      return res
        .status(200)
        .json({ message: "Comentario adiconado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao adiocionar um comentario" });
    }
  }
}

export default new ClientController();
