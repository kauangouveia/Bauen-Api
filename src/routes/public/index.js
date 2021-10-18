import { Router } from "express";
import  ServiceProviderController  from "../../app/controllers/service-provider/service-provider";
import ClientController from "../../app/controllers/client/client";
const route = Router();

route.post("/register/service-provider", ServiceProviderController.create );
route.post("/register/client", ClientController.create)
route.post("/login/service-provider", ServiceProviderController.authenticate )
route.post("/login/client", ClientController.authenticateLoginClient)


export default route;