import { v4 as uuidv4 } from "uuid";
import generateQRCode from "../utils/generate_qr";
import db from "../../prisma/db";

const generateLoginQRCode = async (req, res) => {
    try {

        const {id} = await req.params

        // 1. Generate session ID
        const sessionId = uuidv4(); // ID unik untuk setiap sesi login

        // 2. Ambil data akun dari database (misalnya, ambil user pertama sebagai contoh)
        const account = await db.account.findUnique({
            where: {
                id: parseInt(id)
            }
        }); 
        // Bisa disesuaikan dengan logika pencarian akun
        
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Akun tidak ditemukan",
            });
        }

        // 3. Buat kode QR berdasarkan session ID
        const qrCode = await generateQRCode(sessionId);

        // 4. Simpan session QR ke database
        await db.qrSession.create({
            data: {
                id: sessionId,
                status: "Pending", // Status awal
                userId: account.id.toString(), // Hubungkan dengan akun
                createdAt: new Date(),
            },
        });

        // 5. Kirim respons ke frontend
        return res.status(200).json({
            success: true,
            qrCode, // Kode QR
            account: {
                id: account.id,
                username: account.username,
                email: account.email,
            }, // Data akun yang terkait
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export default generateLoginQRCode;
