import { Router } from "express";
import create_users from "./create";
import login_users from "./login";
import register_user from "./register";
import verify_user from "./verify";

const user_routes = new Router()

user_routes.post("/user/create", create_users)
user_routes.post("/user/login", login_users)
user_routes.post("/user/register", register_user)
user_routes.get("/user/verify", ((req, res) => verify_user(req, res)))

export default user_routes