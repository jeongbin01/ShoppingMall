$(document).ready(function() {
    const $chatMessages = $("#chatMessages");
    const $chatInput = $("#chatInput");
    const $sendBtn = $("#sendBtn");

    // 메시지 하단으로 스크롤 이동 함수
    function scrollToBottom() {
        $chatMessages.scrollTop($chatMessages.prop("scrollHeight"));
    }

    // 운영자(예시) 자동 응답 함수
    function adminAutoReply(userText) {
        setTimeout(function() {
            const replyText = "운영자: \"" + userText + "\" 잘 받았습니다. 확인 후 답변드리겠습니다.";
            const $adminMsg = $("<div>").addClass("message admin").text(replyText);
            $chatMessages.append($adminMsg);
            scrollToBottom();
        }, 1000);
    }

    // 전송 버튼 클릭 처리
    $sendBtn.on("click", function() {
        const text = $chatInput.val().trim();
        if (text === "") return;

        // 사용자 메시지 추가
        const $userMsg = $("<div>").addClass("message user").text(text);
        $chatMessages.append($userMsg);
        scrollToBottom();

        // 입력 필드 초기화
        $chatInput.val("");

        // 운영자 자동 응답 호출
        adminAutoReply(text);
    });

    // Enter 키 눌렀을 때도 전송
    $chatInput.on("keypress", function(e) {
        if (e.which === 13) {
            e.preventDefault();
            $sendBtn.click();
        }
    });

    // 초기 로드시 스크롤 최하단으로 이동
    scrollToBottom();
});