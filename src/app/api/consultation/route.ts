import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, email, message, company } = body

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL!,
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
