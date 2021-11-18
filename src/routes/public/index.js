import { Router } from "express";
import ServiceProviderController from "../../app/controllers/service-provider/service-provider";
import ClientController from "../../app/controllers/client/client";
import multer from "multer";
import uploadImage from "../../services/firebase";
import { authorization } from "../../middlewares/authorization";
const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});
const route = Router();

route.post("/login-client", ClientController.authenticateLoginClient);
route.post("/login/service-provider", ServiceProviderController.authenticate);
route.post("/register/client", ClientController.create);
route.post("/register/service-provider", ServiceProviderController.create);
route.get("/service", ServiceProviderController.listService);

route.post(
  "/send-fast-service/",
  Multer.single("fastService"),
  uploadImage,
  ClientController.fastService
);

route.post(
  "/photo-profile/",
  Multer.single("photoProfile"),
  uploadImage,
  ServiceProviderController.sendPhoto
);
route.post(
  "/photo-profile-client/",
  Multer.single("photoProfileClient"),
  uploadImage,
  ClientController.sendPhotoClient
);
route.get("/servicesTypes", ServiceProviderController.showServices)

route.get("/listFastServices", ClientController.listFastServices)
route.get("/findProfile/:id", ClientController.findProfile)  
// route.use(authorization);
route.get("/service-provider", ServiceProviderController.listServiceProvider);
route.get("/informations", ServiceProviderController.findInformations);
route.post("/sendService", ServiceProviderController.sendTypeService);
// route.post("/SendFastService", ClientController.);

route.get("/chekingInformations", ServiceProviderController.checkInformations);
route.get("/photo-client", ClientController.gettinhPhoto)

route.post("/pendingservices", ServiceProviderController.acceptFastServices);
route.get("/listPendingServices", ServiceProviderController.listAcceptServices)
export default route;
