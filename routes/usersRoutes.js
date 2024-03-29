import express from "express";
import {
  getAllUsers,
  register,
  login,
  logout,
  getOneUser,
  deleteUser,
  getAllPostsOfOneUser,
  getAuthUser,
  updatePartialUser,
  uploadAvatarImg,
} from "../controllers/usersControllers.js";

import { userValidationRules } from "../middleware/users/userValidator.js";
import { tokenValid } from "../middleware/users/tokenValid.js";
import { authenticate } from "../middleware/users/authenticate.js";
import { cloudinaryMulter } from "../cloudinary-config.js";

const usersRouter = express.Router();

const usersMainPath = "/users";

usersRouter.route("/").get(getAllUsers);

usersRouter.route("/register").post(userValidationRules, register);
usersRouter.route("/login").post(userValidationRules, login);
usersRouter.route("/logout").post(logout);

usersRouter.get("/posts/:id", getAllPostsOfOneUser);

usersRouter.route("/token-valid").post(tokenValid);

usersRouter.route("/auth-user-data").get(authenticate, getAuthUser);

usersRouter
  .route("/upload-avatar/:id")
  .patch(cloudinaryMulter.single("image"), uploadAvatarImg);

usersRouter
  .route("/:id")
  .get(getOneUser)
  .delete(deleteUser)
  .patch(updatePartialUser);

export { usersRouter, usersMainPath };
