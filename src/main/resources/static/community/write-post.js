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
        success: function (data) {
            console.log(data)
        },
    })
})

