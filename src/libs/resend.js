import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailCita = async (correo, datos) => {
    const { fecha, hora, nombreMedico, especialidad, token, nombrePaciente } = datos;
    const textHTML = `
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reserva de cita médica</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: white;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #555;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Reserva de cita médica</h1>
            <p>Hola, ${nombrePaciente}</p>
            <p>Gracias por reservar una cita médica con nosotros. A continuación, encontrarás los detalles de tu cita:</p>
            <ul>
                <li><strong>Fecha:</strong> ${fecha}</li>
                <li><strong>Hora:</strong> ${hora}</li>
                <li><strong>Médico:</strong> ${nombreMedico}</li>
                <li><strong>Especialidad:</strong> ${especialidad}</li>
            </ul>
            <p>Si tienes alguna pregunta o necesitas reprogramar tu cita, no dudes en contactarnos.</p>
            <p>Saludos,<br/>El equipo de Salud Total</p>

            <p>Para confirmar tu cita, haz clic en el siguiente enlace:</p>
            <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                <a href="http://localhost:4000/cita/confirmar?token=${token}">Confirmar Cita</a>
            </button>
            <p>Si no puedes asistir a la cita, por favor cancela tu cita haciendo clic en el siguiente enlace:</p>
        </div>
    </body>
    </html>
    `;
    // Enviar el correo electrónico
    try {
        const data = await resend.emails.send({
            from: "saludtotal@nicodia.dev",
            to: correo,
            subject: "Reserva de cita médica",
            html: textHTML
        })
        return data;
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
}

