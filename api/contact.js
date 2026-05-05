const MAX_FIELD_LENGTH = 1200;

function clean(value) {
  return String(value || '').trim().slice(0, MAX_FIELD_LENGTH);
}

function isEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

function formatProducts(items = []) {
  if (!Array.isArray(items) || items.length === 0) return 'Sin productos añadidos';

  return items
    .map((item, index) => {
      const name = clean(item.name);
      const quantity = Number(item.quantity || 1);
      const price = Number(item.price || 0);
      const subtotal = (price * quantity).toFixed(2);
      return `${index + 1}. ${name} x${quantity} - $${subtotal}`;
    })
    .join('\n');
}

function buildDiscordMessage(data) {
  const contact = data.contact || {};
  const lines = [
    '**Nueva consulta DarKlinca Defense**',
    `**Nombre:** ${clean(contact.name)}`,
    `**Email:** ${clean(contact.email)}`,
    `**Teléfono:** ${clean(contact.phone)}`,
    `**Tipo de entrega:** ${clean(contact.delivery)}`,
  ];

  if (contact.location) lines.push(`**Ubicación:** ${clean(contact.location)}`);
  if (contact.payment) lines.push(`**Pago preferido:** ${clean(contact.payment)}`);
  if (contact.interest) lines.push(`**Producto de interés:** ${clean(contact.interest)}`);
  if (contact.message) lines.push(`**Mensaje:** ${clean(contact.message)}`);

  lines.push(`**Edad confirmada:** ${contact.ageConfirm ? '18 años o más' : 'No'}`);
  lines.push('', '**Productos:**', formatProducts(data.cart));

  return lines.join('\n').slice(0, 1900);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: 'Webhook no configurada' });
  }

  const contact = req.body?.contact || {};
  const requiredError =
    !clean(contact.name) ||
    !clean(contact.email) ||
    !clean(contact.phone) ||
    !clean(contact.delivery) ||
    !clean(contact.message) ||
    !contact.ageConfirm;

  if (requiredError) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  if (!isEmail(clean(contact.email))) {
    return res.status(400).json({ error: 'Correo inválido' });
  }

  const discordResponse = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: buildDiscordMessage(req.body) }),
  });

  if (!discordResponse.ok) {
    return res.status(502).json({ error: 'No se pudo enviar la consulta' });
  }

  return res.status(200).json({ ok: true });
}
