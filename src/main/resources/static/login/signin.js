const signInForm = document.querySelector('[name=signInForm]');
const submitBtn = document.querySelector('#summit-button');

const emailInput = signInForm.querySelector('input[name=email]');
const passwordInput = signInForm.querySelector('input[name=password]');
const passwordConfirmInput = signInForm.querySelector('input[name=password-confirm]')

const eamilPattern = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i);
const passwordPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)

const emailPtag = document.querySelector('#email-p');
const passwordPtag = document.querySelector('#password-p');
const passwordConfirmPtag = document.querySelector('#password-confirm-p');

emailInput.addEventListener('change', (e) => {
    if(eamilPattern.test(emailInput.value) == true) {
        emailPtag.innerHTML = "";
    }else{
        emailPtag.innerHTML = '올바른 이메일 형식을 입력하세요!!'
        emailInput.value='';
        emailInput.focus();
        return;
    }
})

passwordInput.addEventListener('change', (e) => {
    if(passwordPattern.test(passwordInput.value) == true) {
        passwordPtag.innerHTML = "";
    }else{
        passwordPtag.innerHTML = '숫자, 알파벳, 특수문자를 포함하셔야 합니다!!';
        passwordInput.value='';
        passwordInput.focus();
        return;
    }
})

passwordConfirmInput.addEventListener('change', () => {
    if(passwordInput.value === passwordConfirmInput.value) {
        passwordConfirmPtag.innerHTML = "";
    }else {
        passwordConfirmPtag.innerHTML = "비밀번호와 일치하지 않습니다!!";
    }
})

submitBtn.addEventListener('click', () => {
    $.ajax({
        type: "POST",
        url: '/signin',
        data: JSON.stringify(signInForm.toObject()),
        contentType : 'application/json',
        success: function () {
            console.log('success')
        },
    })
})