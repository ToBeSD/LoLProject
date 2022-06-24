
const deleteBtn = document.querySelector('#delete-button');
const bno = document.querySelector('#bno');

deleteBtn.addEventListener('click', () => {
    $.ajax({
        type: "POST",
        url: '/community/post/delete',
        data: JSON.stringify({
            bno : bno.value,
        }),
        contentType : 'application/json',
        success: function () {
            console.log('글삭제 성공')
        },
    })
    history.back();
})