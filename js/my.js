// 프로필 이미지 클릭 시 파일 선택
document.getElementById("profileImage").addEventListener("click", function () {
    document.getElementById("profileInput").click();
});

// 파일 선택 시 미리보기 적용
document.getElementById("profileInput").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById("profileImage").src = event.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("이미지 파일을 선택해주세요.");
    }
});

// 소개글 수정 토글 함수
function toggleIntroEdit() {
    const view = document.getElementById('introViewMode');
    const edit = document.getElementById('introEditMode');
    const textarea = document.getElementById('introTextarea');
    const text = document.getElementById('shopIntroText').textContent.trim();

    textarea.value = text;
    document.getElementById('introCharCount').textContent = `${text.length}/1000`;

    view.classList.add('d-none');
    edit.classList.remove('d-none');
}

// 소개글 저장 함수
function saveIntro() {
    const textarea = document.getElementById('introTextarea');
    const text = textarea.value.trim();

    if (!text) {
        alert("소개글을 입력해주세요.");
        return;
    }

    document.getElementById('shopIntroText').textContent = text;
    document.getElementById('introViewMode').classList.remove('d-none');
    document.getElementById('introEditMode').classList.add('d-none');
}

// 상점명 수정 함수
function editShopName() {
    const currentName = document.getElementById('shopName').textContent;
    const newName = prompt('새로운 상점명을 입력하세요:', currentName);

    if (newName && newName.trim() !== '') {
        document.getElementById('shopName').textContent = newName.trim();
    }
}

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
    // 소개글 글자수 카운터 초기화
    const textarea = document.getElementById("introTextarea");
    const charCount = document.getElementById("introCharCount");

    if (textarea && charCount) {
        textarea.addEventListener("input", () => {
            charCount.textContent = `${textarea.value.length}/1000`;
        });
    }

    // 사이드바 메뉴 초기화
    initSidebarMenu();

    // 마이페이지 메인 링크 활성화 (항상 활성화 상태 유지)
    const mainPageLink = document.querySelector('.menu_link.active');
    if (mainPageLink && mainPageLink.querySelector('.snb_main_title')) {
        mainPageLink.classList.add('active');
    }
});