# Configuración de Formulario de Contacto

## Opción 1: Formspree (Más Simple - Recomendado)

### Paso 1: Crear cuenta
1. Ve a [https://formspree.io/](https://formspree.io/)
2. Crea cuenta gratuita
3. Verifica tu email

### Paso 2: Crear formulario
1. Haz click en **Create a new form**
2. Pon nombre: "DarKlinca Contact"
3. Copia el **Form ID** (ej: `xeqwryzl`)

### Paso 3: Configurar en el sitio
En `public/index.html`, busca:
```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Reemplaza `YOUR_FORM_ID` con tu ID real:
```html
<form class="contact-form" action="https://formspree.io/f/xeqwryzl" method="POST">
```

### Paso 4: Probar
1. Envía un mensaje de prueba
2. Revisa tu email de Formspree

**Ventajas de Formspree:**
- ✅ Sin código JavaScript
- ✅ Sin configuración compleja
- ✅ Gratis hasta 50 emails/mes
- ✅ Funciona inmediatamente

---

## Opción 2: EmailJS (Más Avanzado)

### Paso 1: Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### Paso 2: Configurar Email Service

1. En el dashboard, ve a **Email Services**
2. Haz click en **Add New Service**
3. Elige tu proveedor de email (Gmail, Outlook, etc.)
4. Conecta tu cuenta de email
5. Copia el **Service ID** (ej: `service_xxxxxx`)

### Paso 3: Crear Email Template

1. Ve a **Email Templates**
2. Haz click en **Create New Template**
3. Configura el template con estas variables:

**Subject:**
```
Nuevo mensaje de contacto - {{from_name}}
```

**HTML Body:**
```html
<h2>Nuevo mensaje de contacto</h2>
<p><strong>Nombre:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Mensaje:</strong></p>
<p>{{message}}</p>
<hr>
<p>Enviado desde DarKlinca Defense</p>
```

4. Guarda el template
5. Copia el **Template ID** (ej: `template_xxxxxx`)

### Paso 4: Obtener Public Key

1. Ve a **Account** → **General**
2. Copia tu **Public Key** (ej: `xxxxxxxxxxxxxx`)

### Paso 5: Configurar en el sitio web

En `public/index.html`, reemplaza estos valores:

```javascript
// Reemplaza con tu clave pública
emailjs.init("TU_PUBLIC_KEY_AQUI");

// En la función send, reemplaza:
emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', templateParams)
```

**Ejemplo:**
```javascript
emailjs.init("AbCdEfGhIjKlMnOp");
emailjs.send('service_gmail', 'template_contact', templateParams)
```

### Paso 6: Probar

1. Abre el sitio web
2. Completa el formulario de contacto
3. Envía el mensaje
4. Revisa tu email para confirmar que llega

## Solución de Problemas

### Formspree
- **No llegan emails:** Revisa spam/junk folder
- **Límite excedido:** Actualiza a plan pago ($5/mes)

### EmailJS
- **Error: "Invalid service ID"** → Verifica Service ID
- **Error: "Template not found"** → Verifica Template ID
- **Emails no llegan** → Revisa configuración del servicio de email

## Costos

| Servicio | Gratuito | Costo |
|----------|----------|--------|
| Formspree | 50 emails/mes | $5/mes |
| EmailJS | 200 emails/mes | $5/mes |
| Mailgun | 5,000 emails/mes | $5/mes |

## ¿Cuál elegir?

**Formspree** si quieres simplicidad máxima
**EmailJS** si quieres más control sobre el diseño de emails</content>
<parameter name="filePath">c:\Users\user\Desktop\web-defensa\EMAIL_SETUP.md