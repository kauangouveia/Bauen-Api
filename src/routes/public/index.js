import { Router } from "express";
import  ServiceProviderController  from "../../app/controllers/service-provider/service-provider";

const route = Router();

route.post("/register/service-provider", ServiceProviderController.create );

export default route;