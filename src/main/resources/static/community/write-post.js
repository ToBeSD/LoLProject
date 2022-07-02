const writeForm = document.querySelector('#community-form');
const title = writeForm.querySelector('input[name = title]');
const category = writeForm.querySelector('select');
const content = writeForm.querySelector('textarea[name=content]');
const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener('click', ()=> {
    $.ajax({
        type: "POST",
        url: '/community/post',
        data: JSON.stringify({
            title : title.value,
            category : category.value,
            content : content.value,
        }),
        dataType: 'JSON',
        contentType : 'application/json',
        success: function (data, textStatus, jqXHR) {
            if(jqXHR.status == 200 && category.value == '빌드 연구소') {
                location.href = '/community/build';
            }else if(jqXHR.status == 200 && category.value == '자유 게시판') {
                location.href = '/community';
            }
        },
        error: function (e) {
            if(e.status == 403) {
                alert('로그인은 하셨는지요?');
                location.href = '/login';
            }
        },
    })
})


