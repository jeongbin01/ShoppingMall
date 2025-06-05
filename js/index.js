document.addEventListener('DOMContentLoaded', function () {
    const manageBtn = document.querySelector('.manage_btn');

    if (manageBtn) {
        manageBtn.addEventListener('click', function () {
            alert('내 상점 관리 기능은 추후 구현될 예정입니다.');
        });
    }

    // 향후 상품이 생기면 이 로직으로 동적 처리 가능
    const hasProducts = false;

    if (hasProducts) {
        const section = document.querySelector('.recent_product_section');
        section.innerHTML = `
      <div class="product_list">
        <div class="product_item">예시 상품 1</div>
        <div class="product_item">예시 상품 2</div>
      </div>
    `;
    }
});
