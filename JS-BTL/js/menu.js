// --- Data Layer (quản lý dữ liệu giỏ hàng) ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// --- DOM Elements ---
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const totalPriceEl = document.getElementById('totalPrice');
const itemCountEl = document.getElementById('itemCount');
const itemTotalEl = document.getElementById('itemTotal');
const floatingCart = document.getElementById('floatingCart');

// --- Cart Logic ---
function addToCart(btn) {
  const item = btn.closest('.menu-item');
  const name = item.querySelector('h3').textContent;
  const price = parseInt(item.querySelector('.price').textContent.replace(/\D/g, ''));

  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCart();
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  saveCart();
  renderCart();
  updateFloatingCart();
}

// --- UI Rendering ---
function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <div style="margin: 10px 0; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
        <strong>${item.name}</strong><br>
        <button onclick="changeQty(${i}, -1)">−</button>
        <span style="margin: 0 10px;">${item.qty}</span>
        <button onclick="changeQty(${i}, 1)">+</button>
        <span style="float:right;">${(item.price * item.qty).toLocaleString()} VNĐ</span>
      </div>`;
  });

  totalPriceEl.textContent = total.toLocaleString();
}

function updateFloatingCart() {
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  itemCountEl.textContent = `${itemCount} MÓN TẠM TÍNH`;
  itemTotalEl.textContent = total.toLocaleString();
  floatingCart.style.display = itemCount > 0 ? 'block' : 'none';
}

// --- Popup Controls ---
function openCart() {
  renderCart();
  cartModal.style.display = 'flex';
}

function closeCart() {
  cartModal.style.display = 'none';
}

// --- Event Binding ---
function initEvents() {
  document.querySelectorAll('.menu-item button').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn));
  });

  document.querySelector('.order-btn').addEventListener('click', () => {
    let text = "Thực đơn đã chọn:\n";
    cart.forEach(item => {
      text += `- ${item.name} x ${item.qty} = ${(item.price * item.qty).toLocaleString()} VNĐ\n`;
    });
    const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);
    text += `Tổng tiền: ${total.toLocaleString()} VNĐ`;

    localStorage.setItem('selectedMenu', text);
    window.location.href = "order.html";
  });

  window.addEventListener('DOMContentLoaded', () => {
    updateCart();
  });
}

// --- Init ---
initEvents();
