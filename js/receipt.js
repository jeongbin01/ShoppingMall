// sidebar.js (사이드바 메뉴 초기화 + 활성화 제어)
function initSidebarMenu() {
    const menuLinks = document.querySelectorAll('.snb_menu .menu_link');
    // 현재 페이지 파일명 (예: "15_Payment.html")
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 1) 페이지 로드 시, 현재 페이지와 href가 일치하는 링크에 active 클래스 추가
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2) 클릭 이벤트 바인딩: 클릭한 메뉴에만 active 클래스 붙이기
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            // href에 설정된 페이지로는 정상 이동(기본 동작) 유지
        });
    });
}

// “현금영수증 정보” 메뉴 링크 활성화 함수
function activateReceiptMenu() {
    const menuLinks = document.querySelectorAll('.snb_menu .menu_link');
    // href="16_Receipt.html"인 메뉴를 찾아 active로 교체
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === '16_Receipt.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSidebarMenu();
});


// ─────────────────────────────────────────────────────────────────────
// receipt.js
// 주문 목록 + 현금 영수증 모달 제어 스크립트
// ─────────────────────────────────────────────────────────────────────

$(document).ready(function () {
    // 1) 예시용 주문 데이터 (실제 API 연동 시 교체할 부분)
    const orderData = [
        {
            id: 'ORD-20250601-001',
            date: '2025-06-01 14:23',
            customer: '홍길동',
            status: '접수',
            paymentInfo: '현금 ••••-••••-9790',
            items: [
                { code: 'P1001', name: '데님 재킷', qty: 1, price: 75000 },
                { code: 'P1002', name: '화이트 티셔츠', qty: 1, price: 25000 },
            ],
        },
        {
            id: 'ORD-20250531-045',
            date: '2025-05-31 11:10',
            customer: '김영희',
            status: '처리중',
            paymentInfo: '카드 ••••-••••-1234',
            items: [{ code: 'P2003', name: '노트북', qty: 1, price: 1200000 }],
        },
        {
            id: 'ORD-20250530-112',
            date: '2025-05-30 18:55',
            customer: '이철수',
            status: '완료',
            paymentInfo: '카카오페이',
            items: [
                { code: 'P3004', name: '청바지', qty: 2, price: 27000 },
                { code: 'P3005', name: '양말', qty: 3, price: 15000 },
            ],
        },
        {
            id: 'ORD-20250529-091',
            date: '2025-05-29 09:45',
            customer: '박민수',
            status: '취소',
            paymentInfo: '네이버페이',
            items: [{ code: 'P4002', name: '가방', qty: 1, price: 45000 }],
        },
        {
            id: 'ORD-20250528-067',
            date: '2025-05-28 16:30',
            customer: '최수영',
            status: '완료',
            paymentInfo: '현금',
            items: [
                { code: 'P5001', name: '운동화', qty: 1, price: 89000 },
                { code: 'P5002', name: '운동복 세트', qty: 1, price: 65000 },
            ],
        },
    ];

    // 2) 테이블 렌더링 함수
    function renderTable(data) {
        const $tbody = $('#ordersTableBody');
        $tbody.empty();

        data.forEach((order) => {
            // 총액(원) 계산
            const total = order.items.reduce(
                (sum, item) => sum + item.price * item.qty,
                0
            );

            const $tr = $('<tr></tr>');
            $tr.append(
                `<td><input type="checkbox" class="rowCheckbox" data-id="${order.id}" /></td>`
            );
            $tr.append(`<td><strong>${order.id}</strong></td>`);
            $tr.append(`<td>${order.date}</td>`);
            $tr.append(`<td><strong>${order.customer}</strong></td>`);
            $tr.append(`<td>${order.items.length}개</td>`);
            $tr.append(
                `<td><strong>₩${total.toLocaleString()}</strong></td>`
            );
            $tr.append(
                `<td><span class="badge ${getBadgeClass(order.status)}">${order.status}</span></td>`
            );
            $tr.append(
                `<td>
           <button class="btn btn-sm btn-info btn-view" data-id="${order.id}">
             <i class="fas fa-receipt me-1"></i>영수증 보기
           </button>
         </td>`
            );
            $tbody.append($tr);
        });
    }

    // 상태별 배지(badge) 클래스 반환
    function getBadgeClass(status) {
        switch (status) {
            case '접수':
                return 'bg-warning text-dark';
            case '처리중':
                return 'bg-primary';
            case '완료':
                return 'bg-success';
            case '취소':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    }

    // 3) 검색 & 필터 적용
    function applyFilters() {
        const searchTerm = $('#searchInput').val().toLowerCase();
        const selectedStatus = $('#statusFilter').val();

        $('#ordersTableBody tr').each(function () {
            const $tr = $(this);
            const idText = $tr.find('td:eq(1)').text().toLowerCase();
            const customerText = $tr.find('td:eq(3)').text().toLowerCase();
            const statusText = $tr.find('.badge').text().trim();

            const matchesSearch =
                idText.includes(searchTerm) || customerText.includes(searchTerm);
            const matchesStatus =
                selectedStatus === '전체' || selectedStatus === statusText;

            if (matchesSearch && matchesStatus) {
                $tr.show();
            } else {
                $tr.hide();
            }
        });
    }

    // 4) CSV 내보내기(exportToCSV)
    function exportToCSV(filename = 'cash_receipts.csv') {
        const rows = [];
        rows.push(['주문번호', '주문일시', '고객명', '상품수', '총액', '상태']);

        $('#ordersTableBody tr:visible').each(function () {
            const $tr = $(this);
            const cols = [];
            // ① 주문번호 (strong 태그 포함 텍스트)
            cols.push($tr.find('td:eq(1)').text().trim());
            // ② 주문일시
            cols.push($tr.find('td:eq(2)').text().trim());
            // ③ 고객명
            cols.push($tr.find('td:eq(3)').text().trim());
            // ④ 상품수 (“n개” → 숫자만)
            const countText = $tr.find('td:eq(4)').text().trim();
            cols.push(countText.replace('개', ''));
            // ⑤ 총액 (“₩n,nnn” → 숫자만)
            const totalText = $tr.find('td:eq(5)').text().trim();
            cols.push(totalText.replace(/₩|,/g, ''));
            // ⑥ 상태 (badge 텍스트)
            cols.push($tr.find('.badge').text().trim());

            rows.push(cols);
        });

        // CSV 문자열 생성
        const csvContent = rows.map((r) => r.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // 5) “현금 영수증” 모달 열기(openModal), 닫기(closeModal)
    function openModal(order) {
        // (1) 주문번호, 주문일시
        $('#modalOrderId').text(order.id);
        $('#modalOrderDate').text(order.date);

        // (2) 결제수단, 고객명
        $('#modalPaymentInfo').text(order.paymentInfo);
        $('#modalCustomerName').text(order.customer);

        // (3) 상품 리스트 동적 생성
        const $itemsBody = $('#modalItemsBody');
        $itemsBody.empty();

        let subtotal = 0;
        order.items.forEach((item) => {
            const lineTotal = item.price * item.qty;
            subtotal += lineTotal;

            // 상품명, 옵션(없으면 "-"), 단가, 수량, 합계
            $itemsBody.append(`
        <tr>
          <td>${item.name}</td>
          <td class="text-center">-</td>
          <td class="text-center">₩${item.price.toLocaleString()}</td>
          <td class="text-center">${item.qty}</td>
          <td class="text-end">₩${lineTotal.toLocaleString()}</td>
        </tr>
      `);
        });

        // (4) 소계 / 부가세 / 공급가액 / 총액 계산
        const tax = Math.round(subtotal * 0.1); // 부가세 10%
        const supply = subtotal - tax; // 공급가액
        const total = subtotal; // 최종 결제금액 (여기서는 subtotal과 동일)

        $('#modalSubtotal').text(`₩${subtotal.toLocaleString()}`);
        $('#modalTax').text(`₩${tax.toLocaleString()}`);
        $('#modalSupply').text(`₩${supply.toLocaleString()}`);
        $('#modalTotalPrice').text(`₩${total.toLocaleString()}`);

        // (5) 모달 표시
        $('#orderModal').addClass('show');
    }

    function closeModal() {
        $('#orderModal').removeClass('show');
    }

    // ─────────────────────────────────────────────────────────────
    // 6) 초기 렌더링: 테이블에 예시 데이터 출력
    // ─────────────────────────────────────────────────────────────
    renderTable(orderData);

    // ─────────────────────────────────────────────────────────────
    // 7) 이벤트 바인딩
    // ─────────────────────────────────────────────────────────────
    // 검색창 입력 → 필터링
    $('#searchInput').on('input', applyFilters);

    // 상태 필터 변경 → 필터링
    $('#statusFilter').on('change', applyFilters);

    // “전체 선택” 체크박스 토글
    $('#selectAll').on('change', function () {
        $('.rowCheckbox:visible').prop('checked', this.checked);
    });

    // 개별 행 체크박스 토글 시 전체 선택 상태 업데이트
    $(document).on('change', '.rowCheckbox', function () {
        const allVisible = $('.rowCheckbox:visible');
        const checkedVisible = $('.rowCheckbox:visible:checked');
        $('#selectAll').prop(allVisible.length === checkedVisible.length);
    });

    // CSV 내보내기 버튼
    $('#exportBtn').on('click', () => exportToCSV());

    // “영수증 보기(상세보기)” 버튼 클릭 → 모달 열기
    $(document).on('click', '.btn-view', function () {
        const orderId = $(this).data('id');
        const order = orderData.find((o) => o.id === orderId);
        if (order) openModal(order);
    });

    // 모달 닫기 버튼 클릭 → 모달 닫기
    $('#modalCloseBtnFooter').on('click', closeModal);
});
