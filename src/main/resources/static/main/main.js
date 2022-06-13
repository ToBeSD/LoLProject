const realtime = document.getElementById('realtime_search');

let count = 1;

const slideRealtime = setInterval(() => {
    realtime.style.transform = `translate(0%, ${count * -29}px)`;
    count++;

    if(count == 11) {
        realtime.style.transform = 'translate(0%, 0%)';
        count = 1;
    }

}, 1000);

$.ajax({
    type: "GET",
    url: '/maincard',
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let smallCard;
        for(let i = 0; i < data.length; i++) {
            smallCard +=`        
                        <div class="swiper-wrapper-small">
                            <div class="swiper-slide">
                                <div class="slide-image-small">
                                    <img class="small-img" src="/image/champfull/${data[i].image}">
                                    <h3 class="champion-name">${data[i].name}<small>(${data[i].line})</small></h3>
                                </div>
                            </div>
                        </div>
                    `;
        }
        $('.mainslide_container').append(smallCard);



    },
});

let card = `
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="slide-image">
                    <h3 class="champion-name none">아트록스<small>(탑)</small></h3>
                </div>

                <div class="champslide-infobox">
                    <div class="champ-status">
                        <h2>아트록스(탑)</h2>

                        <li class="champ-status-header">
                            <span></span>
                            <span class="before">이전패치</span>
                            <span>현재패치</span>
                        </li>
                        <li class="champ-status-item">
                            <h4>승률</h4>
                            <span class="before">50.38%</span>
                            <span>49.38%</span>
                        </li>
                        <li class="champ-status-item">
                            <h4>픽률</h4>
                            <span class="before">11.23%</span>
                            <span>10.23%</span>
                        </li>
                        <li class="champ-status-item">
                            <h4>벤율</h4>
                            <span class="before">6.5%</span>
                            <span>4.2%</span>
                        </li>
                    </div>

                    <div class="champ-point">
                        <h4>주목해야 할 포인트</h4>
                        <p style="font-size: 12px;">최근 패치에서 아트록스의 승률이 -1% 하락하였습니다. 곧 구체적인 원인을 분석하여 업데이트 될 예정입니다.</p>
                    </div>

                    <div style="width:135px; padding: 50px 0px 0px 200px;">
                        <a class="champ-link">챔피언 상세정보 →</a>
                    </div>
                </div>
            </div>
        </div>`;

const left = document.querySelector('.left');
const right = document.querySelector('.right');

$('.mainslide_container').on('click', (e) => {
    console.log(e.target)
    if(e.target === $('.swiper-wrapper-small')) {
        $('.swiper-wrapper-small').css({display: 'block'});
        e.target.css({display: 'none'});
        $('.swiper-wrapper').remove();
    }
});




// $('.swiper-wrapper-small').eq(0).on('click', () => {
//     $('.swiper-wrapper-small').css({display: 'block'});
//     $('.swiper-wrapper-small').eq(0).css({display : 'none'});
//     $('.swiper-wrapper').remove();
//
//     $('.mainslide_container').prepend(card);
// })
//
// $('.swiper-wrapper-small').eq(1).on('click', () => {
//     $('.swiper-wrapper-small').css({display: 'block'});
//     $('.swiper-wrapper-small').eq(1).css({display : 'none'});
//     $('.swiper-wrapper').remove();
//
//     $('.mainslide_container').prepend(card);
// })
//
// $('.swiper-wrapper-small').eq(2).on('click', () => {
//     $('.swiper-wrapper-small').css({display: 'block'});
//     $('.swiper-wrapper-small').eq(2).css({display : 'none'});
//     $('.swiper-wrapper').remove();
//
//     $('.mainslide_container').prepend(card);
// })
//
// $('.swiper-wrapper-small').eq(3).on('click', () => {
//     $('.swiper-wrapper-small').css({display: 'block'});
//     $('.swiper-wrapper-small').eq(3).css({display : 'none'});
//     $('.swiper-wrapper').remove();
//
//     $('.mainslide_container').prepend(card);
// })
//
// $('.swiper-wrapper-small').eq(4).on('click', () => {
//     $('.swiper-wrapper-small').css({display: 'block'});
//     $('.swiper-wrapper-small').eq(4).css({display : 'none'});
//     $('.swiper-wrapper').remove();
//
//     $('.mainslide_container').prepend(card);
// })
//
// $('.swiper-wrapper-small').eq(5).on('click', () => {
//     $('.swiper-wrapper-small').css({display: 'block'});
//     $('.swiper-wrapper-small').eq(5).css({display : 'none'});
//     $('.swiper-wrapper').remove();
//
//     $('.mainslide_container').prepend(card);
// })
// $('.swiper-wrapper-small').eq(6).on('click', () => {
//     $('.swiper-wrapper-small').css({display: 'block'});
//     $('.swiper-wrapper-small').eq(6).css({display : 'none'});
//     $('.swiper-wrapper').remove();
//
//     $('.mainslide_container').prepend(card);
// })
//
// $('.swiper-wrapper-small').eq(7).on('click', () => {
//     $('.swiper-wrapper-small').css({display: 'block'});
//     $('.swiper-wrapper-small').eq(7).css({display : 'none'});
//     $('.swiper-wrapper').remove();
//
//     $('.mainslide_container').prepend(card);
// })
//
// $('.swiper-wrapper-small').eq(8).on('click', () => {
//     $('.swiper-wrapper-small').css({display: 'block'});
//     $('.swiper-wrapper-small').eq(8).css({display : 'none'});
//     $('.swiper-wrapper').remove();
//
//     $('.mainslide_container').prepend(card);
// })

let cardSlide = 0;

right.addEventListener('click', () => {
    if(cardSlide >= 0 && cardSlide <= 11) {
        cardSlide++;
        container.style.transform = `translate(-${cardSlide * 210}px, 0%)`;
        console.log(cardSlide)
    }
})

left.addEventListener('click', () => {
    if(cardSlide === 0) {
        return
    }

    if(cardSlide > 0) {
        cardSlide--;
        container.style.transform =  `translate(-${cardSlide * 210}px, 0%)`;
        console.log(cardSlide)
    }
})




const goStatistics = document.querySelector('.champ-link');

// $.ajax({
//     type: "POST",
//     url: '/champ/statistics',
//     data: JSON.stringify(signInForm.toObject()),
//     contentType : 'application/json',
//     success: function () {
//         console.log('success')
//     },
// })



