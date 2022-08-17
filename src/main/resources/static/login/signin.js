const signInForm = document.querySelector('[name=signInForm]');
const submitBtn = document.querySelector('#summit-button');

const emailInput = signInForm.querySelector('input[name=email]');
const passwordInput = signInForm.querySelector('input[name=password]');
const passwordConfirmInput = signInForm.querySelector('input[name=password-confirm]')
const nickNameInput = signInForm.querySelector('input[name=nickname]')

const emailPattern = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i);
const passwordPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)

const emailPtag = document.querySelector('#email-p');
const passwordPtag = document.querySelector('#password-p');
const passwordConfirmPtag = document.querySelector('#password-confirm-p');

function validationTest(pattern, input) {
    if(pattern.test(input.value)) {
        return true;
    }else {
        return false;
    }
}

emailInput.addEventListener('change', (e) => {
    if(validationTest(emailPattern, emailInput)) {
        emailPtag.innerHTML = "";
    }else{
        emailPtag.innerHTML = '正しいemailを入力してください!!'
        emailInput.focus();
        return;
    }
})

passwordInput.addEventListener('change', (e) => {
    if(validationTest(passwordPattern, passwordInput)) {
        passwordPtag.innerHTML = "";
    }else{
        passwordPtag.innerHTML = '数字, アルファベット, 特殊文字を含めてください!!';
        passwordInput.focus();
        return;
    }
})

passwordConfirmInput.addEventListener('change', () => {
    if(passwordInput.value === passwordConfirmInput.value) {
        passwordConfirmPtag.innerHTML = "";
    }else {
        passwordConfirmPtag.innerHTML = "パスワードと一致しておりません!!";
    }
})

submitBtn.addEventListener('click', () => {
    if(validationTest(emailPattern, emailInput) && validationTest(passwordPattern, passwordInput)) {
        $.ajax({
            type: "POST",
            url: '/signin',
            data: JSON.stringify(signInForm.toObject()),
            contentType : 'application/json',
            success: function (data) {
                location.href = '/login';
            },
            error(e) {
                alert('重複のemailです.')
                emailInput.value = '';
                passwordInput.value = '';
                passwordConfirmInput.value = '';
                nickNameInput.value = '';
            }
        })
    }else {
        console.log('適切なEmail、パスワードではありません.')
    }
})