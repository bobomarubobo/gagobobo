function goToDexPage() {
    hideCurrentPage();
    showDexPage();5
}

function goToEnhancePage() {
    hideDexPage();
    showCurrentPage();
}

function hideCurrentPage() {
    var currentPage = document.getElementById('container');
    currentPage.style.display = 'none';
}

function showDexPage() {
    var dexPage = document.getElementById('dexPageId');
    dexPage.style.display = 'block';
}

function hideDexPage() {
    var dexPage = document.getElementById('dexPageId');
    dexPage.style.display = 'none';
}

function showCurrentPage() {
    var currentPage = document.getElementById('container');
    currentPage.style.display = 'block';
}

function showDexDetails(itemId) {
    // 모든 상세 정보 요소 숨기기
    var details = document.getElementsByClassName('dex-details');
    for (var i = 0; i < details.length; i++) {
        details[i].style.display = 'none';
    }
    // 클릭한 항목의 상세 정보 보이기
    var itemDetails = document.getElementById(itemId);
    if (itemDetails) {
        itemDetails.style.display = 'block';
    }
}

function enableDexItem(itemId) {
    var dexItem = document.getElementById(itemId);
    dexItem.classList.add('active');
}

// 코멘트 삭제 함수
function deleteComment(index) {
    // 해당 인덱스의 댓글 삭제
    comments.splice(index, 1);
    // 삭제된 댓글을 제외한 나머지 댓글을 다시 표시
    displayRatingsAndComments();
    // 댓글 수 업데이트
    updateCommentCount();
    // 평균 별점 계산 및 표시
    calculateAndDisplayAverageRating();
}

var successCount = 0;
var successRate = 0.8; // 초기 성공 확률
var failureRate = 0.2; // 초기 실패 확률
var enhanceLevel = 0; // 강화 레벨 변수 추가

function enhance() {
    var random = Math.random(); // 0과 1 사이의 랜덤한 숫자 생성
    var successCountElement = document.getElementById("successCount");
    var successRateElement = document.getElementById("successRate");
    var failureRateElement = document.getElementById("failureRate");
    var enhanceButton = document.getElementById("enhanceButton");
    var enchanceRateElement = document.getElementById("enchanceRate")
    var enhanceLevelElement = document.getElementById("enhanceLevel"); // 강화 레벨 표시 요소 추가

    if (successCount < 5) {
        if (random < successRate) {
            // 성공할 때
            successCount++;
            enhanceLevel++; // 강화 레벨 증가
            successCountElement.innerHTML = "<span class='success-text'>&nbsp;성공</span>";
            enhanceLevelElement.textContent = " (+" + enhanceLevel + ")"; // 강화 레벨 표시 업데이트
        } else {
            // 실패할 때
            successCount = 0; // 숫자 초기화
            enhanceLevel = 0; // 강화 레벨 초기화
            successCountElement.innerHTML = "<span class='failure-text'>&nbsp;실패</span>";
            enhanceLevelElement.textContent = " (+" + enhanceLevel + ")"; // 강화 레벨 표시 업데이트
        }
    } else {
        if (document.getElementById("itemImage").src.includes("sword.jpg")) { // 검이 +5로 강화됐을 때 총으로 바뀌어서 강화 단계를 다시 초기화
            document.getElementById("itemImage").src = "gun.jpg";
            document.getElementById("itemName").innerHTML = "총 <span id='enhanceLevel'>+0</span>";
            successRate = 0.7; // 성공 확률 변경
            failureRate = 0.3; // 실패 확률 변경
            successRateElement.textContent = "성공 확률: 70%";
            failureRateElement.textContent = "실패 확률: 30%";
            successCountElement.innerHTML = "<span class='success-text'>업그레이드 성공!</span>";
            enhanceLevel = 0; // 강화 레벨 초기화
            enableDexItem('dexItem2'); // 총 아이템 활성화
        } else if (document.getElementById("itemImage").src.includes("gun.jpg")) {
            // 총이 +5로 강화됐을 때 로켓으로 바뀌어서 강화 단계를 다시 초기화
            document.getElementById("itemImage").src = "rocket.jpg";
            document.getElementById("itemName").innerHTML = "로켓 <span id='enhanceLevel'>+0</span>";
            successRate = 0.6; // 성공 확률 변경
            failureRate = 0.4; // 실패 확률 변경
            successRateElement.textContent = "성공 확률: 60%";
            failureRateElement.textContent = "실패 확률: 40%";
            successCountElement.innerHTML = "<span class='success-text'>업그레이드 성공!</span>";
            enhanceLevel = 0; // 강화 레벨 초기화
            enableDexItem('dexItem3'); // 로켓 아이템 활성화
        } else if (document.getElementById("itemImage").src.includes("rocket.jpg")) { // 로켓이 +5로 강화됐을 때 핵으로 바뀌어서 강화 단계를 다시 초기화
            document.getElementById("itemImage").src = "nuclear.jpg";
            document.getElementById("itemName").innerHTML = "핵 <span id='enhanceLevel'>+0</span>";
            successRate = 0.5; // 성공 확률 변경
            failureRate = 0.5; // 실패 확률 변경
            successRateElement.textContent = "성공 확률: 50%";
            failureRateElement.textContent = "실패 확률: 50%";
            successCountElement.innerHTML = "<span class='success-text'>&nbsp;업그레이드 성공!</span>";
            enhanceLevel = 0; // 강화 레벨 초기화
            enableDexItem('dexItem4'); // 핵 아이템 활성화
        } else if (document.getElementById("itemImage").src.includes("nuclear.jpg")) { // 핵이 +5로 강화됐을 때 풍선으로 바뀌고 강화하기 버튼 비활성화 및 텍스트 변경
            document.getElementById("itemImage").src = "balloon.jpg";
            document.getElementById("itemName").innerHTML = "풍선";
            enhanceButton.disabled = true;
            successCountElement.innerHTML = "<span class='success-text'>&nbsp;축하합니다!</span>";
            enhanceLevel = 0; // 강화 레벨 초기화
            // 이 부분을 주석 처리하여 텍스트가 사라지지 않도록 합니다.
            // successRateElement.textContent = " ";
            // failureRateElement.textContent = " ";
            // enchanceRateElement.textContent = " ";
        }
        successCount = 0; // 숫자 초기화
    }
}