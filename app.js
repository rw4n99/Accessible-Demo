const grid = document.getElementById('product-grid');
const announcer = document.getElementById('announcer');
let cart = [];

// 1. Carousel
let paused = false;
setInterval(() => {
    if (paused) return;
    const slides = document.querySelectorAll('.banner-slide');
    let active = Array.from(slides).findIndex(s => s.classList.contains('active'));
    slides[active].classList.remove('active');
    slides[(active + 1) % slides.length].classList.add('active');
}, 5000);
document.getElementById('pause-btn').addEventListener('click', (e) => {
    paused = !paused; e.target.innerText = paused ? "Play" : "Pause";
});

// 2. Render Products
products.forEach(p => {
    const art = document.createElement('article');
    art.className = 'card';
    art.innerHTML = `<img src="${p.img}" alt="${p.alt}"><h2>${p.name}</h2><p>$${p.price}</p><button class="btn" aria-label="Add ${p.name}">Add to Cart</button>`;
    art.querySelector('button').addEventListener('click', () => {
        cart.push(p);
        const total = cart.reduce((s, i) => s + i.price, 0);
        document.getElementById('cart-val').innerText = `(${cart.length}) - $${total}`;
        announcer.innerText = `${p.name} added. Total $${total}`;
        updateCartList();
        Cart.open();
    });
    grid.appendChild(art);
});

// 3. UI Managers
const Cart = {
    el: document.getElementById('good-cart'),
    open() {
        this.el.hidden = false; setTimeout(() => this.el.classList.add('open'), 10);
        document.getElementById('c-close').focus();
        document.getElementById('cart-trigger').setAttribute('aria-expanded', 'true');
        document.addEventListener('keydown', trap);
    },
    close() {
        this.el.classList.remove('open'); setTimeout(() => this.el.hidden = true, 400);
        document.getElementById('cart-trigger').setAttribute('aria-expanded', 'false');
        document.getElementById('cart-trigger').focus();
        document.removeEventListener('keydown', trap);
    }
};

const Checkout = {
    el: document.getElementById('good-checkout'),
    open() { Cart.close(); this.el.hidden = false; this.el.classList.add('open'); document.getElementById('co-title').focus(); },
    close() { this.el.hidden = true; this.el.classList.remove('open'); Cart.open(); }
};

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const card = document.getElementById('fcard');
    const err = document.getElementById('c-err');
    if (card.value.length < 16) {
        card.setAttribute('aria-invalid', 'true');
        err.innerText = "Error: Card number must be 16 digits.";
        err.style.display = 'block';
        card.focus();
    } else { alert("Order Placed!"); }
});

function trap(e) {
    if(e.key === 'Escape') Cart.close();
    if(e.key !== 'Tab') return;
    const f = Cart.el.querySelectorAll('button');
    if(e.shiftKey && document.activeElement === f[0]) { f[f.length-1].focus(); e.preventDefault(); }
    else if(!e.shiftKey && document.activeElement === f[f.length-1]) { f[0].focus(); e.preventDefault(); }
}

function updateCartList() {
    document.getElementById('cart-list').innerHTML = cart.map(i => `<li class="cart-item"><span>${i.name}</span></li>`).join('');
}

document.getElementById('c-close').addEventListener('click', () => Cart.close());
document.getElementById('cart-trigger').addEventListener('click', () => Cart.open());
document.getElementById('grid-btn').addEventListener('click', () => { grid.className = 'grid'; announcer.innerText="Grid view"; });
document.getElementById('list-btn').addEventListener('click', () => { grid.className = 'grid list-view'; announcer.innerText="List view"; });