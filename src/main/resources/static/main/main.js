const realtime = document.getElementById('realtime_search');

let count = 1;

const slideRealtime = setInterval(() => {
    realtime.style.transform = `translate(0%, ${count * -29}px)`;
    count++;

    if(count == 11) {
        realtime.style.transform = 'translate(0%, 0%)';
        count = 1;
    }

}, 3000);

function callFunction(obj) {
	$('#realtime_search').addClass('background-white');
	$('.realtime a').removeClass('realtime-color-black');
	$('.realtime a').addClass('realtime-color-black');
	$('.word_wrapper').removeClass('overflow');
	$('.searchbar').addClass('searchbar-padding-bottom');
	slideRealtime = setInterval(() => {
	    realtime.style.transform = 'none';
	});
};

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

                    <div style="width:135px; padding: 10px 0px 0px 170px;">
                        <a class="champ-link" href="../statistics/statistics.html">챔피언 상세정보 →</a>
                    </div>
                </div>
            </div>
        </div>`;

$('.swiper-wrapper-small').eq(4).click(() => {
    $('.swiper-wrapper-small').eq(4).css({display : 'none'});
    $('.swiper-wrapper').remove();

    $('.swiper-wrapper-small').eq(5).css({display : 'block'});
    $('.swiper-wrapper-small').eq(3).after(card);
})

$('.swiper-wrapper-small').eq(5).click(() => {
    $('.swiper-wrapper-small').eq(4).css({display : 'block'});
    $('.swiper-wrapper').remove();

    $('.swiper-wrapper-small').eq(5).css({display: 'none'});
    $('.swiper-wrapper-small').eq(4).after(card);
})


const left = document.querySelector('.left');
const right = document.querySelector('.right');
const container = document.querySelector('.mainslide_container')

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