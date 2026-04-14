This is a Next.js frontend for the `ekonomika-truda` project.

## Getting Started

1. Create local envs from the example:

```bash
cp .env.example .env.local
```

2. Fill the SMTP credentials for your Beget mailbox.

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## SMTP form delivery

The contact form posts to `/api/consultation` and sends mail through SMTP.

Recommended Beget settings:

- `SMTP_HOST=smtp.beget.com`
- `SMTP_PORT=465`
- `SMTP_SECURE=true`
- `SMTP_USER=<full mailbox address>`
- `SMTP_PASS=<mailbox password>`
- `SMTP_FROM_EMAIL=<same mailbox address>`
- `CONTACT_EMAIL=<where requests should arrive>`

You can test locally once the mailbox is created in Beget and the SMTP credentials are valid.

## Deploy

This frontend can run on a regular Node.js server with:

- `npm ci`
- `npm run build`
- `npm run start`

For a Beget VPS deployment, place it behind `nginx` and run it with `pm2` together with the Strapi backend.
