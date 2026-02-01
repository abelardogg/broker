# Quick Deployment Checklist - Digital Ocean

## Tu situación actual:
✅ Droplet creado
✅ Dominio configurado
✅ Nginx instalado

## Pasos restantes:

### 0. Crear usuario no-root (IMPORTANTE - Hacer primero)
```bash
# Conectado como root
ssh root@your-droplet-ip

# Crear nuevo usuario (reemplaza 'deploy' con el nombre que quieras)
adduser deploy

# Agregar a grupo sudo (para poder usar sudo cuando sea necesario)
usermod -aG sudo deploy

# Agregar al grupo www-data (para permisos de Nginx)
usermod -aG www-data deploy

# Configurar SSH para el nuevo usuario
# Copiar las llaves SSH autorizadas de root al nuevo usuario
mkdir -p /home/deploy/.ssh
cp /root/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys

# Probar conexión con nuevo usuario (en otra terminal, NO cierres la de root)
# ssh deploy@your-droplet-ip

# Una vez confirmado que funciona, puedes deshabilitar login root (OPCIONAL pero recomendado)
# nano /etc/ssh/sshd_config
# Busca y cambia: PermitRootLogin no
# systemctl restart sshd
```

**De ahora en adelante, usa el usuario 'deploy' para todo lo demás**

### 1. Instalar Node.js 20.x y PM2
```bash
# Ahora conecta como usuario deploy
ssh deploy@your-droplet-ip

# Instalar Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verificar instalación
node --version  # Debe mostrar v20.x
npm --version

# Instalar PM2 (process manager)
npm install -g pm2
```

### 2. Subir tu código al servidor
**Opción A: Usando Git (Recomendado)**
```bash
# En el servidor (como usuario deploy)
# Crear directorio con permisos correctos
sudo mkdir -p /var/www/arrowhead-realty
sudo chown -R deploy:www-data /var/www/arrowhead-realty

cd /var/www/arrowhead-realty
git clone https://github.com/tu-usuario/tu-repo.git .
```

**Opción B: Usando SCP (desde tu máquina local)**
```bash
# Desde tu PC (PowerShell/CMD)
# Primero crea un .zip del proyecto (excluyendo node_modules)
scp arrowhead-realty.zip root@your-droplet-ip:/var/www/
```

### 3. Configurar el proyecto en el servidor
```bash
cd /var/www/arrowhead-realty

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
nano .env.local
```

**Pega esto en .env.local:**
```env
EMAIL_USER=arrowheadrealty.contact@gmail.com
EMAIL_PASS=rjja qshw qmbj xjit
EMAIL_TO=carlos@cjrealestate365.com
NODE_ENV=production
```

Guarda con `Ctrl+O`, Enter, `Ctrl+X`

### 4. Build y arrancar la aplicación
```bash
# Build del proyecto
npm run build

# Iniciar con PM2
pm2 start npm --name "arrowhead-realty" -- start

# Configurar PM2 para auto-start en reboot
pm2 startup
pm2 save

# Verificar que está corriendo
pm2 status
pm2 logs arrowhead-realty
```

### 5. Configurar Nginx
```bash
# Crear configuración de Nginx (necesita sudo)
sudo nano /etc/nginx/sites-available/arrowhead-realty
```

**Pega esta configuración (reemplaza `tudominio.com` con tu dominio real):**
```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Activar el sitio (necesita sudo)
sudo ln -s /etc/nginx/sites-available/arrowhead-realty /etc/nginx/sites-enabled/

# Remover default site si existe (necesita sudo)
sudo rm /etc/nginx/sites-enabled/default

# Testear configuración (necesita sudo)
sudo nginx -t

# Reiniciar Nginx (necesita sudo)
sudo systemctl restart nginx
```

### 6. Configurar SSL (HTTPS)
```bash
# Instalar Certbot (necesita sudo)
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL (reemplaza con tu dominio, necesita sudo)
sudo certbot --nginx -d tudominio.com -d www.tudominio.com

# Sigue las instrucciones:
# - Ingresa tu email
# - Acepta términos (Y)
# - Elige opción 2 (Redirect HTTP to HTTPS)
```

### 7. Configurar Firewall (si no está configurado)
```bash
# Permitir SSH, HTTP, HTTPS
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

## Verificación

1. **Visita tu dominio:** https://tudominio.com
2. **Prueba el formulario de contacto**
3. **Verifica logs:** `pm2 logs arrowhead-realty`

## Para actualizar después (cuando hagas cambios)
```bash
# SSH al servidor
ssh root@your-droplet-ip

# Ir al directorio
cd /var/www/arrowhead-realty

# Actualizar código
git pull  # Si usas Git
# O sube archivos con SCP

# Reinstalar dependencias (si cambiaron)
npm install

# Rebuild
npm run build

# Reiniciar app
pm2 restart arrowhead-realty

# Ver logs
pm2 logs arrowhead-realty --lines 50
```

## Comandos útiles PM2
```bash
pm2 status                    # Ver estado
pm2 logs arrowhead-realty     # Ver logs en tiempo real
pm2 restart arrowhead-realty  # Reiniciar app
pm2 stop arrowhead-realty     # Detener app
pm2 delete arrowhead-realty   # Eliminar de PM2
pm2 monit                     # Monitor de recursos
```

## Troubleshooting

**502 Bad Gateway:**
```bash
pm2 status  # Verificar que la app esté corriendo
pm2 logs arrowhead-realty  # Ver errores
```

**App no arranca:**
```bash
# Ver errores de build
npm run build

# Verificar .env.local existe
cat .env.local

# Probar manualmente
npm run start
```

**Email no funciona:**
- Verifica que `.env.local` tenga las variables correctas
- Prueba el formulario de test en `/contact`
- Revisa logs: `pm2 logs arrowhead-realty`

**SSL no funciona:**
```bash
certbot renew --dry-run  # Test renewal
certbot certificates     # Ver certificados instalados
```
