import { Router } from "express";
import generateLoginQRCode from "./create";
import verifyQRCodeLogin from "./login";

const qr_routes = new Router()

qr_routes.get("/qr/generate/:id", generateLoginQRCode)
qr_routes.post("/qr/login", verifyQRCodeLogin)

export default qr_routes