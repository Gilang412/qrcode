import nodemailer from "nodemailer"

// Setup Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Ganti dengan alamat server SMTP Anda
    port: 465, // Ganti dengan port SMTP yang sesuai
    secure: "SSL",
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

export default transporter