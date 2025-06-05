$(document).ready(function() {
    // 1) 햄버거 버튼 클릭 시 서브메뉴 토글
    $('#hamburger-btn').on('click', function(e) {
        e.stopPropagation();               // 버튼 클릭 시 이벤트 버블링 방지
        $('#submenu').fadeToggle(150);     // 토글 애니메이션
    });

    // 2) 화면의 다른 영역 클릭하면 서브메뉴 자동 닫기
    $(document).on('click', function() {
        $('#submenu').fadeOut(150);
    });

    // 3) 서브메뉴 클릭할 때 이벤트 버블링 방지
    $('#submenu').on('click', function(e) {
        e.stopPropagation();
    });

    // 4) 카운트다운 예시 (1시간 후 종료)
    function initializeCountdown(durationSeconds) {
        var remaining = durationSeconds;
        function updateTimer() {
            if (remaining <= 0) {
                $('#countdown').text('입찰 마감');
                clearInterval(timerInterval);
                return;
            }
            var hrs = Math.floor(remaining / 3600);
            var mins = Math.floor((remaining % 3600) / 60);
            var secs = remaining % 60;
            var formatted = String(hrs).padStart(2, '0') + ':' +
                            String(mins).padStart(2, '0') + ':' +
                            String(secs).padStart(2, '0');
            $('#countdown').text(formatted);
            remaining--;
        }
        updateTimer();
        var timerInterval = setInterval(updateTimer, 1000);
    }
    initializeCountdown(3600);

    // 5) 입찰하기 버튼 클릭
    $('#bid-submit').on('click', function() {
        var bidVal = $('#bid-amount').val().trim();
        if (!bidVal || isNaN(bidVal) || Number(bidVal) <= 0) {
            alert('유효한 입찰 금액을 입력하세요.');
            $('#bid-amount').focus();
            return;
        }
        alert('입찰 완료: ' + Number(bidVal).toLocaleString() + '원');
        $('#bid-amount').val('');
    });

    // 6) 즉시 구매 버튼 클릭
    $('#buy-now').on('click', function() {
        var buyPriceText = $(this).text().match(/\d+\,?\d*/g);
        var buyPrice = buyPriceText ? buyPriceText[0].replace(',', '') : '0';
        if (confirm('즉시 구매하시겠습니까? (' + Number(buyPrice).toLocaleString() + '원)')) {
            alert('즉시 구매 성공! (' + Number(buyPrice).toLocaleString() + '원 결제)');
        }
    });

    // 7) Next 버튼 클릭
    $('#next-step').on('click', function() {
        alert('다음 단계로 이동합니다.');
    });
});
