import db from "../../prisma/db";
import { request, response } from "express";
import { jwt_sign } from "../utils/jwt";
import { password_hash } from "../utils/hasher";

const create_users = async ( req = request, res = response ) => {
    try {
        const {username, email, password} = await req.body

        if(!username || !email || !password){
            return res.status(500).json({
                success: false,
                message: "Field must be field!"
            })
        }

        const create_result = await db.account.create({
            data: {
                username: username,
                email: email,
                password: password_hash(password)
            }
        })

        const token = jwt_sign(create_result)

        return res.status(201).json({
            success: true,
            message: "Create Successfully!",
            query: create_result,
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default create_users