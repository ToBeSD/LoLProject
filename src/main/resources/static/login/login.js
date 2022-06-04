const navbar = document.querySelector('.header-mainnav');

document.addEventListener('scroll', () => {
    console.log(window.scrollY)
    if(window.scrollY > 160) {
        navbar.style.background = '#172b65';
    }else if(window.scrollY < 160) {
        navbar.style.background = 'none';
    }
})