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
            console.log('글작성 성공')
        },
    })
})
