# Deployment Guide - Arrowhead Realty (Digital Ocean)

## Información del Deployment Actual
- **Dominio:** thearrowheadgroup.com
- **Servidor:** Digital Ocean Droplet
- **Usuario SSH:** dev
- **Directorio:** /var/www/arrowhead-realty/broker
- **Estado:** ✅ Producción activa con HTTPS

---

## Setup Inicial (Una sola vez)

### 0. Crear usuario no-root
```bash
# Conectado como root
ssh root@your-droplet-ip

# Crear nuevo usuario (usamos 'dev')
adduser dev

# Agregar a grupo sudo
usermod -aG sudo dev

# Agregar al grupo www-data (para permisos de Nginx)
usermod -aG www-data dev

# Configurar SSH para el nuevo usuario
mkdir -p /home/dev
chown dev:dev /home/dev
mkdir -p /home/dev/.ssh
cp /root/.ssh/authorized_keys /home/dev/.ssh/
chown -R dev:dev /home/dev/.ssh
chmod 700 /home/dev/.ssh
chmod 600 /home/dev/.ssh/authorized_keys

# Probar conexión con nuevo usuario (en otra terminal)
ssh dev@your-droplet-ip
```

**De ahora en adelante, usa el usuario 'dev' para todo**

### 1. Instalar Node.js 20.x y PM2
```bash
# Conectado como dev
ssh dev@your-droplet-ip

# Instalar Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
sudo apt-get install -y nodejs

# Verificar instalación
node --version  # Debe mostrar v20.x
npm --version

# Instalar PM2 (process manager global)
sudo npm install -g pm2
```

### 2. Crear Swap (IMPORTANTE para droplets con poca RAM)
**Problema:** npm install y npm build fallan con "Killed" o "Bus error (core dumped)"
**Solución:** Crear swap file de 2-4GB

```bash
# Crear swap de 2GB (aumentar a 4GB si es necesario)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Hacer permanente (sobrevive reinicios)
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verificar que esté activo
swapon --show
free -h
```

### 3. Clonar repositorio
```bash
# Crear directorio
sudo mkdir -p /var/www/arrowhead-realty
sudo chown -R dev:www-data /var/www/arrowhead-realty

# Clonar repo
cd /var/www/arrowhead-realty
git clone https://github.com/tu-usuario/tu-repo.git broker
cd broker
```

### 4. Instalar dependencias
```bash
cd /var/www/arrowhead-realty/broker

# Instalar dependencias (usa el swap que creamos)
npm install
```

### 5. Configurar variables de entorno
```bash
# Crear .env.local en el servidor
nano /var/www/arrowhead-realty/broker/.env.local
```

**Contenido del .env.local:**
```env
# Email Configuration
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-de-gmail
EMAIL_TO=destinatario@ejemplo.com
NODE_ENV=production
```

Guarda con `Ctrl+O`, Enter, `Ctrl+X`

**IMPORTANTE:** Nunca commitees .env.local al repositorio (ya está en .gitignore)

### 6. Build de la aplicación

**PROBLEMA CRÍTICO:** El servidor tiene muy poca RAM (~469MB) y el build falla con "Bus error"
**SOLUCIÓN:** Construir en tu máquina local y subir el build por SCP

#### En tu máquina local (Windows):
```bash
# Construir la aplicación
npm run build
```

#### Subir el build al servidor:
```powershell
# Desde PowerShell en la carpeta del proyecto
scp -r .next dev@your-droplet-ip:/var/www/arrowhead-realty/broker/

# También asegúrate de que .env.local esté en el servidor
scp .env.local dev@your-droplet-ip:/var/www/arrowhead-realty/broker/
```

