const grid = document.getElementById('product-grid');
const announcer = document.getElementById('announcer');
let cart = [];

// 1. Accessible Carousel
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

// 2. Rendering Products
products.forEach(p => {
    const art = document.createElement('article');
    art.className = 'card';
    art.innerHTML = `
        <img src="${p.img}" alt="${p.alt}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button class="btn" aria-label="Add ${p.name} to cart">Add to Cart</button>
    `;
    art.querySelector('button').addEventListener('click', () => {
        cart.push({ ...p, instanceId: Date.now() + Math.random() }); // Unique ID for deletion
        updateUI();
        announcer.innerText = `${p.name} added. Total items: ${cart.length}`;
        Cart.open();
    });
    grid.appendChild(art);
});

function removeFromCart(instanceId, name) {
    cart = cart.filter(item => item.instanceId !== instanceId);
    updateUI();
    // THE WOW FACTOR: Auditory confirmation of deletion
    announcer.innerText = `${name} removed from cart. ${cart.length} items remaining.`;
    
    // If cart is empty, move focus back to close button or a helpful area
    if (cart.length === 0) {
        document.getElementById('c-close').focus();
    }
}

function updateUI() {
    const total = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById('cart-val').innerText = `(${cart.length}) - $${total}`;
    document.getElementById('good-total-val').innerText = `$${total}`;
    
    // Render Cart List with Delete Buttons
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; 
    
    cart.forEach(item => {
        const li = document.createElement('li');
        li.style = "display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #eee";
        li.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button class="nav-item" 
                    style="color:red; margin:0; font-size:0.8rem;" 
                    aria-label="Remove ${item.name} from cart">
                Remove
            </button>
        `;
        li.querySelector('button').addEventListener('click', () => removeFromCart(item.instanceId, item.name));
        cartList.appendChild(li);
    });

    // Update Summary in Checkout
    document.getElementById('summary-items').innerHTML = cart.map(i => 
        `<div style="display:flex; justify-content:space-between;"><span>${i.name}</span><span>$${i.price}</span></div>`
    ).join('');
}

// 3. Form Validation (Unchanged)
const nIn = document.getElementById('fname'), cIn = document.getElementById('fcard');
const nE = document.getElementById('n-err'), cE = document.getElementById('c-err');
const clear = (i, e) => { i.setAttribute('aria-invalid','false'); e.style.display='none'; };
nIn.addEventListener('input', () => { if(nIn.value.trim() !== "") clear(nIn, nE); });
cIn.addEventListener('input', () => { if(cIn.value.replace(/\D/g,'').length === 16) clear(cIn, cE); });

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let err = false;
    if(nIn.value.trim() === "") { 
        nIn.setAttribute('aria-invalid','true'); nE.innerText="Full Name is required"; nE.style.display="block"; nIn.focus(); err=true; 
    }
    if(cIn.value.replace(/\D/g,'').length < 16) { 
        cIn.setAttribute('aria-invalid','true'); cE.innerText="Valid 16-digit card required"; cE.style.display="block"; if(!err) cIn.focus(); err=true; 
    }
    if(!err) { alert("Order Placed!"); Checkout.close(); cart = []; updateUI(); }
});

// 4. Modal Managers (Unchanged)
const Cart = {
    el: document.getElementById('good-cart'),
    open() { 
        this.el.hidden = false; setTimeout(() => this.el.classList.add('open'), 10); 
        document.getElementById('c-close').focus();
        document.getElementById('cart-trigger').setAttribute('aria-expanded', 'true');
    },
    close() { 
        this.el.classList.remove('open'); setTimeout(() => this.el.hidden = true, 400); 
        document.getElementById('cart-trigger').setAttribute('aria-expanded', 'false');
        document.getElementById('cart-trigger').focus();
    }
};

const Checkout = {
    el: document.getElementById('good-checkout'),
    open() { Cart.close(); this.el.hidden = false; this.el.classList.add('open'); document.getElementById('co-title').focus(); },
    close() { this.el.hidden = true; this.el.classList.remove('open'); Cart.open(); }
};

document.getElementById('c-close').addEventListener('click', () => Cart.close());
document.getElementById('cart-trigger').addEventListener('click', () => Cart.open());
document.getElementById('grid-btn').addEventListener('click', () => { grid.className='grid'; document.getElementById('grid-btn').setAttribute('aria-pressed','true'); document.getElementById('list-btn').setAttribute('aria-pressed','false'); announcer.innerText="Grid view active"; });
document.getElementById('list-btn').addEventListener('click', () => { grid.className='grid list-view'; document.getElementById('grid-btn').setAttribute('aria-pressed','false'); document.getElementById('list-btn').setAttribute('aria-pressed','true'); announcer.innerText="List view active"; });