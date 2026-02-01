import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, message } = body

    // Validar campos requeridos
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos requeridos deben ser completados' },
        { status: 400 }
      )
    }

    // Configurar el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Mapeo de valores de subject a texto legible
    const subjectMap: Record<string, string> = {
      purchase: 'Home Purchase',
      refinance: 'Refinance',
      preapproval: 'Pre-Approval',
      rates: 'Rate Inquiry',
      other: 'Other',
    }

    const subjectText = subjectMap[subject] || subject

    // Configurar el email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${subjectText}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">
            Nuevo Mensaje de Contacto
          </h2>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Información del Cliente</h3>
            <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
            <p><strong>Asunto:</strong> ${subjectText}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #1e3a8a;">
            <h3 style="color: #374151; margin-top: 0;">Mensaje</h3>
            <p style="color: #4b5563; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>Este mensaje fue enviado desde el formulario de contacto de Arrowhead Realty Group</p>
            <p>Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Los_Angeles' })}</p>
          </div>
        </div>
      `,
    }

    // Enviar el email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email enviado exitosamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error al enviar email:', error)
    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Por favor intenta nuevamente.' },
      { status: 500 }
    )
  }
}
