import express from "express";
import AuthController from "../controller/auth.controller.js";
import { auth } from "../middleware/Auth.js";
import BannerController from "../controller/banner.controller.js";
import CategoryController from "../controller/category.controller.js";
const router = express.Router();
//------------Auth-------------
router.get("/user/getAll", auth, AuthController.getAll);
router.get("/user/getOne/:uuid", AuthController.getOne);
router.post("/user/login", AuthController.login);
router.post("/user/register", AuthController.register);
router.put("/user/forget", AuthController.forgotPassword);
router.put("/user/changePassword", auth, AuthController.changePassword);
router.put("/user/refreshToken", AuthController.refreshToken);
//_______________banner______________
router.post("/banner/insert", auth, BannerController.insert);
router.get("/banner/getAll", BannerController.getAll);
router.get("/banner/getOne/:bUuid", BannerController.getOne);
router.put("/banner/update/:bUuid", auth, BannerController.updateBanner);
router.delete("/banner/delete/:bUuid", auth, BannerController.deleteBanner);
//_______________category______________
router.post("/category/insert", auth, CategoryController.insert);
router.get("/category/getAll", CategoryController.getAll);
router.get("/category/getOne/:cUuid", CategoryController.getOne);
router.put("/category/update/:cUuid", auth, CategoryController.updatecategory);
router.delete("/category/delete/:cUuid", auth, CategoryController.deletecategory);
export default router;

