class Product {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}

let products = [];
let editingId = null;

function addOrUpdateProduct() {
  const id = document.getElementById('id').value.trim();
  const name = document.getElementById('name').value.trim();
  const price = parseInt(document.getElementById('price').value);
  const quantity = parseInt(document.getElementById('quantity').value);

  if (!id || !name || isNaN(price) || isNaN(quantity)) {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  if (editingId === null) {
    if (products.some(p => p.id === id)) {
      alert("ID đã tồn tại. Vui lòng chọn ID khác.");
      return;
    }
    products.push(new Product(id, name, price, quantity));
  } else {
    const index = products.findIndex(p => p.id === editingId);
    products[index] = new Product(id, name, price, quantity);
    editingId = null;
  }

  resetForm();
  renderTable();
}

function renderTable() {
  let html = `
    <table>
      <tr>
        <th>ID</th><th>Tên</th><th>Giá</th><th>Số lượng</th><th>Tổng giá trị</th><th>Hành động</th>
      </tr>
  `;

  products.forEach(p => {
    html += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.price.toLocaleString()} VNĐ</td>
        <td>${p.quantity}</td>
        <td>${(p.getTotal()).toLocaleString()} VNĐ</td>
        <td>
          <button class="btn-edit" onclick="editProduct('${p.id}')">Sửa</button>
          <button class="btn-delete" onclick="deleteProduct('${p.id}')">Xóa</button>
        </td>
      </tr>
    `;
  });

  html += '</table>';
  document.getElementById('productTable').innerHTML = html;

  const totalValue = products.reduce((sum, p) => sum + p.getTotal(), 0);
  const mostExpensive = products.reduce((max, p) => (p.price > max.price ? p : max), products[0]);

  document.getElementById('summary').innerHTML = `
    <p><strong>Tổng giá trị tồn kho:</strong> ${totalValue.toLocaleString()} VNĐ</p>
    ${products.length > 0
      ? `<p><strong>Sản phẩm đắt nhất:</strong> ${mostExpensive.name} (${mostExpensive.price.toLocaleString()} VNĐ)</p>`
      : ''}
  `;
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  document.getElementById('id').value = product.id;
  document.getElementById('name').value = product.name;
  document.getElementById('price').value = product.price;
  document.getElementById('quantity').value = product.quantity;
  editingId = id;
}

function deleteProduct(id) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    products = products.filter(p => p.id !== id);
    renderTable();
  }
}

function resetForm() {
  document.getElementById('id').value = '';
  document.getElementById('name').value = '';
  document.getElementById('price').value = '';
  document.getElementById('quantity').value = '';
}
