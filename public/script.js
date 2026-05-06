const cartKey = 'darklinca_cart';
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

const wishlistKey = 'darklinca_wishlist';
let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.getElementById('main-menu');
const cartButton = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const clearCart = document.getElementById('clear-cart');
const quoteButton = document.getElementById('quote-button');
const contactForm = document.querySelector('.contact-form');
const contactEmail = 'darklincaservices@gmail.com';

function money(value) {
    return Number(value).toFixed(2);
}

function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'cart-empty';
        empty.textContent = 'El carrito está vacío.';
        cartItems.appendChild(empty);
        cartTotal.textContent = '0.00';
        saveCart();
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        const subtotal = Number(item.price) * item.quantity;
        total += subtotal;

        const info = document.createElement('span');
        info.textContent = `${item.name} x${item.quantity} - $${money(subtotal)}`;

        const controls = document.createElement('div');
        controls.className = 'cart-item-actions';

        const decrease = document.createElement('button');
        decrease.type = 'button';
        decrease.textContent = '-';
        decrease.setAttribute('aria-label', `Quitar una unidad de ${item.name}`);
        decrease.addEventListener('click', () => changeQuantity(index, -1));

        const increase = document.createElement('button');
        increase.type = 'button';
        increase.textContent = '+';
        increase.setAttribute('aria-label', `Añadir una unidad de ${item.name}`);
        increase.addEventListener('click', () => changeQuantity(index, 1));

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Eliminar';
        remove.addEventListener('click', () => removeFromCart(index));

        controls.append(decrease, increase, remove);
        li.append(info, controls);
        cartItems.appendChild(li);
    });

    cartTotal.textContent = money(total);
    saveCart();
}

function addToCart(name, price) {
    const existing = cart.find((item) => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price: Number(price), quantity: 1 });
    }
    updateCart();
    showNotification('Producto añadido al carrito');
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function saveWishlist() {
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
}

function addToWishlist(name) {
    if (!wishlist.includes(name)) {
        wishlist.push(name);
        saveWishlist();
        showNotification('Producto añadido a la wishlist');
    } else {
        showNotification('El producto ya está en la wishlist', 'error');
    }
}

function removeFromWishlist(name) {
    wishlist = wishlist.filter(item => item !== name);
    saveWishlist();
    showNotification('Producto removido de la wishlist');
}

function showCart() {
    cartModal.style.display = 'block';
    cartModal.setAttribute('aria-hidden', 'false');
    closeCart.focus();
}

function hideCart() {
    cartModal.style.display = 'none';
    cartModal.setAttribute('aria-hidden', 'true');
    cartButton.focus();
}

function getContactInfo() {
    if (!contactForm) return {};
    return {
        name: contactForm.querySelector('input[name="name"]')?.value.trim() || '',
        email: contactForm.querySelector('input[name="email"]')?.value.trim() || '',
        phone: contactForm.querySelector('input[name="phone"]')?.value.trim() || '',
        location: contactForm.querySelector('input[name="location"]')?.value.trim() || '',
        delivery: contactForm.querySelector('select[name="delivery"]')?.value || '',
        payment: contactForm.querySelector('select[name="payment"]')?.value || '',
        interest: contactForm.querySelector('select[name="interest"]')?.value || '',
        ageConfirm: contactForm.querySelector('input[name="ageConfirm"]')?.checked || false,
        message: contactForm.querySelector('textarea[name="message"]')?.value.trim() || ''
    };
}

function validateContact(contact, requireMessage = false) {
    if (!contact.name || !contact.email || !contact.phone) {
        return 'Completa nombre, correo y teléfono.';
    }

    if (!/\S+@\S+\.\S+/.test(contact.email)) {
        return 'Introduce un correo electrónico válido.';
    }

    if (!contact.delivery) {
        return 'Selecciona el tipo de entrega.';
    }

    if (!contact.ageConfirm) {
        return 'Confirma que tienes 18 años o más.';
    }

    if (requireMessage && !contact.message) {
        return 'Escribe un mensaje para preparar la consulta.';
    }

    return '';
}

function formatCartForQuote(items) {
    return items
        .map((item, index) => `${index + 1}. ${item.name} x${item.quantity} - $${money(item.price * item.quantity)}`)
        .join('\n');
}

function buildInquiryText(contact, includeCart = false) {
    const lines = [
        'Solicitud de información:',
        `Nombre: ${contact.name}`,
        `Email: ${contact.email}`,
        `Teléfono: ${contact.phone}`,
        `Tipo de entrega: ${contact.delivery}`
    ];

    if (contact.location) lines.push(`Ubicación: ${contact.location}`);
    if (contact.payment) lines.push(`Pago preferido: ${contact.payment}`);
    if (contact.interest) lines.push(`Producto de interés: ${contact.interest}`);
    if (contact.message) lines.push(`Mensaje: ${contact.message}`);
    lines.push('Edad confirmada: 18 años o más');
    if (includeCart) lines.push('', 'Productos:', formatCartForQuote(cart));

    return lines.join('\n');
}

