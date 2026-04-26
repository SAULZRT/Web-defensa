# Checklist: De Prueba a Producción Real

## 1. CUENTA STRIPE (Gratuita)

### Paso 1.1: Crear cuenta
```
https://stripe.com/
Sign Up → Completa datos básicos
Verifica email
```

### Paso 1.2: Obtener claves
- Ir a Dashboard → API Keys
- Copiar:
  - **Publishable Key** (empieza con `pk_test_`)
  - **Secret Key** (empieza con `sk_test_`)

---

## 2. BACKEND CONFIGURADO

### Paso 2.1: Instalar Node.js
```powershell
# Descarga en https://nodejs.org/
# Prueba que esté instalado:
node --version
npm --version
```

### Paso 2.2: Configurar proyecto backend
```powershell
cd c:\Users\user\Desktop\web-defensa\backend

# Crear package.json
npm init -y

# Instalar dependencias
npm install express stripe cors dotenv
npm install --save-dev nodemon
```

### Paso 2.3: Crear archivo .env
```
# backend/.env
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY
PORT=3000
NODE_ENV=development
```

### Paso 2.4: Iniciar servidor
```powershell
cd backend
npm start
# Deberías ver: 🚀 Servidor de pagos iniciado
```

---

## 3. CONECTAR FRONTEND CON BACKEND

### Paso 3.1: Actualizar stripe key en HTML
En `public/index.html`, busca:
```javascript
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
```

Reemplaza con tu clave pública:
```javascript
const stripe = Stripe('pk_test_abcd1234efgh5678ijkl9012mnop3456');
```

### Paso 3.2: Asegurar CORS correcto
En `backend/server.js`:
```javascript
app.use(cors({
    origin: ['http://localhost:8000', 'http://localhost:3000'],
    credentials: true
}));
```

---

## 4. PRUEBAS LOCALES

### Paso 4.1: Terminal 1 - Backend
```powershell
cd c:\Users\user\Desktop\web-defensa\backend
npm start
# Espera: 🚀 Servidor de pagos iniciado en puerto 3000
```

### Paso 4.2: Terminal 2 - Frontend
```powershell
cd c:\Users\user\Desktop\web-defensa\public
python -m http.server 8000
# Espera: Serving HTTP on port 8000
```

### Paso 4.3: Abrir navegador
```
http://localhost:8000
```

### Paso 4.4: Prueba de compra
1. Agrega 2-3 productos al carrito
2. Haz click "Proceder al Pago"
3. Ingresa: test@example.com
4. Usa tarjeta de prueba: **4242 4242 4242 4242**
5. Exp: 12/25, CVC: 123
6. Deberías ver: "¡Pago procesado exitosamente!"

---

## 5. HOSTING & DOMINIO

### Opción A: Vercel (Gratis, recomendado para frontend)
```powershell
# Instalar Vercel CLI
npm install -g vercel

# En carpeta del proyecto
vercel
# Sigue instrucciones
```

### Opción B: Heroku (Pagado, para backend)
```powershell
# Instalar Heroku CLI: https://devcenter.heroku.com

# Login
heroku login

# Crear app
heroku create darklinca-defense

# Desplegar
git push heroku main
```

### Opción C: Railway (Recomendado, gratis con crédito)
```
1. Ir a https://railway.app
2. Sign up con GitHub
3. Nuevo proyecto → Deploy from GitHub
4. Selecciona tu repo
```

### Dominio (opcional, ~$10/año)
- Namecheap.com
- Google Domains
- GoDaddy

---

## 6. CONFIGURACIÓN DE PRODUCCIÓN

### Paso 6.1: Obtener claves LIVE de Stripe
```
En Stripe Dashboard:
1. Cambiar de "Test Mode" a "Live Mode"
2. Copiar nuevas claves (pk_live_..., sk_live_...)
```

### Paso 6.2: Actualizar claves en producción

**En frontend (public/index.html):**
```javascript
const stripe = Stripe('pk_live_YOUR_LIVE_KEY');
```

