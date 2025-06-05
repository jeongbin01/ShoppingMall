// js/sell.js
document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('product-image');
    const previewPlaceholder = document.querySelector('.preview-placeholder');
    const cancelBtn = document.getElementById('cancel-btn');
    const nextBtn = document.getElementById('next-btn');

    // 이미지 업로드 시 미리보기
    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) {
            resetPreview();
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드 가능합니다.');
            fileInput.value = '';
            resetPreview();
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            // 기존 placeholder 내용을 지우고 이미지 엘리먼트 삽입
            previewPlaceholder.innerHTML = '';
            const img = document.createElement('img');
            img.src = event.target.result;
            img.alt = '상품 이미지 미리보기';
            img.style.maxWidth = '100%';    // 가로 최대 360px
            img.style.maxHeight = '250px';   // 세로 최대 250px
            img.style.objectFit = 'contain'; // 이미지 비율 유지
            previewPlaceholder.appendChild(img);
        };
        reader.readAsDataURL(file);

    });

    // 미리보기 초기화 함수
    function resetPreview() {
        previewPlaceholder.innerHTML = '<span>미리보기 영역</span>';
    }

    // 취소 버튼 클릭 시: 폼 리셋 + 미리보기 초기화
    cancelBtn.addEventListener('click', function () {
        // input, select, textarea 전부 초기화
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-category').selectedIndex = 0;
        document.getElementById('product-info').value = '';
        fileInput.value = '';
        resetPreview();
    });

    // 다음 버튼 클릭 시: 유효성 검사
    nextBtn.addEventListener('click', function () {
        const name = document.getElementById('product-name').value.trim();
        const price = document.getElementById('product-price').value.trim();
        const category = document.getElementById('product-category').value;
        const info = document.getElementById('product-info').value.trim();

        if (!fileInput.files[0]) {
            alert('상품 이미지를 선택해주세요.');
            return;
        }
        if (!name) {
            alert('상품명을 입력해주세요.');
            return;
        }
        if (!price || isNaN(price) || Number(price) <= 0) {
            alert('유효한 가격을 입력해주세요.');
            return;
        }
        if (!category) {
            alert('카테고리를 선택해주세요.');
            return;
        }
        if (!info) {
            alert('상품 상세 설명을 입력해주세요.');
            return;
        }

        // 모든 검사를 통과하면 실제 업로드 로직을 수행하거나 다음 단계로 이동
        // 예: form 제출, 서버로 데이터 전송 등
        // 아래는 예시로 콘솔 출력 및 알림만 표시
        console.log('상품명:', name);
        console.log('가격:', price);
        console.log('카테고리:', category);
        console.log('상세설명:', info);
        console.log('이미지 파일:', fileInput.files[0]);

        alert('상품 등록이 완료되었습니다.');
        // 필요 시 페이지 이동:
        // window.location.href = '/my-shop.html';
    });
});
