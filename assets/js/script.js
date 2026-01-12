document.addEventListener('DOMContentLoaded', () => {
    // Xử lý đơn giản khi submit form (Ngăn reload trang)
    const quoteForm = document.getElementById('quoteForm');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Giả lập trạng thái đang gửi
            const btn = quoteForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Đang gửi...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Cảm ơn! Yêu cầu báo giá của bạn đã được gửi thành công.');
                quoteForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Smooth Scroll cho các link anchor (nếu cần xử lý thêm ngoài CSS native)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});