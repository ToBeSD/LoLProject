const navbar = document.querySelector('.header-mainnav');

document.addEventListener('scroll', () => {
    if(window.scrollY > 160) {
        navbar.style.background = '#172b65';
    }else if(window.scrollY < 160) {
        navbar.style.background = 'none';
    }
})

const goTop = document.querySelector('.top-button');

goTop.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior: 'smooth' })
})