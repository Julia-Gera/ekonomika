# Beget VPS: Strapi deploy

This project can be deployed to a single Beget VPS with:

- Node.js 22 LTS
- PM2
- nginx
- SQLite for the first launch

## 1. Buy the VPS

Choose:

- Ubuntu 22.04 or 24.04
- at least 2 GB RAM
- at least 1 vCPU
- 20+ GB disk

If you use the Beget Node.js marketplace image, update Node.js manually to 22 LTS after the server is created.

## 2. Prepare the server

Connect over SSH and install base tools:

```bash
sudo apt update
sudo apt install -y git curl build-essential nginx
```

Install Node.js 22:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

Install PM2:

```bash
sudo npm install -g pm2
pm2 -v
```

## 3. Upload the project

Recommended target path:

```bash
sudo mkdir -p /var/www/ekonomika-truda
sudo chown -R "$USER":"$USER" /var/www/ekonomika-truda
git clone <your-repo-url> /var/www/ekonomika-truda
```

If the repository already exists:

```bash
cd /var/www/ekonomika-truda
git pull
```

## 4. Configure backend env

Create the backend env file from the example:

```bash
cd /var/www/ekonomika-truda/backend
cp .env.production.example .env
```

Generate secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Generate that command 8 times and fill:

- `APP_KEYS` with 4 comma-separated values
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- `ENCRYPTION_KEY`

For the first deploy, keep SQLite enabled.

## 5. Install and build

```bash
cd /var/www/ekonomika-truda/backend
npm ci
npm run build
```

## 6. Start Strapi with PM2

```bash
cd /var/www/ekonomika-truda/backend
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Check logs:

```bash
pm2 logs ekonomika-truda-strapi
```

## 7. Configure nginx

Example config for `cms.example.com`:

```nginx
server {
    server_name cms.example.com;

    client_max_body_size 25m;

    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Enable it:

```bash
sudo nano /etc/nginx/sites-available/ekonomika-truda-strapi
sudo ln -s /etc/nginx/sites-available/ekonomika-truda-strapi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 8. Add SSL

Point `cms.example.com` to the VPS IP, then:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d cms.example.com
```

## 9. Verify

These should work:

```bash
curl http://127.0.0.1:1337/admin
curl -I https://cms.example.com/admin
```

## Notes

- The first deploy uses SQLite because it is the fastest path to a working backend.
- For long-term production use, move to PostgreSQL.
- Uploaded files are stored locally in `backend/public/uploads`, so back them up.
