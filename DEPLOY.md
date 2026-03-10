# Guía de Deploy a Vercel - Velour Studio

## 📋 Pre-requisitos

- Cuenta en [Vercel](https://vercel.com) (puedes usar GitHub para login)
- Repositorio Git del proyecto (GitHub, GitLab o Bitbucket)
- Variables de entorno configuradas

## 🚀 Método 1: Deploy desde GitHub (Recomendado)

### Paso 1: Preparar el repositorio

1. Inicializa Git si no lo has hecho:

```bash
cd velour-studio
git init
```

2. Crea un archivo `.gitignore` (si no existe):

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

3. Commit inicial:

```bash
git add .
git commit -m "feat: Initial commit - Velour Studio website"
```

4. Crea un repositorio en GitHub y súbelo:

```bash
git branch -M main
git remote add origin https://github.com/tu-usuario/velour-studio.git
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Haz click en "Import Git Repository"
3. Selecciona tu repositorio `velour-studio`
4. Vercel detectará automáticamente que es un proyecto Next.js

### Paso 3: Configurar el proyecto

En la pantalla de configuración:

**Framework Preset**: Next.js (detectado automáticamente)
**Root Directory**: `./` (dejar por defecto)
**Build Command**: `npm run build` (por defecto)
**Output Directory**: `.next` (por defecto)
**Install Command**: `npm install` (por defecto)

### Paso 4: Configurar Environment Variables

En la sección "Environment Variables", agrega:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=573001234567
NEXT_PUBLIC_BUSINESS_EMAIL=hola@velour.studio
NEXT_PUBLIC_BUSINESS_ADDRESS=Cra. 74 #33-12, Laureles, Medellín
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/velour.studio
NEXT_PUBLIC_N8N_WEBHOOK_VISITAS=https://tu-n8n.com/webhook/visitas
NEXT_PUBLIC_N8N_WEBHOOK_LISTA_ESPERA=https://tu-n8n.com/webhook/lista-espera
```

⚠️ **Importante**: Usa los valores reales de producción, no los del `.env.local` de desarrollo.

### Paso 5: Deploy!

1. Haz click en "Deploy"
2. Vercel construirá y deployará tu sitio
3. Obtendrás una URL de producción tipo `velour-studio-xxxx.vercel.app`

🎉 **¡Listo!** Cada push a la rama `main` deployará automáticamente.

---

## 🔧 Método 2: Deploy con Vercel CLI

### Instalación de Vercel CLI

```bash
npm i -g vercel
```

### Login a Vercel

```bash
vercel login
```

Selecciona tu método de autenticación (GitHub, GitLab, email).

### Deploy del proyecto

1. Navega al directorio del proyecto:

```bash
cd velour-studio
```

2. Ejecuta el comando de deploy:

```bash
vercel
```

3. Responde las preguntas:

```
? Set up and deploy "~/velour-studio"? [Y/n] y
? Which scope do you want to deploy to? (tu-usuario)
? Link to existing project? [y/N] n
? What's your project's name? velour-studio
? In which directory is your code located? ./
```

4. El CLI detectará Next.js y configurará automáticamente

5. Configura las env variables cuando se soliciten

6. Vercel construirá y deployará el sitio

### Deploy a producción

Para hacer deploy directo a producción:

```bash
vercel --prod
```

---

## 🌐 Configurar Dominio Personalizado

### Si tienes un dominio:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Domains
3. Agrega tu dominio: `www.velour.studio`
4. Vercel te dará registros DNS para configurar:
   - Tipo: `CNAME`
   - Host: `www`
   - Value: `cname.vercel-dns.com`

5. Configura los DNS en tu proveedor de dominio
6. Espera la propagación (5-60 minutos)
7. Vercel generará automáticamente SSL

### Dominio gratuito de Vercel:

Tu proyecto estará disponible en:

- `velour-studio.vercel.app` (puedes personalizarlo)
- `velour-studio-git-main-tu-usuario.vercel.app`

---

## 📊 Post-Deploy: Verificaciones

### 1. Verificar que el sitio cargue

Visita la URL de producción y verifica todas las páginas:

- ✅ Home: `/`
- ✅ Catálogo: `/catalogo`
- ✅ Producto: `/producto/vestido-lapiz-clasico`
- ✅ Sobre Valentina: `/sobre-valentina`
- ✅ Contacto: `/contacto`
- ✅ Velour Edit: `/velour-edit`

### 2. Verificar funcionalidades

- ✅ Filtros del catálogo funcionan
- ✅ Links de WhatsApp abren correctamente
- ✅ Formulario de contacto envía datos
- ✅ Formulario de lista de espera funciona
- ✅ Navegación móvil responsive

### 3. Verificar APIs

Prueba los endpoints:

```bash
curl -X POST https://tu-sitio.vercel.app/api/agendar-visita \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","email":"test@test.com","telefono":"3001234567","fecha":"2025-02-15","hora":"14:00"}'
```

### 4. SEO Check

- ✅ Sitemap: `https://tu-sitio.vercel.app/sitemap.xml`
- ✅ Robots: `https://tu-sitio.vercel.app/robots.txt`
- ✅ Meta tags con Open Graph

### 5. Performance con Lighthouse

```bash
npm install -g lighthouse
lighthouse https://tu-sitio.vercel.app --view
```

**Targets mínimos:**

- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 95+

---

## 🔄 CI/CD Automático

Con Vercel + GitHub, tienes CI/CD automático:

### Branches

- `main` → Production deploy automático
- Otros branches → Preview deploys

### Preview Deploys

Cada PR genera un preview deploy único:

- URL tipo: `velour-studio-git-feature-branch.vercel.app`
- Ideal para testing antes de merge

---

## 🔐 Environment Variables en Vercel

### Agregar nueva variable:

1. Dashboard → Settings → Environment Variables
2. Add → Ingresa Key y Value
3. Selecciona environments (Production, Preview, Development)
4. Save

### Variables sensibles:

- No commitees `.env.local`
- Usa Vercel Dashboard para production secrets
- Las variables deben empezar con `NEXT_PUBLIC_` para estar accesibles en el cliente

---

## 🐛 Troubleshooting Deploy

### Error: "Build failed"

```bash
# Localmente, prueba el build:
npm run build

# Si falla localmente, revisa los logs
# Si funciona localmente, verifica env variables en Vercel
```

### Error: "Environment variable not found"

- Ve a Settings → Environment Variables
- Asegúrate de que estén en "Production"
- Redeploya el sitio

### Error 500 en producción

- Revisa Vercel Logs: Dashboard → Deployments → "View Function Logs"
- Verifica que los webhooks de n8n estén accesibles públicamente

### Sitio no actualiza después del deploy

- Limpia caché de Vercel: Settings → Caching → Purge Cache
- Limpia caché del navegador (Ctrl + Shift + R)

---

## 📈 Monitoreo Post-Deploy

### Analytics

Vercel incluye Analytics básicos gratis:

- Dashboard → Analytics
- Pageviews, unique visitors, top pages

### Agregar Google Analytics

1. Obtén tu GA4 Measurement ID
2. Agrega a `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Crea `app/components/GoogleAnalytics.jsx`:

   ```jsx
   "use client";
   import Script from "next/script";

   export default function GoogleAnalytics() {
     const gaId = process.env.NEXT_PUBLIC_GA_ID;
     if (!gaId) return null;

     return (
       <>
         <Script
           src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
           strategy="afterInteractive"
         />
         <Script id="google-analytics" strategy="afterInteractive">
           {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', '${gaId}');
           `}
         </Script>
       </>
     );
   }
   ```

4. Importa en `app/layout.js`

---

## ✅ Checklist Final

- [ ] Sitio deployado y accesible
- [ ] Todas las páginas cargan correctamente
- [ ] Links de WhatsApp funcionan
- [ ] Formularios envían datos
- [ ] Imágenes cargan (aunque sean placeholders)
- [ ] Responsive en móvil (prueba con Chrome DevTools)
- [ ] Lighthouse score > 90 en todas las categorías
- [ ] Dominio personalizado configurado (si aplica)
- [ ] Analytics configurado
- [ ] Sitemap accesible
- [ ] Robots.txt accesible
- [ ] n8n webhooks funcionando (si aplica)

---

## 🎉 ¡Felicidades!

Tu sitio de Velour Studio está en producción. Comparte la URL:

**Sitio en vivo:** `https://velour-studio.vercel.app`

**Dashboard Vercel:** `https://vercel.com/tu-usuario/velour-studio`

---

## 📚 Recursos Adicionales

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Environment Variables Guide](https://vercel.com/docs/environment-variables)

---

Desarrollado con ❤️ por EternalGrowth
