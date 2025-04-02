import express from "express"
import auth from "../apps/auth/auth.controller"

const router = express.Router();

router.use("/auth", auth);

export default router