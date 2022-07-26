const writeForm = document.querySelector('#community-form');
const title = writeForm.querySelector('input[name = title]');
const content = writeForm.querySelector('textarea[name=content]');
const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener('click', ()=> {
    $.ajax({
        type: "POST",
        url: '/notice/post',
        data: JSON.stringify({
            title : title.value,
            content : content.value,
        }),
        contentType : 'application/json',
        success: function (data, textStatus, jqXHR) {
            if(jqXHR.status == 200) {
                location.href = '/notice';
            }
        },
        error: function (e) {
            if(e.status == 403) {
                alert('제목을 입력하세요');
            }
        },
    })
})