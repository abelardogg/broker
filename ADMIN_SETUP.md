# Admin Panel Setup Guide

## Sistema Implementado

Has instalado exitosamente un sistema CRUD ligero con SQLite para gestionar el contenido de tu sitio web sin necesidad de CMS externo.

## Características

- ✅ **Base de datos SQLite** (archivo local, cero configuración)
- ✅ **Admin panel protegido** con autenticación
- ✅ **Gestión de propiedades** (próximamente)
- ✅ **Gestión de loan programs** (próximamente)
- ✅ **Extremadamente ligero** (<50MB RAM adicionales)
- ✅ **Datos existentes migrados** automáticamente

---

## Acceso al Admin Panel

### URLs
- **Login:** http://localhost:3000/admin/login (dev) o https://thearrowheadgroup.com/admin/login (prod)
- **Dashboard:** http://localhost:3000/admin

### Credenciales por Defecto
```
Username: admin
Password: admin123
```

⚠️ **IMPORTANTE:** Cambia esta contraseña inmediatamente en producción.

---

## Scripts NPM Disponibles

### Desarrollo
```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
```

### Base de Datos
```bash
npm run db:generate  # Generar migraciones desde schema
npm run db:migrate   # Ejecutar migraciones pendientes
npm run db:seed      # Poblar DB con datos iniciales
npm run db:studio    # Abrir Drizzle Studio (visualizador de BD)
npm run db:setup     # Setup completo (generate + migrate + seed)
```

---

## Estructura de Archivos

```
broker/
├── data/
│   └── arrowhead.db              # ← Base de datos SQLite (gitignored)
│
├── lib/
│   ├── db/
│   │   ├── index.ts              # Conexión a DB
│   │   ├── schema.ts             # Definición de tablas
│   │   ├── migrate.ts            # Script de migración
│   │   ├── seed.ts               # Script de seed
│   │   └── migrations/           # Archivos SQL de migración
│   ├── auth.ts                   # Helpers de autenticación
│   └── admin-auth.ts             # Protección de rutas admin
│
├── app/
│   ├── admin/
│   │   ├── layout.tsx            # Layout del admin
│   │   ├── page.tsx              # Dashboard
│   │   ├── login/page.tsx        # Página de login
│   │   ├── properties/           # CRUD de propiedades (próximo)
│   │   └── loan-programs/        # CRUD de loan programs (próximo)
│   │
│   └── api/admin/
│       └── auth/                 # Endpoints de autenticación
│           ├── login/route.ts
│           ├── logout/route.ts
│           └── verify/route.ts
│
├── components/admin/
│   └── AdminNav.tsx              # Navegación del admin panel
│
└── middleware.ts                 # Protección básica de rutas
```

---

## Esquema de Base de Datos

### Tabla: `properties`
```sql
- id (integer, primary key)
- slug (text, unique)
- address, city, state, zipCode
- price, beds, baths, sqft
- lotSize, yearBuilt
- propertyType, status
- description
- features (JSON array)
- images (JSON array)
- mainImage
- mlsNumber, virtualTourUrl
- createdAt, updatedAt
```

### Tabla: `loan_programs`
```sql
- id (integer, primary key)
- slug (text, unique)
- name, shortDescription, fullDescription
- icon (Lucide icon name)
- minDownPayment, maxLoanAmount
- features (JSON array)
- requirements (JSON array)
- benefits (JSON array)
- isActive, displayOrder
- createdAt, updatedAt
```

### Tabla: `admin_users`
```sql
- id (integer, primary key)
- username (text, unique)
- passwordHash
- email
- isActive
- createdAt, lastLogin
```

---

## Cómo Gestionar la Base de Datos

### Ver datos con Drizzle Studio
```bash
npm run db:studio
```
Esto abrirá una interfaz web en http://localhost:4983 donde puedes ver y editar registros.

### Backup de la base de datos
```bash
# En tu servidor
cp data/arrowhead.db data/arrowhead-backup-$(date +%Y%m%d).db

# O descargar a local
scp dev@your-server:/var/www/arrowhead-realty/broker/data/arrowhead.db ./backup.db
```

