class PaymentManager {
  constructor() {
    this.cards = [];
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderCards();
  }

  bindEvents() {
    const form = document.getElementById('cardForm');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryInput = document.getElementById('expiry');
    const cvcInput = document.getElementById('cvc');

    // 폼 제출 이벤트
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // 카드 번호 입력 포맷팅: 숫자만 뽑아서 4자리마다 스페이스 추가
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
      if (value.length <= 19) {
        e.target.value = value;
      } else {
        e.target.value = value.slice(0, 19);
      }
    });

    // 만료일 입력 포맷팅: 숫자만 뽑아서 두 자리 입력 후 '/' 자동 삽입
    expiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 4) {
        value = value.slice(0, 4);
      }
      if (value.length >= 3) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      e.target.value = value;
    });

    // CVC 입력 제한: 숫자만 허용, 최대 3자리
    cvcInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 3) value = value.slice(0, 3);
      e.target.value = value;
    });
  }

  // 빈 값만 체크: 비어 있으면 에러, 아니면 통과
  validateNotEmpty(fieldId, fieldName) {
    const inputEl = document.getElementById(fieldId);
    const value = inputEl.value.trim();
    if (!value) {
      return { valid: false, message: `${fieldName}을(를) 입력해주세요.` };
    }
    return { valid: true };
  }

  showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);

    errorElement.textContent = message;
    inputElement.classList.add('is-invalid');
  }

  hideError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);

    errorElement.textContent = '';
    inputElement.classList.remove('is-invalid');
  }

  getCardType(cardNumber) {
    // 단순히 첫 숫자만 보고 Visa/MasterCard 등을 판별
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (/^4/.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'MasterCard';
    if (/^3[47]/.test(cleanNumber)) return 'American Express';
    if (/^6/.test(cleanNumber)) return 'Discover';
    return 'Unknown';
  }

  handleSubmit() {
    // 입력값
    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvc = document.getElementById('cvc').value;
    const owner = document.getElementById('owner').value;

    // 필수 입력 여부만 체크
    const cardNumValidation = this.validateNotEmpty('cardNumber', '카드 번호');
    const expiryValidation = this.validateNotEmpty('expiry', '만료일');
    const cvcValidation = this.validateNotEmpty('cvc', 'CVC');
    const ownerValidation = this.validateNotEmpty('owner', '소유자 이름');

    let formIsValid = true;

    if (!cardNumValidation.valid) {
      this.showError('cardNumber', cardNumValidation.message);
      formIsValid = false;
    } else {
      this.hideError('cardNumber');
    }

    if (!expiryValidation.valid) {
      this.showError('expiry', expiryValidation.message);
      formIsValid = false;
    } else {
      this.hideError('expiry');
    }

    if (!cvcValidation.valid) {
      this.showError('cvc', cvcValidation.message);
      formIsValid = false;
    } else {
      this.hideError('cvc');
    }

    if (!ownerValidation.valid) {
      this.showError('owner', ownerValidation.message);
      formIsValid = false;
    } else {
      this.hideError('owner');
    }

    // 모두 빈 값 체크만 통과하면 카드 등록
    if (formIsValid) {
      const newCard = {
        id: Date.now(),
        cardNumber: cardNumber,
        expiry: expiry,
        owner: owner,
        type: this.getCardType(cardNumber),
        registeredAt: new Date().toISOString()
      };

      this.addCard(newCard);
      this.clearForm();
    }
  }

  addCard(card) {
    this.cards.push(card);
    this.renderCards();
    this.showSuccessMessage('카드가 성공적으로 등록되었습니다.');
  }

  removeCard(cardId) {
    if (confirm('정말로 이 카드를 삭제하시겠습니까?')) {
      this.cards = this.cards.filter(card => card.id !== cardId);
      this.renderCards();
      this.showSuccessMessage('카드가 삭제되었습니다.');
    }
  }

  clearForm() {
    document.getElementById('cardForm').reset();
    // 에러 메시지와 is-invalid 클래스 모두 제거
    ['cardNumber', 'expiry', 'cvc', 'owner'].forEach(fieldId => {
      this.hideError(fieldId);
    });
  }

  renderCards() {
    const cardList = document.getElementById('cardList');

    if (this.cards.length === 0) {
      cardList.innerHTML = `
      <div class="col-12">
        <div class="empty-box">
          <i class="bi bi-credit-card" style="font-size: 3rem; color: #6c757d; margin-bottom: 20px;"></i>
          <p class="mb-2">등록된 카드가 없습니다</p>
          <small class="text-muted">카드를 등록하여 빠르고 안전한 결제를 이용하세요</small>
        </div>
      </div>
    `;
      return;
    }

    cardList.innerHTML = this.cards.map(card => {
      const cardClass = card.type.toLowerCase().replace(/\s/g, '');
      // 만료일을 MM/YY에서 분리
      const [mm, yy] = card.expiry.split('/');
      // “유효기간”은 원하시면 MM/YY 그대로 표시하거나, 아래처럼 MM / YYYY 형태로 변환할 수 있습니다.
      // (아래 코드는 fullYear를 사용해서 YYYY 형식으로 변경해주는 예시입니다.)
      const fullYear = yy && yy.length === 2 ? '20' + yy : yy;

      // 등록일자: ISO 문자열에서 날짜 부분만 추출 (YYYY-MM-DD)
      const registeredDate = card.registeredAt.split('T')[0];

      // 카드사 로고(html)는 이전 예시와 동일하게 사용
      let logoHTML = '';
      if (card.type !== 'Unknown') {
        logoHTML = `
        <div class="card-logo">
          <img src="images/${cardClass}.png" alt="${card.type}" />
        </div>
      `;
      } else {
        logoHTML = `
        <div class="card-logo">
          <i class="bi bi-credit-card-fill" style="font-size: 1.5rem;"></i>
        </div>
      `;
      }

      return `
      <div class="col-md-6" data-card-id="${card.id}">
        <div class="card-preview ${cardClass}">
          ${logoHTML}

          <!-- 카드 번호 (전체 표시) -->
          <div class="card-number">${card.cardNumber}</div>

          <!-- 카드 상세 정보 (카드 타입, 유효기간, CVC, 등록일) -->
          <div class="card-details">
            <span class="card-type">${card.type}</span>

            <!-- 유효기간 레이블만 MM/YY 그대로 표시 -->
            <div class="card-expiry-detail">
              <span class="label">유효기간</span>
              <span class="value">${mm}/${yy}</span>
            </div>

            <!-- 풀 연도(YYYY) 형태로 보고 싶으면 아래 코드 대신 위 MM/YY 줄을 주석 처리하고 사용하세요.
            <div class="card-expiry-detail">
              <span class="label">유효기간</span>
              <span class="value">${mm} / ${fullYear}</span>
            </div>
            -->

            <div class="card-cvc-detail">
              <span class="label">CVC</span>
              <span class="value">${card.cvc}</span>
            </div>

            <span class="card-registered">등록: ${registeredDate}</span>
          </div>

          <!-- 소유자 이름 -->
          <div class="card-owner mt-2">
            <small>${card.owner}</small>
          </div>

          <!-- 삭제 버튼 -->
          <button class="delete-btn" onclick="paymentManager.removeCard(${card.id})" title="카드 삭제">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    `;
    }).join('');
  }


  showSuccessMessage(message) {
    // 기존 알림이 있으면 제거
    const existing = document.querySelector('.alert-success');
    if (existing) existing.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // h3 태그 바로 위에 삽입
    const contentArea = document.querySelector('.content_area');
    const firstHeading = contentArea.querySelector('h3');
    contentArea.insertBefore(alertDiv, firstHeading);

    // 3초 뒤 자동 제거
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 3000);
  }
}

// 페이지 로드시 인스턴스 생성
document.addEventListener('DOMContentLoaded', () => {
  window.paymentManager = new PaymentManager();
});
