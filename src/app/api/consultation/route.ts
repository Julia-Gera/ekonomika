import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, email, message, company } = body
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT ?? 465)
    const smtpSecure = (process.env.SMTP_SECURE ?? 'true') === 'true'
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const contactEmail = process.env.CONTACT_EMAIL
    const fromEmail = process.env.SMTP_FROM_EMAIL ?? smtpUser
    const fromName = process.env.SMTP_FROM_NAME ?? 'Экономика труда'

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!smtpHost || !smtpUser || !smtpPass || !contactEmail || !fromEmail) {
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 503 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: contactEmail,
      replyTo: email,
      subject: `Новая заявка от ${name}`,
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
        ${company ? `<p><strong>Компания:</strong> ${escapeHtml(company)}</p>` : ''}
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
        ${message ? `<p><strong>Сообщение:</strong> ${escapeHtml(message)}</p>` : ''}
      `,
      text: [
        'Новая заявка с сайта',
        `Имя: ${name}`,
        company ? `Компания: ${company}` : '',
        `Email: ${email}`,
        `Телефон: ${phone}`,
        message ? `Сообщение: ${message}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
