module.exports = {
  apps: [
    {
      name: 'ekonomika-truda-strapi',
      cwd: '/var/www/ekonomika-truda/backend',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 1337,
      },
    },
  ],
}
