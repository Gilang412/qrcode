import db from "../../prisma/db";
import { request, response } from "express";
import { jwt_sign, jwt_verify } from "../utils/jwt";
import { password_verify } from "../utils/hasher";

const login_users = async ( req = request, res = response ) => {
    try {
        const {email, password} = await req.body

        if(!email || !password){
            return res.status(500).json({
                success: false,
                message: `data must be filled!`
            })
        }

        const find_account = await db.account.findUnique({
            where: {
                email: email
            }
        })

        if(!find_account){
            return res.status(404).json({
                success: false,
                message: "Account not found!"
            })
        }

        const pass = await password_verify(password, find_account.password)

        if(!pass){
            return res.status(404).json({
                success: false,
                message: "Your password is incorrect"
            })
        }

        const token = jwt_sign(find_account)

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default login_users