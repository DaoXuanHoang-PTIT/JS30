document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Gửi thành công!');
            this.reset();
        });