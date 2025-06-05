// 사이드바 메뉴 활성화 기능
function initSidebarMenu() {
    const menuLinks = document.querySelectorAll('.snb_menu .menu_link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 현재 페이지에 해당하는 메뉴 활성화
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkFilename = href ? href.split('/').pop() : '';
        if (href && linkFilename === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 메뉴 클릭 이벤트 추가
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // 모든 메뉴에서 active 클래스 제거
            menuLinks.forEach(l => l.classList.remove('active'));

            // 클릭된 메뉴에 active 클래스 추가
            this.classList.add('active');

            // href가 #인 경우 기본 동작 방지
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                console.log('메뉴 클릭:', this.textContent);
            }
        });
    });
}

// 하트 토글 기능
function toggleHeart(button) {
    const icon = button.querySelector('i');
    const card = button.closest('.product-card');

    if (button.classList.contains('active')) {
        // 관심상품에서 제거
        button.classList.remove('active');
        icon.className = 'bi bi-heart';

        // 카드 페이드아웃 애니메이션
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';

        setTimeout(() => {
            card.remove();
            updateItemCount();
        }, 500);
    } else {
        // 관심상품에 추가
        button.classList.add('active');
        icon.className = 'bi bi-heart-fill';
    }
}

// 아이템 카운트 업데이트
function updateItemCount() {
    const cards = document.querySelectorAll('.product-card');
    const countElement = document.querySelector('.item-count');
    if (countElement) {
        countElement.textContent = `(${cards.length})`;
    }

    // 상품이 없으면 빈 상태 표시
    if (cards.length === 0) {
        showEmptyState();
    }
}

// 빈 상태 표시
function showEmptyState() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px 0;">
            <i class="bi bi-heart" style="font-size: 2rem; color: #ccc;"></i>
            <h4 style="margin-top: 1rem; color: #666;">관심상품이 없습니다</h4>
            <p style="color: #999;">
                관심있는 상품을 하트 버튼을 눌러 추가해보세요.<br>나중에 쉽게 찾아볼 수 있습니다.
            </p>
            <a href="index.html" class="btn-shop btn btn-primary" style="margin-top: 1rem;">
                <i class="bi bi-bag me-2"></i>쇼핑하러 가기
            </a>
        </div>
    `;
}

// 상품 카드 클릭 시 상세 페이지로 이동 (하트 버튼은 무시)
function initProductCardClicks() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function (e) {
            // 하트 버튼 클릭 시에는 이동하지 않음
            if (e.target.closest('.heart-btn')) return;

            // 실제 이동 로직 추가 (예: 상세 페이지 URL로 이동)
            // location.href = this.dataset.detailUrl; 
            console.log('상품 상세 페이지로 이동');
        });
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function () {
    // 1) 사이드바 메뉴 활성화 초기화
    initSidebarMenu();

    // 2) 하트 버튼 클릭 이벤트 바인딩
    document.querySelectorAll('.heart-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();          // 카드 클릭 이벤트가 트리거되지 않도록 차단
            toggleHeart(this);            // 하트 토글
            updateItemCount();            // 아이템 개수 업데이트
        });
    });

    // 3) 상품 카드 클릭 시 상세 페이지 이동 이벤트 바인딩
    initProductCardClicks();

    // 4) 초기 아이템 개수 세팅
    updateItemCount();

});
