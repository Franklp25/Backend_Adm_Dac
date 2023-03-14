import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    //Informacion de Email

    const info = await transport.sendMail({
        from: ` "DAC BIO&GEN" <administracion@dacbiogen.com>`,
        to: email,
        subject: "DAC BIO&GEN - Confirmar usuario",
        text: "Confirme su usuario en DAC BIO&GEN",
        html: `
            <p>Hola ${nombre} confirme sus usuario en DAC BIO&GEN</p>
            <p>Confirme su cuenta en el siguiente enlace :</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar usuario</>
        `,
    });
};

export const emailOlvidePassword = async (datos) => {
    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    //Informacion de Email

    const info = await transport.sendMail({
        from: ` "DAC BIO&GEN" <administracion@dacbiogen.com>`,
        to: email,
        subject: "DAC BIO&GEN - Reestablezca su contraseña",
        text: "Reestablezca su contraseña",
        html: `
            <p>Hola ${nombre} solicito reestablecer su contraseña en DAC BIO&GEN</p>
            <p>Reestablezca su contraseña en el siguiente enlace :</p>
            <a href="${process.env.FRONTEND_URL}/olvidar-password/${token}">Reestablecer contraseña</>
        `,
    });
};
