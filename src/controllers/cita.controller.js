import { sendEmail } from "../libs/resend.js";


export const createCita = async (req, res) => {
    const { fecha, hora, nombreMedico, especialidad, correo } = req.body;
    //Objeto con el contenido del correo
    const emailContent = {
        fechaCita: fecha,
        horaCita: hora,
        nombreMedico: nombreMedico,
        especialidad: especialidad
    }    
    const result = await sendEmail(correo, emailContent);

    res.status(200).json({
        message: "Email sent successfully",
        data: result,
    });
}