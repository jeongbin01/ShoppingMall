// 사이드바 메뉴 활성화 기능
function initSidebarMenu() {
    const menuLinks = document.querySelectorAll('.snb_menu .menu_link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 현재 페이지에 해당하는 메뉴 활성화
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
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

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 사이드바 메뉴 초기화
    initSidebarMenu();
});

document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".status-tabs .btn");
    const cards = document.querySelectorAll(".delivery-card");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const selectedStatus = btn.dataset.status;

            cards.forEach(card => {
                const match = selectedStatus === "all" || card.dataset.status === selectedStatus;
                card.style.display = match ? "block" : "none";
            });
        });
    });
});

// 페이지 로드 시 애니메이션 효과
document.addEventListener('DOMContentLoaded', function () {
    // 타임라인 아이템들에 순차적 애니메이션 적용
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        setTimeout(() => {
            item.style.transition = 'all 0.6s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // 새로고침 버튼 기능
    const refreshBtn = document.querySelector('.btn-outline-primary');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            this.innerHTML = '<i class="bi bi-arrow-clockwise me-1 spin"></i>새로고침 중...';
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = '<i class="bi bi-arrow-clockwise me-1"></i>새로고침';
                this.disabled = false;

                // 성공 메시지 표시
                const toast = document.createElement('div');
                toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed';
                toast.style.top = '20px';
                toast.style.right = '20px';
                toast.style.zIndex = '9999';
                toast.innerHTML = `
                            <div class="d-flex">
                                <div class="toast-body">
                                    <i class="bi bi-check-circle me-2"></i>배송 정보가 업데이트되었습니다.
                                </div>
                                <button type="button" class="btn-close btn-close-white me-2" data-bs-dismiss="toast"></button>
                            </div>
                        `;
                document.body.appendChild(toast);

                const bsToast = new bootstrap.Toast(toast);
                bsToast.show();

                toast.addEventListener('hidden.bs.toast', function () {
                    document.body.removeChild(toast);
                });
            }, 2000);
        });
    }
});

// CSS 스타일 추가 (스핀 애니메이션)
const style = document.createElement('style');
style.textContent = `
            .spin {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
document.head.appendChild(style);
