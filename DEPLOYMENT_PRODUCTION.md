# Guía de Deployment a Producción

**Proyecto:** The Arrowhead Group
**Versión:** 2.0.0 (con SQLite CMS + Cloudflare R2)
**Fecha:** 2026-03-02

---

## 📋 Pre-requisitos

Antes de deployar, asegúrate de tener:

- ✅ Acceso SSH al servidor (usuario `dev`)
- ✅ Código actual commiteado a git
- ✅ Credenciales de Cloudflare R2 configuradas en `.env.local`
- ✅ Build funcional localmente (`npm run build` sin errores)
- ✅ Base de datos SQLite funcionando localmente

---

## 🚀 Proceso de Deployment

### Paso 1: Preparar en Local

```bash
# 1. Asegúrate de que todo funciona localmente
npm run dev
# Prueba: http://localhost:3000
# Prueba: http://localhost:3000/admin/login

# 2. Detén el servidor dev (Ctrl+C)

# 3. Build del proyecto
npm run build

# Si el build falla, revisa los errores antes de continuar
```

### Paso 2: Commit y Push

```bash
git add .
git commit -m "Update: [describe los cambios]"
git push origin main
```

### Paso 3: Subir Build al Servidor

```powershell
# Desde PowerShell en tu máquina local
# Reemplaza YOUR_DROPLET_IP con la IP real

scp -r .next dev@YOUR_DROPLET_IP:/var/www/arrowhead-realty/broker/
```

**Nota:** Este paso puede tardar 2-5 minutos dependiendo del tamaño del build.

### Paso 4: Conectar al Servidor

```bash
ssh dev@YOUR_DROPLET_IP
cd /var/www/arrowhead-realty/broker
```

### Paso 5: Actualizar Código

```bash
# Pull latest changes
git pull origin main

# Si package.json cambió, reinstalar dependencias
npm install
```

### Paso 6: Configurar Variables de Entorno (Primera vez)

**Solo si es la primera vez que deployeas el CMS:**

```bash
nano .env.local
```

Asegúrate de que tenga todas estas variables:

```env
# Email Configuration
EMAIL_USER=arrowheadrealty.contact@gmail.com
EMAIL_PASS=rjja qshw qmbj xjit
EMAIL_TO=abelardogg.dev@gmail.com

# Database
DATABASE_PATH=./data/arrowhead.db

# Security - IMPORTANTE: Genera uno nuevo con: openssl rand -base64 32
SESSION_SECRET=tu-secret-aleatorio-generado

# Admin credentials - CAMBIAR PASSWORD
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu-password-seguro-aqui
ADMIN_EMAIL=abelardogg.dev@gmail.com

# Cloudflare R2 Storage
R2_ACCOUNT_ID=98790d4f49ee22e1f1c64c0427ee77cf
R2_ACCESS_KEY_ID=c1f28e596c3a8d199961ebf777ba4d06
R2_SECRET_ACCESS_KEY=d4d1819f8e9a27ee7980ca4fd878be0f4f63c53909eb41b773176731610c10f9
R2_BUCKET_NAME=arrowhead
R2_PUBLIC_URL=https://pub-dda599f3c7434fd6afc5efb94beed866.r2.dev
```

Guarda: `Ctrl+O`, `Enter`, `Ctrl+X`

**CRÍTICO: Genera un SESSION_SECRET aleatorio:**
```bash
openssl rand -base64 32
# Copia el resultado y úsalo en SESSION_SECRET
```

### Paso 7: Setup de Base de Datos (Solo primera vez)

**Solo si es la primera vez que deployeas:**

```bash
# Crear directorio de datos si no existe
mkdir -p data

# Setup de base de datos (crea tablas y seed inicial)
npm run db:setup
```

Esto creará:
- `data/arrowhead.db` - Base de datos SQLite
- Tablas: properties, loan_programs, admin_users
- Usuario admin inicial

**Si ya existe la base de datos y solo quieres actualizar el schema:**
```bash
npm run db:migrate
```

### Paso 8: Verificar Permisos

```bash
# Asegurar que el directorio data/ es escribible
chmod 755 data
chmod 644 data/arrowhead.db
```

### Paso 9: Reiniciar PM2

```bash
# Reiniciar la aplicación
pm2 restart arrowhead-realty

# Ver logs en tiempo real
pm2 logs arrowhead-realty --lines 50

# Presiona Ctrl+C para salir de los logs
```

### Paso 10: Verificar que Funciona

```bash
# 1. Verificar que la app está corriendo
pm2 status

# 2. Test del endpoint local
curl http://localhost:3000

# 3. Verificar logs para errores
pm2 logs arrowhead-realty --lines 100 --nostream

# 4. Salir del servidor
exit
```

### Paso 11: Probar en Producción

Abre tu navegador y verifica:

1. **Sitio público:**
   - https://thearrowheadgroup.com
   - https://thearrowheadgroup.com/properties
   - https://thearrowheadgroup.com/contact

2. **Admin Panel:**
   - https://thearrowheadgroup.com/mgmt-c141f580/login
   - Login con las credenciales configuradas
   - Prueba crear/editar una propiedad
   - Prueba subir una imagen

3. **Imágenes en R2:**
   - Sube una imagen en el admin
   - Verifica que se vea en el admin panel
   - Verifica que la URL pública funciona

---

## 🔄 Deployments Futuros (Updates)

Para actualizaciones después del deployment inicial:

```bash
# LOCAL
git add .
git commit -m "Description"
git push
npm run build
scp -r .next dev@YOUR_IP:/var/www/arrowhead-realty/broker/

# SERVER
ssh dev@YOUR_IP
cd /var/www/arrowhead-realty/broker
git pull
npm install  # Solo si package.json cambió
pm2 restart arrowhead-realty
pm2 logs arrowhead-realty --lines 50
exit
```

