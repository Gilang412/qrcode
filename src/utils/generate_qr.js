import QRCode from "qrcode";

const generateQRCode = async (data) => {
    try {
        return await QRCode.toDataURL(data); // Menghasilkan QR Code dalam bentuk URL (base64)
    } catch (err) {
        throw new Error("Failed to generate QR Code");
    }
};

export default generateQRCode