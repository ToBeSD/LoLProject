const signInForm = document.querySelector('[name=signInForm]');
const submitBtn = document.querySelector('#summit-button');

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