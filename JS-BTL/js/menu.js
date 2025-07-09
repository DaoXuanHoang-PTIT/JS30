// Lấy giỏ hàng từ localStorage (nếu có), hoặc khởi tạo mảng rỗng
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Gán các phần tử DOM cần sử dụng
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const totalPriceEl = document.getElementById('totalPrice');

// Hàm thêm món vào giỏ hàng
function addToCart(btn) {
  const item = btn.closest('.menu-item'); // Lấy phần tử món ăn gần nút bấm
  const name = item.querySelector('h3').textContent; // Tên món
  const price = parseInt(item.querySelector('.price').textContent.replace(/[^0-9]/g, '')); // Giá số

  // Kiểm tra món đã có trong giỏ chưa
  const found = cart.find(i => i.name === name);
  if (found) {
    found.qty += 1; // Nếu có, tăng số lượng
  } else {
    cart.push({ name, price, qty: 1 }); // Nếu chưa, thêm mới
  }

  saveCart();         // Lưu vào localStorage
  renderCart();       // Vẽ lại popup
  updateFloatingCart(); // Cập nhật khối nổi
}

// Vẽ danh sách món trong popup
function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    // Tạo HTML cho từng món
    cartItems.innerHTML += `
      <div style="margin: 10px 0; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
        <strong>${item.name}</strong><br>
        <button onclick="changeQty(${index}, -1)">−</button>
        <span style="margin: 0 10px;">${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
        <span style="float:right;">${(item.price * item.qty).toLocaleString()} VNĐ</span>
      </div>`;
  });

  totalPriceEl.textContent = total.toLocaleString(); // Hiển thị tổng tiền
}

// Thay đổi số lượng món
function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1); // Xóa nếu <= 0

  saveCart();
  renderCart();
  updateFloatingCart();
}

// Đóng popup
function closeCart() {
  cartModal.style.display = 'none';
}

// Mở popup
function openCart() {
  renderCart();
  cartModal.style.display = 'flex';
}

// Lưu giỏ hàng vào localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Cập nhật khối nổi (số món + tổng tiền)
function updateFloatingCart() {
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  document.getElementById('itemCount').textContent = `${itemCount} MÓN TẠM TÍNH`;
  document.getElementById('itemTotal').textContent = total.toLocaleString();
  document.getElementById('floatingCart').style.display = itemCount > 0 ? 'block' : 'none';
}

// Click cho tất cả nút “+ Đặt”
document.querySelectorAll('.menu-item button').forEach(btn => {
  btn.addEventListener('click', () => addToCart(btn));
});

// Khi trang tải lại: hiển thị lại giỏ nếu có
window.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateFloatingCart();
});
document.querySelector('.order-btn').addEventListener('click', () => {
  let text = "Thực đơn đã chọn:\n";
  cart.forEach(item => {
    text += `- ${item.name} x ${item.qty} = ${(item.price * item.qty).toLocaleString()} VNĐ\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  text += `Tổng tiền: ${total.toLocaleString()} VNĐ`;

  localStorage.setItem('selectedMenu', text); // Ghi vào localStorage
  window.location.href = "order.html"; // Chuyển sang trang đặt bàn
});

