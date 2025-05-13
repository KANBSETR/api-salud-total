import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendEmail = async (to, textMessage) => {
    const data = await resend.emails.send({
        from: "saludtotal@nicodia.dev",
        to: to,
        subject: "Confirmación de reserva de cita",
        html: textMessage,
    });
    console.log("Email sent successfully:", data);
    return data;
}