### 7. Configurar PM2 (Process Manager)
```bash
# En el servidor
cd /var/www/arrowhead-realty/broker

# Iniciar la aplicación con PM2
pm2 start npm --name "arrowhead-realty" -- start

# Configurar PM2 para arrancar automáticamente al reiniciar el servidor
pm2 startup
# Ejecuta el comando que PM2 te sugiere (probablemente con sudo)

# Guardar la configuración actual de PM2
pm2 save

# Verificar estado
pm2 status
pm2 logs arrowhead-realty
```

### 8. Configurar Nginx
```bash
# Crear archivo de configuración
sudo nano /etc/nginx/sites-available/arrowhead-realty
```

**Configuración de Nginx:**
```nginx
server {
    listen 80;
    server_name thearrowheadgroup.com www.thearrowheadgroup.com;

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
# Activar el sitio
sudo ln -s /etc/nginx/sites-available/arrowhead-realty /etc/nginx/sites-enabled/

# Remover sitio default si existe
sudo rm /etc/nginx/sites-enabled/default

# Testear configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx

# Verificar estado
sudo systemctl status nginx
```

### 9. Configurar SSL con Let's Encrypt
```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL
sudo certbot --nginx -d thearrowheadgroup.com -d www.thearrowheadgroup.com

# Sigue las instrucciones:
# - Ingresa tu email
# - Acepta términos (Y)
# - Certbot configurará automáticamente HTTPS y redirección

# Verificar renovación automática
sudo certbot renew --dry-run
```

### 10. Configurar Firewall (Opcional pero recomendado)
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## Actualizaciones Recurrentes (Cuando hagas cambios)

### Opción A: Actualización completa (código + build local)

**1. En tu máquina local:**
```bash
# Hacer tus cambios de código
# Commitear a git
git add .
git commit -m "descripción de cambios"
git push

# Construir localmente
npm run build
```

**2. Subir build al servidor:**
```powershell
# Desde PowerShell en la carpeta del proyecto
scp -r .next dev@your-droplet-ip:/var/www/arrowhead-realty/broker/
```

**3. En el servidor:**
```bash
# SSH al servidor
ssh dev@your-droplet-ip

# Actualizar código
cd /var/www/arrowhead-realty/broker
git pull

# Reinstalar dependencias (solo si package.json cambió)
npm install

# Reiniciar aplicación
pm2 restart arrowhead-realty

# Ver logs para verificar
pm2 logs arrowhead-realty --lines 50
```

### Opción B: Solo cambios de código (sin build)

Si solo cambiaste archivos que no requieren rebuild (ej: .env.local):

```bash
# SSH al servidor
ssh dev@your-droplet-ip

# Actualizar código
cd /var/www/arrowhead-realty/broker
git pull

# Reiniciar aplicación
pm2 restart arrowhead-realty
```

### Actualizar variables de entorno

```bash
# Editar .env.local en el servidor
ssh dev@your-droplet-ip
cd /var/www/arrowhead-realty/broker
nano .env.local

# Después de editar, reinicia la app
pm2 restart arrowhead-realty
```

---

## Comandos Útiles

### PM2 (Process Manager)
```bash
pm2 status                    # Ver estado de todas las apps
pm2 logs arrowhead-realty     # Ver logs en tiempo real
pm2 logs arrowhead-realty --lines 100  # Ver últimas 100 líneas
pm2 restart arrowhead-realty  # Reiniciar app
pm2 stop arrowhead-realty     # Detener app
pm2 start arrowhead-realty    # Iniciar app
pm2 delete arrowhead-realty   # Eliminar de PM2
pm2 monit                     # Monitor de recursos en tiempo real
pm2 save                      # Guardar configuración actual
```

### Nginx
```bash
sudo systemctl status nginx   # Ver estado
sudo systemctl restart nginx  # Reiniciar
sudo systemctl reload nginx   # Recargar configuración sin downtime
sudo nginx -t                 # Testear configuración
tail -f /var/log/nginx/access.log  # Ver logs de acceso
tail -f /var/log/nginx/error.log   # Ver logs de errores
```

