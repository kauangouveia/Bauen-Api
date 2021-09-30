import serviceProviderRepository from "../../repositories/service-provider-repository";

class ServiceProviderController {
  async create(req, res) {
    await serviceProviderRepository.create(req.body);
    return res.json({
      message:"Prestador de serviço cadastrado com sucesso"
    });
  }
}

export default new ServiceProviderController();
