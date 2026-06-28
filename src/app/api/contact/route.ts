import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: 'Todos los campos son obligatorios.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'El formato del email no es válido.' },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_EMAIL_TO || 'jesuscarlosrer21@gmail.com';

    await resend.emails.send({
      from: 'Antares Contacto <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `[Antares Contacto] ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e4e4e7; border-radius: 16px; overflow: hidden; border: 1px solid #27272a;">
          <div style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); padding: 32px 24px;">
            <h1 style="margin: 0; font-size: 22px; color: #fff; font-weight: 700;">Nuevo mensaje de contacto</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Recibido desde el formulario de Antares</p>
          </div>
          <div style="padding: 28px 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; width: 100px; vertical-align: top;">Nombre</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; font-size: 15px; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; font-size: 15px;"><a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Asunto</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; font-size: 15px; font-weight: 500;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Mensaje</td>
                <td style="padding: 12px 0; font-size: 15px; line-height: 1.65; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="padding: 16px 24px; background: #111118; border-top: 1px solid #27272a; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #71717a;">Puedes responder directamente a este email para contactar a ${name}.</p>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true, message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('Error enviando email:', error);
    return Response.json(
      { error: 'Error al enviar el mensaje. Inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}