**En backend (.env):**
```
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
STRIPE_PUBLIC_KEY=pk_live_YOUR_LIVE_KEY
NODE_ENV=production
```

### Paso 6.3: Variables en hosting

**Para Vercel (frontend):**
```
Proyecto → Settings → Environment Variables
Agregar variables según sea necesario
```

**Para Heroku (backend):**
```powershell
heroku config:set STRIPE_SECRET_KEY=sk_live_xxx
heroku config:set NODE_ENV=production
```

---

## 7. HTTPS (OBLIGATORIO para Stripe Live)

La mayoría de hosts ofrecen SSL gratuito:

### Vercel
- ✅ Automático

### Heroku
- ✅ Automático

### Railway
- ✅ Automático

---

## 8. BASE DE DATOS (Opcional pero recomendada)

Para guardar órdenes, usa:

### MongoDB Atlas (Gratis)
```
1. https://www.mongodb.com/cloud/atlas
2. Create Free Cluster
3. Copiar Connection String
4. Agregar a .env:
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

### Ejemplo para guardar órdenes:
```javascript
// backend/server.js (después de pago exitoso)
const order = {
    stripe_id: paymentIntent.id,
    email: email,
    amount: amount,
    items: items,
    status: 'completed',
    timestamp: new Date()
};

// Guardar en MongoDB
await db.orders.insertOne(order);
```

---

## 9. MAIL (Para confirmaciones)

### SendGrid (Gratis hasta 100 emails/día)
```
1. Crear cuenta en https://sendgrid.com
2. Obtener API Key
3. Instalar: npm install @sendgrid/mail
4. Enviar email después de pago
```

### Código ejemplo:
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
    to: email,
    from: 'noreply@darklinca-defense.com',
    subject: 'Pedido confirmado',
    html: `<h1>¡Gracias por tu compra!</h1><p>ID: ${paymentIntent.id}</p>`
});
```

---

## 10. CHECKLIST FINAL

- [ ] Terminal backend corriendo (npm start)
- [ ] Terminal frontend corriendo (python -m http.server)
- [ ] Prueba local exitosa con tarjeta 4242 4242 4242 4242
- [ ] Stripe account verificado
- [ ] Backend desplegado (Heroku/Railway)
- [ ] Frontend desplegado (Vercel)
- [ ] HTTPS en ambos
- [ ] Dominio configurado (opcional)
- [ ] Claves LIVE agregadas
- [ ] Pruebas en producción con tarjeta real
- [ ] Sistema de emails llegando
- [ ] Base de datos guardando órdenes

---

## Costos estimados

| Servicio | Costo | Notas |
|----------|-------|-------|
| Stripe | Sin cuota base | 2.9% + $0.30 USD por transacción |
| Dominio | $10/año | GoDaddy, Namecheap |
| Hosting | $0-20/mes | Vercel gratis, Railway pagado |
| MongoDB | Gratis | Hasta 512MB |
| SendGrid | Gratis | Hasta 100 emails/día |
| **TOTAL MES 1** | ~$30-50 | Inversión inicial |
| **TOTAL/MES DESPUÉS** | ~$15-25 | Recurrente |

---

## Troubleshooting

### Error: "Cannot POST /api/payment"
- ¿Backend está corriendo en puerto 3000?
- ¿Frontend hace llamada a URL correcta?

### Error: "Stripe is not defined"
- ¿Agregaste script de Stripe en HTML?
- ¿La clave pública es correcta?

### Error: "CORS policy"
- ¿Backend tiene cors habilitado?
- ¿Frontend URL está en whitelist?

### Pago falla en producción
- ¿Usas claves LIVE (pk_live_)?
- ¿Dominio tiene HTTPS?
- ¿Webhook configurado en Stripe?

---

## Próximos pasos avanzados

- [ ] Webhooks de Stripe
- [ ] Sistema de reembolsos
- [ ] Notificaciones SMS
- [ ] Integrar con redes sociales
- [ ] Analytics y dashboard
- [ ] Sistema de cupones
- [ ] Suscripciones recurrentes
