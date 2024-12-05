import { Router } from "express";
import create_users from "./create";
import login_users from "./login";

const user_routes = new Router()

user_routes.post("/user/create", create_users)
user_routes.post("/user/login", login_users)

export default user_routes