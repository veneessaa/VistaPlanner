import express from "express"
import auth from "../apps/auth/auth.controller"
import user from "../apps/user/user.controller"

const router = express.Router();

router.use("/auth", auth);
router.use("/users", user);

export default router