---

## ⚠️ Problemas Comunes y Soluciones

### Error: "500 Internal Server Error"

**Causa:** Error en la aplicación

**Solución:**
```bash
ssh dev@YOUR_IP
pm2 logs arrowhead-realty --lines 100
# Lee el error y corrige
```

### Error: "502 Bad Gateway"

**Causa:** La aplicación no está corriendo

**Solución:**
```bash
ssh dev@YOUR_IP
pm2 status
pm2 restart arrowhead-realty
# Si no aparece en la lista:
pm2 start npm --name "arrowhead-realty" -- start
pm2 save
```

### Error: "Cannot find module" en production

**Causa:** Dependencias no instaladas

**Solución:**
```bash
ssh dev@YOUR_IP
cd /var/www/arrowhead-realty/broker
rm -rf node_modules
npm install
pm2 restart arrowhead-realty
```

### Error: Base de datos no encontrada

**Causa:** `data/arrowhead.db` no existe

**Solución:**
```bash
ssh dev@YOUR_IP
cd /var/www/arrowhead-realty/broker
npm run db:setup
pm2 restart arrowhead-realty
```

### Error: Imágenes no se suben a R2

**Causa:** Credenciales incorrectas o CORS no configurado

**Solución:**

1. Verificar credenciales en `.env.local`
2. Verificar CORS en Cloudflare R2:
   - Ve a tu bucket en Cloudflare
   - Click en "CORS Policy"
   - Debe tener configurado:
     ```json
     [
       {
         "AllowedOrigins": ["https://thearrowheadgroup.com"],
         "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
         "AllowedHeaders": ["*"]
       }
     ]
     ```

### Error: Admin login no funciona

**Causa:** SESSION_SECRET no configurado o base de datos sin usuario

**Solución:**
```bash
ssh dev@YOUR_IP
cd /var/www/arrowhead-realty/broker

# Verificar .env.local
cat .env.local | grep SESSION_SECRET

# Regenerar base de datos si es necesario
rm data/arrowhead.db
npm run db:setup
pm2 restart arrowhead-realty
```

---

## 🔐 Seguridad en Producción

### Cambios CRÍTICOS antes de usar en producción:

1. **Cambiar password del admin:**
   ```bash
   # En el servidor
   nano .env.local
   # Cambiar ADMIN_PASSWORD a algo seguro

   # Regenerar base de datos
   rm data/arrowhead.db
   npm run db:setup
   pm2 restart arrowhead-realty
   ```

2. **Generar SESSION_SECRET aleatorio:**
   ```bash
   openssl rand -base64 32
   # Copiar el resultado a .env.local SESSION_SECRET
   ```

3. **Actualizar CORS en R2:**
   - Solo permitir tu dominio
   - Cambiar `AllowedOrigins: ["*"]` a `["https://thearrowheadgroup.com"]`

---

## 💾 Backups

### Backup de Base de Datos

**Automatizar backup diario:**

```bash
# En el servidor, crear script de backup
nano ~/backup-db.sh
```

Contenido:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
cp /var/www/arrowhead-realty/broker/data/arrowhead.db \
   /var/www/arrowhead-realty/broker/data/backups/arrowhead-$DATE.db
# Mantener solo últimos 7 días
find /var/www/arrowhead-realty/broker/data/backups/ -name "arrowhead-*.db" -mtime +7 -delete
```

```bash
# Hacer ejecutable
chmod +x ~/backup-db.sh

# Crear directorio de backups
mkdir -p /var/www/arrowhead-realty/broker/data/backups

# Agregar a crontab (corre diariamente a las 2am)
crontab -e
# Agregar esta línea:
0 2 * * * /home/dev/backup-db.sh
```

### Descargar Backup a Local

```bash
# Desde tu máquina local
scp dev@YOUR_IP:/var/www/arrowhead-realty/broker/data/arrowhead.db ./backup-$(date +%Y%m%d).db
```

---

## 📊 Monitoreo

### Ver estadísticas de PM2

```bash
ssh dev@YOUR_IP
pm2 monit
# Presiona 'q' para salir
```

### Ver uso de recursos

```bash
ssh dev@YOUR_IP
free -h        # Memoria
df -h          # Disco
pm2 status     # Apps running
```

---

## 📝 Checklist de Deployment

Antes de hacer deployment a producción, verifica:

- [ ] `npm run build` funciona sin errores localmente
- [ ] Variables de entorno configuradas en servidor
- [ ] SESSION_SECRET generado aleatoriamente
- [ ] Password de admin cambiado
- [ ] CORS configurado en Cloudflare R2
- [ ] Base de datos creada con `npm run db:setup`
- [ ] Build subido al servidor via SCP
- [ ] Código actualizado con `git pull`
- [ ] PM2 reiniciado
- [ ] Sitio público funciona (https://thearrowheadgroup.com)
- [ ] Admin panel funciona (https://thearrowheadgroup.com/mgmt-c141f580)
- [ ] Subida de imágenes funciona
- [ ] Backup de base de datos configurado

---

## 🆘 Soporte

Si algo sale mal y necesitas ayuda:

1. **Ver logs detallados:**
   ```bash
   pm2 logs arrowhead-realty --lines 200
   ```

2. **Reiniciar todo:**
   ```bash
   pm2 restart arrowhead-realty
   sudo systemctl restart nginx
   ```

3. **Volver a versión anterior:**
   ```bash
   cd /var/www/arrowhead-realty/broker
   git log --oneline  # Ver commits recientes
   git checkout <commit-hash>
   pm2 restart arrowhead-realty
   ```

---

**Última Actualización:** 2026-03-02
**Versión:** 2.0.0 (CMS + R2 Integration)
