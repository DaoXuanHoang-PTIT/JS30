document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Đặt bàn thành công!');
    this.reset();
});