import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, email, message, company } = body
    const apiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!apiKey || !contactEmail) {
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 503 }
      )
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: contactEmail,
      subject: `Новая заявка от ${name}`,
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        ${company ? `<p><strong>Компания:</strong> ${company}</p>` : ''}
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        ${message ? `<p><strong>Сообщение:</strong> ${message}</p>` : ''}
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
