import { badRequestWithErrors, notFound } from "../../../utils/response";
import { generateToken } from "../../../utils/token";
import serviceProviderRepository from "../../repositories/service-provider-repository";
import addressRepositoryProvaider from "../../repositories/address-repository-provaider";
import jwt from "jsonwebtoken";
import { TOKEN } from "../../../utils/constants";

class ServiceProviderController {
  async create(req, res) {
    const [provider] = await serviceProviderRepository.create(req.body);
    const address = await addressRepositoryProvaider.create(
      req.body.address,
      provider
    );
    console.log(provider);
    return res.json({
      message: "Prestador de serviço cadastrado com sucesso",
      id: provider,
    });
  }

  async authenticate(req, res) {
    const { email, password } = req.body;
    const serviceProvider =
      await serviceProviderRepository.findByEmailAndPassword(email, password);

    console.log(req.body);
    if (!serviceProvider) {
      badRequestWithErrors(res, "usuário não encontrado", [
        {
          param: "email/password",
          message: "email ou senha invalidos",
        },
      ]);
    }
    const token = generateToken(
      serviceProvider.serviceProvider.id,
      email,
      serviceProvider.serviceProvider.room,
      serviceProvider.address.city
    );

    return res.json({ user: serviceProvider, token });
  }

  async listServiceProvider(req, res) {
    const serviceProviders = await serviceProviderRepository.findAll();
    if (serviceProviders.length === 0)
      return notFound(res, "Nenhum prestador de serviços foi encontrado");
    return res.json({ serviceProviders });
  }

  async listService(req, res) {
    const services = await serviceProviderRepository.findAllServices();
    return res.json({ services });
  }
  async sendPhoto(req, res) {
    const photoUser = req.file;

    const [Bearer, token] = req.headers.authorization.split(" ");

    const userId = await jwt.verify(token, TOKEN.SECRET);

    await serviceProviderRepository.updatedPhotoProfile(
      photoUser.firebaseUrl,
      userId.id
    );
  }

  async sendTypeService(req, res) {
    const [Bearer, token] = req.headers.authorization.split(" ");
    const userId = await jwt.verify(token, TOKEN.SECRET);
    const getId = userId.id;
    const { service } = req.body;

    const idService = await serviceProviderRepository.findServiceByName(
      service
    );

    const envitService = await serviceProviderRepository.createService(
      idService[0].id_service,
      getId
    );

    return res.json({ message: "Serviço cadastrado com sucesso" });
  }

  async findInformations(req, res) {
    const [Bearer, token] = req.headers.authorization.split(" ");
    const userId = await jwt.verify(token, TOKEN.SECRET);
    const listPhoto = await serviceProviderRepository.findInformations(
      userId.id
    );
    return res.json(listPhoto[0]);
  }

  async checkInformations(req, res) {
    const [Bearer, token] = req.headers.authorization.split(" ");
    const userId = await jwt.verify(token, TOKEN.SECRET);
    const check = await serviceProviderRepository.chekingInformations(
      userId.id
    );
    if(check[0].photo === null) {
      return res.json({message: "Nao contem foto no perfil"})
    }else{

      return res.json({message: "Contem foto no perfil"});
    }
  }

  async showServices(req, res){
      const test = await serviceProviderRepository.showServices()
      return res.json(test)
  }

}

export default new ServiceProviderController();
