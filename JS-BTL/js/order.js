// Tự động chèn thực đơn vào ghi chú nếu có trong localStorage
window.addEventListener('DOMContentLoaded', () => {
  const noteField = document.getElementById('notes');
  const savedMenu = localStorage.getItem('selectedMenu');
  if (savedMenu && noteField) {
    noteField.value = savedMenu;
  }
});

// Giữ lại đoạn xử lý form hiện tại
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Đặt bàn thành công!');
  this.reset();
  localStorage.removeItem('selectedMenu'); // Xóa thực đơn sau khi gửi
});
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Đặt bàn thành công!');
    this.reset();
});
