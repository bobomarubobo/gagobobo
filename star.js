// 별점과 코멘트를 저장할 배열
var ratings = [];
var comments = [];
var maxCommentLength = 200;

// DOM 요소에 대한 참조
var commentInput = document.getElementById('comment');
var commentCountElement = document.getElementById('comment-count');
var averageRatingElement = document.getElementById('average-rating');

// 입력한 코멘트의 길이를 확인하고 제한을 적용하는 함수
function saveRatingAndComment() {
    // 입력된 이름
    var name = document.getElementById('username').value.trim();
    if (name.length === 0) {
        alert('아이디를 입력하세요.');
        return;
    }

    var comment = commentInput.value.trim();
    if (comment.length === 0) {
        alert('리뷰를 입력하세요.');
        return;
    }
    if (comment.length > maxCommentLength) {
        alert('리뷰는 최대 ' + maxCommentLength + '자까지 입력할 수 있습니다.');
        return;
    }

    // 선택된 별점
    var selectedRating = document.querySelector('input[name="rating"]:checked');
    if (!selectedRating) {
        alert('별점을 선택해주세요.');
        return;
    }

    // 현재 시간
    var currentTime = new Date();
    var timeString = currentTime.toLocaleString();

    // 별점과 코멘트를 배열에 저장
    ratings.push(parseInt(selectedRating.value));
    comments.push({
        name: name,
        comment: comment,
        time: timeString,
        rating: parseInt(selectedRating.value)
    });

    // 저장된 별점과 코멘트를 표시
    displayRatingsAndComments();
    // 댓글 수 업데이트
    updateCommentCount();
    // 평균 별점 계산 및 표시
    calculateAndDisplayAverageRating();

    // 입력 필드 초기화
    commentInput.value = '';
    document.getElementById('username').value = '';
    document.querySelector('input[name="rating"]:checked').checked = false;
}

// 별점과 코멘트를 표시하는 함수
function displayRatingsAndComments() {
    // 코멘트 목록 표시
    var commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    comments.forEach(function (comment, index) {
        var li = document.createElement('li');

        // 별점을 추가
        var ratingSpan = document.createElement('span');
        ratingSpan.className = 'star';
        ratingSpan.textContent = '★'.repeat(comment.rating) + '☆'.repeat(5 - comment.rating);
        li.appendChild(ratingSpan);

        // 코멘트를 추가
        var commentSpan = document.createElement('span');
        commentSpan.className = 'comment-text';
        commentSpan.textContent = comment.comment;
        li.appendChild(commentSpan);

        // 이름과 시간을 추가
        var nameAndTimeSpan = document.createElement('span');
        nameAndTimeSpan.className = 'comment-name-time';
        nameAndTimeSpan.textContent = `${comment.name} (${comment.time})`;
        li.appendChild(nameAndTimeSpan);

        // 줄바꿈 추가
        li.appendChild(document.createElement('br'));

        // 삭제 버튼 추가
        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete-comment';
        deleteButton.textContent = '삭제하기';
        deleteButton.setAttribute('onclick', `deleteComment(${index})`);
        li.appendChild(deleteButton);

        commentsList.appendChild(li);
    });
}

// 평균 별점 계산 및 표시하는 함수
function calculateAndDisplayAverageRating() {
    var averageRating = calculateAverageRating();
    var starsHTML = '';

    // 반올림하지 않고 소수점 첫째 자리까지 표시
    var fullStars = Math.floor(averageRating); // 정수 부분
    var halfStar = (averageRating - fullStars >= 0.5) ? 1 : 0; // 0.5 이상인 경우 반별 표시

    // 정수 별점만큼 별표(★) 생성
    for (var i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star">★</span>';
    }

    // 반별(☆) 추가
    if (halfStar) {
        starsHTML += '<span class="star">★</span>';
    }

    // 남은 별표(☆) 생성
    for (var j = fullStars + halfStar; j < 5; j++) {
        starsHTML += '<span class="star">☆</span>';
    }

    averageRatingElement.innerHTML = `평균 별점: ${starsHTML} (${averageRating.toFixed(1)})`;
}

// 평균 별점 계산하는 함수
function calculateAverageRating() {
    var totalRating = ratings.reduce(function (acc, rating) {
        return acc + rating;
    }, 0);
    return totalRating / ratings.length;
}

// 댓글 수 업데이트 함수
function updateCommentCount() {
    commentCountElement.textContent = '(' + comments.length + ')';
}

// 코멘트 삭제 함수
function deleteComment(index) {
    // 해당 인덱스의 댓글 삭제
    comments.splice(index, 1);
    // 해당 인덱스의 별점 삭제
    ratings.splice(index, 1);
    // 삭제된 댓글을 제외한 나머지 댓글을 다시 표시
    displayRatingsAndComments();
    // 댓글 수 업데이트
    updateCommentCount();
    // 평균 별점 계산 및 표시
    calculateAndDisplayAverageRating();
}

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
