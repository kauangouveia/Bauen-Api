import { badRequestWithErrors, notFound } from "../../../utils/response";
import { generateToken } from "../../../utils/token";
import serviceProviderRepository from "../../repositories/service-provider-repository";
import addressRepositoryProvaider from "../../repositories/address-repository-provaider";

class ServiceProviderController {
  async create(req, res) {
    const [provider] = await serviceProviderRepository.create(req.body);
    const address = await addressRepositoryProvaider.create(
      req.body.address,
      provider
    );
    return res.json({
      message: "Prestador de serviço cadastrado com sucesso",
    });
  }

  async authenticate(req, res) {
    const { email, password } = req.body;

    const serviceProvider =
      await serviceProviderRepository.findByEmailAndPassword(email, password);

    // console.log(serviceProvider);

    if (!serviceProvider) {
      badRequestWithErrors(res, "usuário não encontrado", [
        {
          param: "email/password",
          message: "email ou senha invalidos",
        },
      ]);
    }

    const token = generateToken(serviceProvider.room, serviceProvider.city, serviceProvider.id);

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

    const auth = await serviceProviderRepository.findUserByPhoto(photoUser.firebaseUrl)

    console.log("mai q carai", auth);

    // const services = await serviceProviderRepository.updatedPhotoProfile(photoUser.firebaseUrl, 1);
    // console.log("🚀 ~ file: service-provider.js ~ line 54 ~ ServiceProviderController ~ sendPhoto ~ services", photoUser.firebaseUrl)
    // return services
  }
}

export default new ServiceProviderController();
