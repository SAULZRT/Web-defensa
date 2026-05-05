# DarKlinca Defense - Puños de Defensa Personal

Un sitio web moderno y agresivo para la empresa DarKlinca Defense, especializada en la venta de puños de defensa personal.

## Descripción

Este sitio web presenta una interfaz oscura y moderna con acentos rojos, diseñada para inspirar confianza y fuerza. Incluye un catálogo de 3 tipos diferentes de puños de defensa personal con carrito de compras funcional.

## Características

✅ **Frontend:**
- Diseño responsivo (mobile-first) con tema oscuro + rojo
- Navegación fija con menú hamburguesa para móviles
- Catálogo de 3 productos con imágenes
- Carrito de compras con almacenamiento local
- Formulario de contacto con validación
- Sección de testimonios de clientes
- Notificaciones para acciones del usuario

✅ **Carrito de Compras:**
- Agregar/eliminar productos
- Cálculo automático de totales
- Persistencia en navegador (localStorage)
- Modal para visualizar carrito
- Botón "Solicitar Cotización" (sin pagos automáticos)

✅ **Formulario de Contacto:**
- Validación de campos requeridos
- Envío real de emails via EmailJS
- Notificaciones de éxito/error
- Configuración gratuita

## Tecnologías Utilizadas

**Frontend:**
- HTML5
- CSS3 (sin frameworks)
- JavaScript vanilla (sin dependencias externas)

## Estructura del Proyecto

```
web-defensa/
├── public/
│   ├── index.html          # Página principal
│   ├── style.css           # Estilos CSS
│   └── images/             # Imágenes y videos de productos
│       ├── puño_dis.jpeg       # Thumbnail del Puño Taser
│       ├── puño_taser_video.mp4 # Video del Puño Taser
│       ├── puño_aniquilador.jpeg # Puño Aniquilador
│       └── puño_pain.jpeg      # Puño Pain
├── productos/              # Carpeta original de imágenes
└── README.md               # Este archivo
```

## Productos

1. **Puño Taser** ($25) - Puño eléctrico con descarga (imagen + video al click)
2. **Puño Aniquilador** ($10) - Puño de máxima potencia
3. **Puño Pain** ($10) - Puño diseñado para causar máximo impacto
│   ├── package.json        # Dependencias
│   ├── .env.example        # Variables de ejemplo
│   └── .env                # Variables (crear desde .env.example)
├── design/
│   └── brief.md            # Documento de diseño original
├── GUIA_PRODUCCION.md      # Guía completa para producción
├── PAYMENT_SETUP.md        # Guía de configuración de Stripe
├── setup.bat               # Script de setup automático
└── README.md               # Este archivo
```

## Quick Start

### Opción A: Setup automático (Windows PowerShell)
```powershell
.\setup.bat
```

### Opción B: Setup manual

**1. Iniciar el sitio web:**
```powershell
cd c:\Users\user\Desktop\web-defensa\public
python -m http.server 8000
```

**2. Abre tu navegador:**
```
http://localhost:8000
```

## Configuración del Formulario de Contacto

**Opción 1: Formspree (Recomendado - Más simple)**

Para que los mensajes se envíen realmente a tu email:

1. **Crear cuenta gratuita:** [formspree.io](https://formspree.io/)
2. **Crear nuevo formulario** y copiar el Form ID
3. **Reemplazar** `YOUR_FORM_ID` en `public/index.html`

**Opción 2: EmailJS (Más avanzado)**
- Ver [EMAIL_SETUP.md](EMAIL_SETUP.md) para configuración completa

### Sin configuración
Si no configuras ningún servicio, el formulario valida los campos y muestra notificaciones.

## Funcionalidades

- **Carrito de Compras**: Agrega productos y calcula totales automáticamente
- **Persistencia**: Los productos del carrito se guardan en tu navegador
- **Formulario de Contacto**: Validación de campos y envío simulado
- **Notificaciones**: Mensajes de confirmación para acciones del usuario

## Personalización

### Colores
- Fondo principal: `#0a0a0a` (Casi negro)
- Fondo secundario: `#1a1a1a` (Gris oscuro)
- Acento: `#e60000` (Rojo vibrante)
- Texto: `#ffffff` (Blanco), `#a0a0a0` (Gris claro)

### Fuentes
- Títulos: Anton
- Cuerpo: Roboto

### Imágenes
Agrega las imágenes requeridas en la carpeta `public/images/` con los nombres especificados en el HTML.

## Seguridad Importante

⚠️ **NUNCA hagas esto:**
- Expongas tu Secret Key (sk_live_*) en el código
- Guardes claves secretas en el navegador
- Commits con variables de ambiente reales

✅ **SIEMPRE haz esto:**
- Usa variables de ambiente (.env)
- Mantén Secret Key solo en backend
- Valida todos los montos en el servidor
- Usa HTTPS en producción
- Haz sanitization de inputs

## Variables de Ambiente

Copia `backend/.env.example` a `backend/.env`:

```env
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY
PORT=3000
NODE_ENV=development
```

## Despliegue (Hosting Gratis)

**GitHub Pages - Recomendado**

### Opción A: Script automático (Más fácil)
```cmd
# Ejecuta desde la carpeta del proyecto:
deploy.bat
```

### Opción B: Manual
1. **Crear cuenta GitHub:** [github.com](https://github.com)
2. **Subir código** usando GitHub Desktop o línea de comandos
3. **Activar Pages** en Settings del repositorio

**Ver [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) para instrucciones completas.**

### Otras opciones gratuitas:
- **Netlify:** [netlify.com](https://netlify.com) - 100GB/mes
- **Vercel:** [vercel.com](https://vercel.com) - 100GB/mes
- **Firebase:** [firebase.google.com](https://firebase.google.com) - 10GB/mes