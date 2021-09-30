import { Router } from "express";
import  ServiceProviderController  from "../../app/controllers/service-provider/service-provider";
import ClientController from "../../app/controllers/client/client";
const route = Router();

route.post("/register/service-provider", ServiceProviderController.create );
route.post("/register/client", ClientController.create)
export default route;