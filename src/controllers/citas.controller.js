import { sendEmail } from "../libs/resend.js";


export const sendEmailTest = async (req, res) => {
    try {
        const data = await sendEmail();
        res.status(200).json({ message: "Email sent successfully", data });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email", error });
    }
}

