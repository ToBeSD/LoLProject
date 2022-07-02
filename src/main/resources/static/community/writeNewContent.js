const submitBtn = document.querySelector('.submit-button');
const title = document.querySelector('#title');
const category = document.querySelector('#category-select');
const content = document.querySelector('summernote');

submitBtn.addEventListener('click', () => {
    $.ajax({
        type: "POST",
        url: '/community/post',
        data: JSON.stringify({
            title : title.value,
            content : content.value,
            category : category.value,
        }),
        contentType : 'application/json',
        success: function () {
            if(category.value == '빌드 연구소') {
                location.href = '/community/build';
            }else if(category.value == '자유 게시판') {
                location.href = '/community';
            }
        },
        error: function (e) {
            alert('로그인은 하셨는지요?');
            location.href = '/login';
        }
    })
})
