import clientRepository from "../../repositories/client-repository";

class ClientController{
    async create(req,res){
        await clientRepository.create(req.body);
        return res.json({
            message : "cliente registrado com sucesso"
        })
    }
}

export default new ClientController();