async function copyInquiryToClipboard(text) {
    if (!navigator.clipboard) return false;
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        return false;
    }
}

async function sendInquiry(contact, text, includeCart) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contact,
            cart: includeCart ? cart : [],
            text
        })
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'No se pudo enviar la consulta');
    }
}

function openMailFallback(text) {
    const subject = encodeURIComponent('Consulta DarKlinca Defense');
    const body = encodeURIComponent(text);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}

async function prepareInquiry(includeCart = false) {
    if (includeCart && cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }

    const contact = getContactInfo();
    const validationError = validateContact(contact, !includeCart);
    if (validationError) {
        showNotification(validationError, 'error');
        return;
    }

    const text = buildInquiryText(contact, includeCart);
    const submitButton = contactForm?.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    if (quoteButton) quoteButton.disabled = true;

    try {
        await sendInquiry(contact, text, includeCart);
        showNotification('Consulta enviada correctamente');
        if (!includeCart) contactForm.reset();
        if (includeCart) {
            cart = [];
            updateCart();
            hideCart();
        }
    } catch (error) {
        const copied = await copyInquiryToClipboard(text);
        openMailFallback(text);
        showNotification(copied
            ? 'No se pudo enviar automáticamente. Se abrió el correo y se copió la consulta.'
            : 'No se pudo enviar automáticamente. Se abrió el correo como alternativa.',
            'error'
        );
    } finally {
        if (submitButton) submitButton.disabled = false;
        if (quoteButton) quoteButton.disabled = false;
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3200);
}

function playVideo(cardImage) {
    const videoSrc = cardImage.dataset.videoSrc;
    if (!videoSrc) return;

    const video = document.createElement('video');
    video.src = videoSrc;
    video.className = 'product-video';
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;

    cardImage.replaceChildren(video);
}

menuToggle?.addEventListener('click', () => {
    const isOpen = mainMenu.classList.toggle('active');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

document.querySelectorAll('#main-menu a').forEach((link) => {
    link.addEventListener('click', () => {
        mainMenu.classList.remove('active');
        menuToggle?.classList.remove('active');
        menuToggle?.setAttribute('aria-expanded', 'false');
        menuToggle?.setAttribute('aria-label', 'Abrir menú');
    });
});

document.querySelectorAll('.add-cart').forEach((button) => {
    button.addEventListener('click', () => addToCart(button.dataset.name, button.dataset.price));
});

document.querySelectorAll('.add-wishlist').forEach((button) => {
    button.addEventListener('click', () => addToWishlist(button.dataset.name));
});

document.querySelectorAll('.card-video').forEach((button) => {
    button.addEventListener('click', () => playVideo(button));
});

const productSearch = document.getElementById('product-search');
productSearch?.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach((card) => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        card.style.display = name.includes(query) || desc.includes(query) ? '' : 'none';
    });
});

cartButton?.addEventListener('click', showCart);
closeCart?.addEventListener('click', hideCart);
clearCart?.addEventListener('click', () => {
    cart = [];
    updateCart();
});
quoteButton?.addEventListener('click', () => prepareInquiry(true));

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    prepareInquiry(false);
});

document.querySelector('.newsletter-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = event.target.querySelector('input').value;
    if (email) {
        showNotification('¡Gracias por suscribirte! Te mantendremos informado.');
        event.target.reset();
    }
});

// Real-time form validation
contactForm?.addEventListener('input', (event) => {
    const field = event.target;
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) errorElement.remove();
    
    let error = '';
    if (field.name === 'email' && field.value && !/\S+@\S+\.\S+/.test(field.value)) {
        error = 'Correo inválido';
    } else if (field.name === 'phone' && field.value && !/^\+?\d{9,}$/.test(field.value)) {
        error = 'Teléfono inválido';
    }
    
    if (error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = error;
        field.parentElement.appendChild(errorDiv);
    }
});

document.querySelectorAll('.share-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const url = button.dataset.url;
        if (navigator.share) {
            navigator.share({
                title: name,
                text: `Mira este producto: ${name}`,
                url: url
            });
        } else {
            navigator.clipboard.writeText(`${name} - ${url}`);
            showNotification('Enlace copiado al portapapeles');
        }
    });
});

const compareButton = document.getElementById('compare-btn');
const compareModal = document.getElementById('compare-modal');
const closeCompare = document.getElementById('close-compare');
const clearCompare = document.getElementById('clear-compare');

compareButton?.addEventListener('click', showCompare);
closeCompare?.addEventListener('click', hideCompare);
clearCompare?.addEventListener('click', () => {
    compare = [];
    saveCompare();
    updateCompareCount();
    hideCompare();
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) hideCart();
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (cartModal.getAttribute('aria-hidden') === 'false') hideCart();
    }
});

updateCart();

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}

// Back to top
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});
backToTopButton?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