### Restaurar backup
```bash
# Reemplazar base de datos actual
cp data/arrowhead-backup-20260212.db data/arrowhead.db

# Restart PM2
pm2 restart arrowhead-realty
```

### Resetear base de datos
```bash
# ⚠️ CUIDADO: Esto borrará TODOS los datos
rm data/arrowhead.db
npm run db:setup
```

---

## Cambiar Contraseña del Admin

### Opción 1: Vía Drizzle Studio
1. `npm run db:studio`
2. Ir a tabla `admin_users`
3. Generar nuevo hash con bcrypt (online: https://bcrypt-generator.com/)
4. Actualizar campo `password_hash`

### Opción 2: Vía código
```typescript
// lib/db/change-password.ts
import { hash } from 'bcryptjs'
import { db, adminUsers } from './index'
import { eq } from 'drizzle-orm'

async function changePassword() {
  const newPassword = 'tu_nueva_contraseña_segura'
  const passwordHash = await hash(newPassword, 10)

  await db
    .update(adminUsers)
    .set({ passwordHash })
    .where(eq(adminUsers.username, 'admin'))

  console.log('Password updated!')
}

changePassword()
```

Ejecutar con: `tsx lib/db/change-password.ts`

---

## Deployment a Producción

### 1. Build localmente (por problema de RAM)
```bash
npm run build
```

### 2. Subir archivos al servidor
```powershell
# Upload .next build
scp -r .next dev@your-ip:/var/www/arrowhead-realty/broker/

# Upload código
ssh dev@your-ip
cd /var/www/arrowhead-realty/broker
git pull
```

### 3. Setup base de datos en servidor (solo primera vez)
```bash
ssh dev@your-ip
cd /var/www/arrowhead-realty/broker
npm run db:setup
```

### 4. Restart aplicación
```bash
pm2 restart arrowhead-realty
```

---

## Migración de Datos

### Datos ya migrados ✅
- ✅ 3 propiedades desde `scripts/data/properties.json`
- ✅ 4 loan programs desde `lib/config.ts`
- ✅ 1 usuario admin

### Agregar nuevas propiedades
Dos opciones:
1. **Via Admin Panel** (próximamente implementado)
2. **Via Drizzle Studio** (`npm run db:studio`)
3. **Via SQL directo:**

```typescript
// scripts/add-property.ts
import { db, properties } from '@/lib/db'

await db.insert(properties).values({
  slug: 'my-property',
  address: '123 Main St',
  city: 'San Bernardino',
  state: 'CA',
  zipCode: '92408',
  price: 450000,
  beds: 3,
  baths: 2,
  sqft: 1500,
  propertyType: 'single-family',
  status: 'active',
  description: '...',
  features: JSON.stringify(['feature1', 'feature2']),
  images: JSON.stringify(['url1', 'url2']),
  mainImage: 'url1',
})
```

---

## Próximos Pasos

1. **Implementar CRUD UI** para Properties y Loan Programs
2. **Actualizar frontend** para leer desde la base de datos
3. **Upload de imágenes** para propiedades
4. **Cambiar contraseña** del admin en producción

---

## Recursos

- **Drizzle ORM Docs:** https://orm.drizzle.team/docs/overview
- **SQLite Docs:** https://www.sqlite.org/docs.html
- **Better SQLite3:** https://github.com/WiseLibs/better-sqlite3

---

## Ventajas de esta Solución

✅ **Costo:** $0 adicionales (funciona en tu droplet de $4/mes)
✅ **RAM:** <50MB adicionales
✅ **Velocidad:** Consultas extremadamente rápidas
✅ **Simplicidad:** Todo en un archivo, fácil de backup
✅ **Migración futura:** Fácil exportar a PostgreSQL/MySQL si escala
✅ **No dependencias externas:** No requiere servicio de BD adicional

---

**Última actualización:** 2026-02-12
**Versión:** 1.0.0
