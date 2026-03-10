# Velour Studio - Sitio Web

Sitio web oficial de Velour Studio, marca de slow fashion en Medellín, Colombia.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 16.1.6 con App Router
- **Lenguaje**: JavaScript (ES6+)
- **Estilos**: Tailwind CSS v4
- **Runtime**: React 19.2.3
- **Deployment**: Vercel

## 📁 Estructura del Proyecto

```
velour-studio/
├── app/
│   ├── api/                      # API Routes
│   │   ├── agendar-visita/      # Endpoint para agendar visitas
│   │   └── lista-espera/        # Endpoint para lista de espera Velour Edit
│   ├── components/              # Componentes React reutilizables
│   │   ├── FilterBar.jsx        # Barra de filtros del catálogo
│   │   ├── Footer.jsx           # Footer global
│   │   ├── Header.jsx           # Header con navegación
│   │   ├── ProductCard.jsx      # Tarjeta de producto
│   │   └── ProductGallery.jsx   # Galería de imágenes del producto
│   ├── data/                    # Datos estáticos
│   │   └── lineas.js            # Definición de las 4 líneas de producto
│   ├── lib/                     # Utilidades y helpers
│   │   ├── productos.js         # Mock data de 30 productos
│   │   ├── utils.js             # Funciones de utilidad general
│   │   └── whatsapp.js          # Integración con WhatsApp Business
│   ├── catalogo/                # Página de catálogo con filtros
│   ├── contacto/                # Página de contacto y agendamiento
│   ├── producto/[id]/           # Páginas dinámicas de productos
│   ├── sobre-valentina/         # Página sobre la fundadora
│   ├── velour-edit/             # Página de colecciones limitadas
│   ├── layout.js                # Layout raíz con metadatos
│   ├── page.js                  # Home page
│   ├── globals.css              # Estilos globales y variables CSS
│   └── sitemap.js               # Generador de sitemap
├── public/                      # Archivos estáticos
│   └── robots.txt               # Configuración para crawlers
├── .env.local                   # Variables de entorno (no committear)
└── package.json
```

## 🛠️ Instalación y Desarrollo

### Requisitos previos

- Node.js 18+ y npm

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
# WhatsApp Business
NEXT_PUBLIC_WHATSAPP_NUMBER=573001234567

# n8n Webhooks (opcional para integraciones)
NEXT_PUBLIC_N8N_WEBHOOK_VISITAS=https://tu-n8n.com/webhook/visitas
NEXT_PUBLIC_N8N_WEBHOOK_LISTA_ESPERA=https://tu-n8n.com/webhook/lista-espera

# Información del negocio
NEXT_PUBLIC_BUSINESS_EMAIL=hola@velour.studio
NEXT_PUBLIC_BUSINESS_ADDRESS=Cra. 74 #33-12, Laureles, Medellín
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/velour.studio
```

### Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de producción

```bash
npm run build
npm start
```

## 🚀 Deploy a Vercel

Consulta [DEPLOY.md](./DEPLOY.md) para una guía completa de deployment.

Quick start:

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 🎨 Líneas de Producto

1. **Velour Clásica** (40% ventas) - Atemporales profesionales ($180k-$380k)
2. **Velour Noche** (25% ventas) - Elegancia especial ($260k-$480k)
3. **Velour Co.** (25% ventas) - Casual sostenible ($150k-$320k)
4. **Velour Edit** (10% ventas) - Limited editions ($320k-$520k)

## 📱 Integraciones

- **WhatsApp Business**: Consultas, agendamiento y compras
- **n8n Webhooks**: CRM, emails, Calendar (opcional)

## 📊 SEO

- Metadata optimizado por página
- Sitemap dinámico: `/sitemap.xml`
- robots.txt configurado
- Open Graph tags

## 🎨 Sistema de Diseño

Paleta Velour:

- Cream `#F8F6F3`, Beige `#E8DED2`, Taupe `#8B7E74`
- Charcoal `#2D2D2D`, Black `#1A1A1A`, Burgundy `#6B2737`

## 📝 Next Steps

- [ ] Reemplazar imágenes placeholder
- [ ] Configurar Google Analytics
- [ ] Conectar CMS (Sanity recomendado)
- [ ] Dominio personalizado
- [ ] Lighthouse testing (target 90+)

## 📄 Licencia

© 2025 Velour Studio. Desarrollado por [EternalGrowth](https://eternalgrowth.co)
