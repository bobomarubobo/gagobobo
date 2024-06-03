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
    var comment = commentInput.value;
    if (comment.trim().length === 0) {
        alert('댓글을 입력하세요.');
        return;
    }
    if (comment.length > maxCommentLength) {
        alert('댓글은 최대 ' + maxCommentLength + '자까지 입력할 수 있습니다.');
        return;
    }

    // 선택된 별점
    var selectedRating = document.querySelector('input[name="rating"]:checked');
    if (!selectedRating) {
        alert('별점을 선택해주세요.');
        return;
    }

    // 입력된 이름
    var name = document.getElementById('username').value;

    // 현재 시간
    var currentTime = new Date();
    var timeString = currentTime.toLocaleString();

    // 별점과 코멘트를 배열에 저장
    ratings.push(selectedRating.value);
    comments.push({
        name: name,
        comment: comment,
        time: timeString,
        rating: selectedRating.value
    });

    // 저장된 별점과 코멘트를 표시
    displayRatingsAndComments();
    // 댓글 수 업데이트
    updateCommentCount();
    // 평균 별점 계산 및 표시
    calculateAndDisplayAverageRating();
}

// 별점과 코멘트를 표시하는 함수
function displayRatingsAndComments() {
    // 평균 별점 표시
    var averageRating = calculateAverageRating();
    var starsHTML = '';

    // 별점이 5 미만인 경우 5로 설정
    averageRating = Math.min(5, averageRating);

    // 평균 별점만큼 별표(★) 생성
    for (var i = 0; i < Math.floor(averageRating); i++) {
        starsHTML += '<span class="star">★</span>';
    }

    // 남은 별표(☆) 생성
    for (var j = 0; j < 5 - Math.floor(averageRating); j++) {
        starsHTML += '<span class="star">☆</span>';
    }

    averageRatingElement.innerHTML = '평균 별점: ' + starsHTML;

    // 코멘트 목록 표시
    var commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    comments.forEach(function (comment, index) {
        var li = document.createElement('li');

        // 별점을 추가
        var ratingSpan = document.createElement('span');
        ratingSpan.className = 'star';
        ratingSpan.textContent = '★'.repeat(parseInt(comment.rating)) + '☆'.repeat(5 - parseInt(comment.rating));
        li.appendChild(ratingSpan);

        // 코멘트를 추가
        var commentSpan = document.createElement('span');
        commentSpan.className = 'comment-text';
        commentSpan.textContent = comment.comment;
        li.appendChild(commentSpan);

        // 이름과 시간을 추가
        var nameAndTimeSpan = document.createElement('span');
        nameAndTimeSpan.className = 'comment-name-time';
        nameAndTimeSpan.textContent = comment.name + ' (' + comment.time + ')';
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

// 평균 별점 계산하는 함수
function calculateAverageRating() {
    var totalRating = ratings.reduce(function (acc, rating) {
        return acc + parseInt(rating);
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
    // 삭제된 댓글을 제외한 나머지 댓글을 다시 표시
    displayRatingsAndComments();
    // 댓글 수 업데이트
    updateCommentCount();
    // 평균 별점 계산 및 표시
    calculateAndDisplayAverageRating();
}
