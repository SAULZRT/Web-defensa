# Configuración de Pagos con Stripe

## Paso 1: Crear cuenta en Stripe

1. Visita [stripe.com](https://stripe.com)
2. Crea una cuenta (puedes usar el modo de prueba primero)
3. Ve a Dashboard → API Keys
4. Copia tus claves:
   - **Publishable Key** (pública, para el frontend)
   - **Secret Key** (privada, solo para backend)

## Paso 2: Configurar las claves en el frontend

En `public/index.html`, reemplaza esta línea:
```javascript
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
```

Con tu clave pública real:
```javascript
const stripe = Stripe('pk_test_abcd1234efgh5678ijkl9012mnop3456');
```

## Paso 3: Crear backend para procesar pagos

Tienes dos opciones:

### Opción A: Node.js + Express (Recomendado)

Crea `backend/server.js`:

```javascript
const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY_HERE');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/payment', async (req, res) => {
    try {
        const { amount, currency, payment_method_id, email, items } = req.body;

        // Crear intent de pago
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency || 'usd',
            payment_method: payment_method_id,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            }
        });

        if (paymentIntent.status === 'succeeded') {
            // Aquí puedes guardar el pedido en tu BD
            console.log(`Pago exitoso: ${paymentIntent.id}`);
            console.log(`Cliente: ${email}`);
            console.log(`Items: ${JSON.stringify(items)}`);

            res.json({ success: true, paymentId: paymentIntent.id });
        } else {
            res.json({ 
                success: false, 
                error: 'Pago no confirmado'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ 
            success: false, 
            error: error.message 
        });
    }
});

app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});
```

Instala dependencias:
```bash
npm init -y
npm install express stripe cors
node server.js
```

### Opción B: Python + Flask

Crea `backend/app.py`:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import stripe

app = Flask(__name__)
CORS(app)
stripe.api_key = 'sk_test_YOUR_SECRET_KEY_HERE'

@app.route('/api/payment', methods=['POST'])
def process_payment():
    try:
        data = request.json
        
        # Crear intent de pago
        payment_intent = stripe.PaymentIntent.create(
            amount=data['amount'],
            currency=data.get('currency', 'usd'),
            payment_method=data['payment_method_id'],
            confirm=True,
            automatic_payment_methods={
                'enabled': True,
                'allow_redirects': 'never'
            }
        )

        if payment_intent.status == 'succeeded':
            print(f"Pago exitoso: {payment_intent.id}")
            print(f"Cliente: {data['email']}")
            return jsonify({'success': True, 'paymentId': payment_intent.id})
        else:
            return jsonify({'success': False, 'error': 'Pago no confirmado'})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=3000)
```

Instala dependencias:
```bash
pip install flask flask-cors stripe
python app.py
```

## Paso 4: Conectar frontend con backend

Asegúrate que en `index.html` la URL del backend sea correcta:

```javascript
const response = await fetch('/api/payment', {
    method: 'POST',
    // ...
});
```

Si tu backend está en un puerto diferente (ej: localhost:3000), actualiza:

```javascript
const response = await fetch('http://localhost:3000/api/payment', {
    method: 'POST',
    // ...
});
```

## Paso 5: Pruebas

Usa estas tarjetas de prueba en Stripe:

| Tarjeta | Número | Exp. | CVC |
|---------|--------|------|-----|
| Exitosa | 4242 4242 4242 4242 | 12/25 | 123 |
| Declinada | 4000 0000 0000 0002 | 12/25 | 123 |
| Error 3D | 4000 0000 0000 3220 | 12/25 | 123 |

## Paso 6: Producción

Cuando estés listo para producción:

1. Reemplaza `pk_test_*` con `pk_live_*` en el frontend
2. Reemplaza `sk_test_*` con `sk_live_*` en el backend
3. Retira el modo de prueba en el dashboard de Stripe
4. Obtén un certificado SSL para tu dominio (HTTPS obligatorio)

## Seguridad importante

⚠️ **NUNCA** hagas esto:
- Guardar claves secretas en el frontend
- Hacer visible tu Secret Key

✅ **SIEMPRE** haz esto:
- Mantén Secret Key solo en backend
- Usa variables de entorno para las claves
- Valida montos en el backend

## Ejemplo con variables de entorno

`backend/.env`:
```
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLIC_KEY=pk_test_yyy
```

`backend/server.js`:
```javascript
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
```

## Soporte

- Documentación: https://stripe.com/docs
- Dashboard: https://dashboard.stripe.com
- Webhooks para eventos: https://stripe.com/docs/webhooks
