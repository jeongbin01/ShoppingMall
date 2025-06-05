// 탭 전환 기능
document.addEventListener('DOMContentLoaded', function () {
  const tabItems = document.querySelectorAll('.tab-item');
  const tabContents = document.querySelectorAll('.tab-content');

  tabItems.forEach(item => {
    item.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab');

      // 모든 탭 비활성화
      tabItems.forEach(tab => tab.classList.remove('active'));
      tabContents.forEach(content => content.style.display = 'none');

      // 선택된 탭 활성화
      this.classList.add('active');
      document.getElementById(targetTab + '-content').style.display = 'block';
    });
  });
});

// 모달 열기/닫기 기능
function openModal(modalId) {
  document.getElementById(modalId + 'Overlay').style.display = 'block';
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId + 'Overlay').style.display = 'none';
  document.getElementById(modalId).style.display = 'none';
}

// 모달 내 상태 버튼 클릭 이벤트
document.addEventListener('DOMContentLoaded', function () {
  const statusBtns = document.querySelectorAll('.status-btn');

  statusBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // 같은 모달 내의 다른 버튼들에서 active 클래스 제거
      const modal = this.closest('.status-modal');
      const modalBtns = modal.querySelectorAll('.status-btn');
      modalBtns.forEach(modalBtn => modalBtn.classList.remove('active'));

      // 클릭된 버튼에 active 클래스 추가
      this.classList.add('active');
    });
  });
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const openModals = document.querySelectorAll('.status-modal[style*="block"]');
    openModals.forEach(modal => {
      const modalId = modal.id;
      closeModal(modalId);
    });
  }
});