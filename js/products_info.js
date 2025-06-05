$(document).ready(function() {
    // 1) 햄버거 버튼 클릭 시 서브메뉴 토글
    $('#hamburger-btn').on('click', function() {
        $('#submenu').slideToggle(200);
    });

    // 화면 다른 곳 클릭 시 서브메뉴 닫기
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#hamburger-btn, #submenu').length) {
            $('#submenu').slideUp(200);
        }
    });

    // 2) 썸네일 클릭 시 메인 이미지 교체
    $('.thumbnail').on('click', function() {
        // 현재 썸네일 비활성화
        $('.thumbnail').removeClass('active');
        // 클릭한 썸네일 활성화
        $(this).addClass('active');
        // data-full 속성의 URL을 메인 이미지로 교체
        const newSrc = $(this).data('full');
        $('#main-image').fadeOut(100, function() {
            $(this).attr('src', newSrc).fadeIn(200);
        });
    });

    // 3) 옵션(사이즈) 선택 유효성 검사 예시
    $('#buy-button').on('click', function() {
        const size = $('#selected-size').val();
        if (!size) {
            alert('구매를 위해 사이즈를 선택해주세요.');
            return;
        }
        // 실제 결제/구매 로직은 여기에서 처리
        alert(`사이즈 ${size} 선택 완료! 구매페이지로 이동합니다.`);
    });

    $('#sell-button').on('click', function() {
        const size = $('#selected-size').val();
        if (!size) {
            alert('판매를 위해 사이즈를 선택해주세요.');
            return;
        }
        // 실제 판매 로직은 여기에서 처리
        alert(`사이즈 ${size} 선택 완료! 판매 등록페이지로 이동합니다.`);
    });
});
