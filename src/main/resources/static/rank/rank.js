const navbar = document.querySelector('.header-mainnav');
const position = document.querySelector('.position');
const topBtn = document.querySelectorAll('.position-button')[0];
const jungleBtn = document.querySelectorAll('.position-button')[1];
const midBtn = document.querySelectorAll('.position-button')[2];
const adBtn = document.querySelectorAll('.position-button')[3];
const supBtn = document.querySelectorAll('.position-button')[4];
const allBtn = document.querySelectorAll('.position-button')[5];

document.addEventListener('scroll', () => {
    if(window.scrollY > 160) {
        navbar.style.background = '#172b65';
    }else if(window.scrollY < 160) {
        navbar.style.background = 'none';
    }
})

position.addEventListener('click', (e) => {
    if(e.target === topBtn) {
        topBtn.classList.remove('active');
        jungleBtn.classList.remove('active');
        midBtn.classList.remove('active');
        adBtn.classList.remove('active');
        supBtn.classList.remove('active');

        topBtn.classList.add('active');

    } 
    if(e.target === jungleBtn) {
        topBtn.classList.remove('active');
        jungleBtn.classList.remove('active');
        midBtn.classList.remove('active');
        adBtn.classList.remove('active');
        supBtn.classList.remove('active');
        allBtn.classList.remove('active');

        jungleBtn.classList.add('active');
    } 
    if(e.target === midBtn) {
        topBtn.classList.remove('active');
        jungleBtn.classList.remove('active');
        midBtn.classList.remove('active');
        adBtn.classList.remove('active');
        supBtn.classList.remove('active');
        allBtn.classList.remove('active');

        midBtn.classList.add('active');
    } 
    if(e.target === adBtn) {

        topBtn.classList.remove('active');
        jungleBtn.classList.remove('active');
        midBtn.classList.remove('active');
        adBtn.classList.remove('active');
        supBtn.classList.remove('active');
        allBtn.classList.remove('active');

        adBtn.classList.add('active');
    } 
    if(e.target === supBtn) {
        topBtn.classList.remove('active');
        jungleBtn.classList.remove('active');
        midBtn.classList.remove('active');
        adBtn.classList.remove('active');
        supBtn.classList.remove('active');
        allBtn.classList.remove('active');

        supBtn.classList.add('active');

        $.post('/champ/rankline', { "line" : "서폿" })
            .done((data) => {
                console.log(data);
            })
    }

    if(e.target === allBtn) {
        topBtn.classList.remove('active');
        jungleBtn.classList.remove('active');
        midBtn.classList.remove('active');
        adBtn.classList.remove('active');
        supBtn.classList.remove('active');
        allBtn.classList.remove('active');

        allBtn.classList.add('active');

        $.get('/champ/rankall')
            .done((data) => {
                for(let i = 0; i < data.length; i++) {
                    let list = `           
                       <div class="list">
                            <span>${i}</span>
                            <div style="width: 40px; padding: 0;">
                                <img class="list-image" src="/rank/${data[i].image}" alt="img">
                            </div>
                            <span style="width: 30%;">${data[i].name}</span>
                            <span>${data[i].line}</span>
                            <span class="list-number">${data[i].psScore}</span>
                            <span class="list-number">${data[i].honeyScore}</span>
                            <span class="list-number">${data[i].winRate}</span>
                            <span class="list-number">${data[i].pickRate}</span>
                            <span class="list-number">${data[i].banRate}</span>
                            <span class="list-number">${data[i].count}</span>
                        </div>`;
                    $('.champ-list').append(list);
                }
            })
    }
})

const mainSpan1 = document.querySelectorAll('.main-content-item')[0];
const mainSpan2 = document.querySelectorAll('.main-content-item')[1];

mainSpan1.addEventListener('click', () => { // 412
    console.log('click1')
    mainSpan1.classList.remove('main-content-active');
    mainSpan2.classList.remove('main-content-active');
    
    mainSpan1.classList.add('main-content-active');

    window.scrollTo({ top:412, behavior: 'smooth' });
})

mainSpan2.addEventListener('click', () => {
    console.log('click2')
    mainSpan1.classList.remove('main-content-active');
    mainSpan2.classList.remove('main-content-active');
    
    mainSpan2.classList.add('main-content-active');
})

const goTop = document.querySelector('.top-button');

goTop.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior: 'smooth' })
})