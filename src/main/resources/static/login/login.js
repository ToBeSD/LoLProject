const signInForm = document.querySelector('.login-form');
const submitBtn = document.querySelector('#submit-button');

submitBtn.addEventListener('click', () => {
    $.ajax({
        type: "POST",
        url: '/login',
        data: JSON.stringify(signInForm.toObject()),
        contentType : 'application/json',
        success: function () {
            console.log('success')
        },
    })
})

