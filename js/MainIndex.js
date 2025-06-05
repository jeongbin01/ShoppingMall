// TOP 버튼 스크롤 기능
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 카테고리 클릭 이벤트 (이제 a href로 대체되었으므로 JS는 알림용으로만 사용)
function goToCategory(category) {
    // alert(`${category} 카테고리 페이지로 이동합니다.`); // 주석 처리 또는 제거
    // 실제 페이지 이동은 a href가 처리
}

// 검색 기능
document.querySelector('.search-btn').addEventListener('click', function () {
    const searchValue = document.querySelector('.search-input').value;
    if (searchValue.trim()) {
        alert(`"${searchValue}" 검색 결과 페이지로 이동합니다.`);
        // 실제 구현시에는 검색 결과 페이지로 이동
        // window.location.href = `/search?q=${encodeURIComponent(searchValue)}`;
    }
});

// 엔터키로 검색
document.querySelector('.search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.querySelector('.search-btn').click();
    }
});

// 헤더 버튼 이벤트 (이제 a href로 대체되었으므로 JS는 알림용으로만 사용)
document.addEventListener('DOMContentLoaded', function () {
    const headerButtons = document.querySelectorAll('.header-buttons a.btn');
    headerButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // e.preventDefault(); // 실제 페이지 이동을 위해 preventDefault는 제거
            const text = this.textContent.trim();
            if (text.includes('로그인')) {
                console.log('로그인 페이지로 이동'); // 실제 이동은 href가 처리
            } else if (text.includes('회원가입')) {
                console.log('회원가입 페이지로 이동');
            } else if (this.innerHTML.includes('shopping-cart')) {
                console.log('장바구니 페이지로 이동');
            } else if (text.includes('판매')) {
                console.log('판매 페이지로 이동');
            } else if (text.includes('내 상점')) {
                console.log('내 상점 페이지로 이동');
            }
        });
    });

    // 네비게이션 메뉴 이벤트 (a href로 대체)
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            // e.preventDefault(); // 실제 페이지 이동을 위해 preventDefault는 제거
            const text = this.textContent.trim();
            console.log(`${text} 페이지로 이동합니다.`); // 실제 이동은 href가 처리
        });
    });
});

// 애니메이션 효과
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// 관찰할 요소들 추가
document.querySelectorAll('.category-card').forEach(card => {
    observer.observe(card);
});