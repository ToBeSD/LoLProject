const writeForm = document.querySelector('#community-form');
const title = writeForm.querySelector('input[name = title]');
const category = writeForm.querySelector('select[name = category]');
const champName = writeForm.querySelector('select[name = champname]');
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
            champName : champName.value,
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

category.addEventListener('change', () => {
    if(category.value == '빌드 연구소') {

        champName.style.display = 'block';

        $.ajax({
            type: "GET",
            url: '/community/champname',
            dataType: 'JSON',
            contentType : 'application/json',
            success: function (data) {
                let nameList = '';

                for (let i = 0; i < data.length; i++) {
                    nameList += `<option>
                                    <span>${data[i].name}</span>
                                </option>`;
                }

                $('#champ-select').append(nameList);
            },
            error: function (e) {
                alert(e.status)
            },
        })
    } else {
        champName.style.display = 'none';
    }
})
