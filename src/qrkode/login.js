import { request, response } from "express";
import { jwt_sign } from "../utils/jwt";
import { v4 as uuidv4 } from "uuid";
import generateQRCode from "../utils/generate_qr";
import db from "../../prisma/db";

const validateLoginQRCode = async (req, res) => {
    try {
        const { sessionId } = req.body; // Session ID dari QR Code

        // 1. Cari sesi QR di database
        const qrSession = await db.qrSession.findUnique({
            where: { id: sessionId },
        });

        if (!qrSession) {
            return res.status(404).json({
                success: false,
                message: "QR Code tidak valid atau tidak ditemukan",
            });
        }

        if (qrSession.status === "LoggedIn") {
            return res.status(400).json({
                success: false,
                message: "QR Code sudah digunakan",
            });
        }

        // 2. Ambil data akun terkait
        const account = await db.account.findUnique({
            where: { id: parseInt(qrSession.userId) },
        });

        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Akun tidak ditemukan",
            });
        }

        // 3. Perbarui status sesi menjadi "LoggedIn"
        await db.qrSession.update({
            where: { id: sessionId },
            data: { status: "LoggedIn" },
        });

        // 4. Kirim respons dengan data akun atau token autentikasi
        return res.status(200).json({
            success: true,
            message: "Login berhasil",
            account: {
                id: account.id,
                username: account.username,
                email: account.email,
            },
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export default validateLoginQRCode;
