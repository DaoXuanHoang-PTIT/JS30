document.querySelector('.form form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Gửi thành công!');
    this.reset();
});

