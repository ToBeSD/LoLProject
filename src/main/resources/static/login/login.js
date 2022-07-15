const signInForm = document.querySelector('.login-form');
const submitBtn = document.querySelector('#submit-button');

submitBtn.addEventListener('click', () => {
    $.ajax({
        type: "POST",
        url: '/login',
        data: JSON.stringify(signInForm.toObject()),
        contentType : 'application/json',
        success: function () {
            location.href = '/mypage';
        },
        error(){
            alert('이메일 혹은 비밀번호가 틀렸습니다.')
        }
    })
})



