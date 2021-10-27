import { Router } from "express";
import ServiceProviderController from "../../app/controllers/service-provider/service-provider";
import ClientController from "../../app/controllers/client/client";
import multer from "multer";
import uploadImage from "../../services/firebase"
const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});
const route = Router();

route.post("/register/service-provider", ServiceProviderController.create);
route.post("/register/client", ClientController.create);
route.post("/login/service-provider", ServiceProviderController.authenticate);
route.post("/login/client", ClientController.authenticateLoginClient);
route.get("/service-provider", ServiceProviderController.listServiceProvider);
route.get("/service", ServiceProviderController.listService);
route.post("/photo-profile", Multer.single("photoProfile"),uploadImage,ServiceProviderController.sendPhoto)

export default route;