### SSL/Certbot
```bash
sudo certbot certificates           # Ver certificados instalados
sudo certbot renew                  # Renovar certificados manualmente
sudo certbot renew --dry-run        # Test de renovación
```

### Sistema
```bash
swapon --show                 # Ver swap activo
free -h                       # Ver uso de memoria
df -h                         # Ver uso de disco
htop                          # Monitor de recursos (si está instalado)
```

---

## Troubleshooting

### Error: "502 Bad Gateway"
**Causa:** La aplicación no está corriendo

**Solución:**
```bash
# Verificar estado de PM2
pm2 status

# Si está "stopped" o "errored"
pm2 logs arrowhead-realty

# Reiniciar
pm2 restart arrowhead-realty

# Si sigue fallando, revisar logs
pm2 logs arrowhead-realty --lines 200
```

### Error: npm install falla con "Killed"
**Causa:** Falta de memoria RAM

**Solución:**
```bash
# Verificar si el swap está activo
swapon --show

# Si no hay swap, créalo (ver sección 2 arriba)
# Si ya existe pero es pequeño, aumenta el tamaño:
sudo swapoff /swapfile
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Error: npm run build falla con "Bus error (core dumped)"
**Causa:** Droplet con muy poca RAM (< 512MB)

**Solución:** Construir localmente y subir por SCP (ver sección 6)

### El formulario de contacto no envía emails
**Posibles causas:**

1. Variables de entorno incorrectas
```bash
# Verificar .env.local
cat /var/www/arrowhead-realty/broker/.env.local

# Debe contener EMAIL_USER, EMAIL_PASS, EMAIL_TO
```

2. Gmail bloqueando el App Password
- Verifica que el App Password sea correcto
- Asegúrate de tener 2FA activado en Gmail

3. Ver logs de la aplicación
```bash
pm2 logs arrowhead-realty
```

### SSL no funciona o expira
```bash
# Ver certificados instalados
sudo certbot certificates

# Renovar manualmente
sudo certbot renew

# Ver logs de Certbot
sudo tail -f /var/log/letsencrypt/letsencrypt.log
```

### Cambios de código no se reflejan
```bash
# Asegúrate de:
# 1. Haber construido localmente (npm run build)
# 2. Subido el .next por SCP
# 3. Reiniciado PM2

pm2 restart arrowhead-realty

# Limpiar caché de PM2
pm2 delete arrowhead-realty
pm2 start npm --name "arrowhead-realty" -- start
pm2 save
```

---

## Notas Importantes

### Archivos que NO se deben commitear
Ya están en `.gitignore`:
- `.env.local` - Variables de entorno con secretos
- `.next/` - Build de Next.js
- `node_modules/` - Dependencias
- `.claude/` - Archivos de desarrollo

### Workflow recomendado para desarrollo

1. **Desarrollar localmente**
   - Hacer cambios
   - Probar con `npm run dev`

2. **Construir localmente**
   - `npm run build`
   - Verificar que no haya errores

3. **Commitear cambios**
   ```bash
   git add .
   git commit -m "descripción"
   git push
   ```

4. **Desplegar a producción**
   - Subir build: `scp -r .next dev@droplet-ip:/var/www/arrowhead-realty/broker/`
   - SSH al servidor
   - `git pull`
   - `pm2 restart arrowhead-realty`

### Backup recomendado

Hacer backup periódico de:
- `/var/www/arrowhead-realty/broker/.env.local` - Variables de entorno
- Configuración de Nginx: `/etc/nginx/sites-available/arrowhead-realty`
- Certificados SSL (Let's Encrypt se renuevan solos)

---

## Información de Contacto del Servidor

- **IP Droplet:** (configurable en Digital Ocean)
- **Dominio:** thearrowheadgroup.com
- **Usuario SSH:** dev
- **Puerto SSH:** 22 (default)
- **Directorio app:** /var/www/arrowhead-realty/broker

---

**Última actualización:** 2026-02-01
**Versión deployment:** 1.0.0 Production
