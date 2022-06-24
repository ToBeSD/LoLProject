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

const select = document.querySelector("#community-select");
const champInput = document.querySelector("#champ-input");

select.addEventListener('change', () => {
    if(select.value == '빌드 연구소') {
        champInput.style.display = 'block';
    }else {
        champInput.style.display = 'none';
    }
})

