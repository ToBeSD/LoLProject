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

function callFunction(obj) {
    $('#realtime_search').addClass('main-background-white');
    $('.main-realtime a').removeClass('main-realtime-color-black');
    $('.main-realtime a').addClass('main-realtime-color-black');
    $('.main-word_wrapper').removeClass('main-overflow');
    $('.main-searchbar').addClass('main-searchbar-padding-bottom');
    realtime.css({transform : 'translate(0%, 0%)'});
    clearInterval(slideRealtime);
};


$.ajax({
    type: "GET",
    url: '/maincard',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        for(let i = 0; i < data.length; i++) {
            list += `<div class="swiper-wrapper-small swiper-slide">
                        <div class="main-swiper-slide">
                            <div class="slide-image-small">
                                <input type="hidden" name="name" value="${data[i].name}">
                                <input type="hidden" name="line" value="${data[i].line}">
                                <img class="small-card-image" src="/image/champfull/${data[i].image}">
                                <h3 class="champion-name">${data[i].name}<small>(${data[i].line})</small></h3>
                            </div>
                        </div>
                    </div>`;
        }
        $('.main-mainslide_container').append(list);


        $(document).on("click", ".small-card-image", function(e) {
            console.log(e.target)
            $('.slide-image-small').parent().parent().css({display: 'block'})
            $('.main-swiper-wrapper').remove();

            let name = $(e.target).siblings('input').eq(0).val();
            let line = $(e.target).siblings('input').eq(1).val();

            let card = '';
            $.ajax({
                type: "POST",
                url: '/maincard/detail',
                data: JSON.stringify({
                    name : name,
                    line : line,
                }),
                contentType : 'application/json',
                success: function (data) {
                    card = `<div class="main-swiper-wrapper swiper-slide">
                        <div class="main-swiper-slide">
                            <div class="slide-image">
                                <img class="small-card-image" style="border-radius: 8px 0px 0px 8px" src="/image/champfull/${data.image}">
                                <h3 class="champion-name none">${data.name}<small>(${data.line})</small></h3>
                            </div>
            
                            <div class="champslide-infobox">
                                <div class="champ-status">
                                    <h2>${data.name}(${data.line})</h2>
            
                                    <li class="champ-status-header">
                                        <span></span>
                                        <span class="before">이전패치</span>
                                        <span>현재패치</span>
                                    </li>
                                    <li class="champ-status-item">
                                        <h4>승률</h4>
                                        <span class="before">${data.wBefore}%</span>
                                        <span>${data.w}%</span>
                                    </li>
                                    <li class="champ-status-item">
                                        <h4>픽률</h4>
                                        <span class="before">${data.p}%</span>
                                        <span>${data.pBefore}%</span>
                                    </li>
                                    <li class="champ-status-item">
                                        <h4>벤율</h4>
                                        <span class="before">${data.b}%</span>
                                        <span>${data.bBefore}%</span>
                                    </li>
                                </div>
            
                                <div class="champ-point">
                                    <h4>주목해야 할 포인트</h4>
                                    <p style="font-size: 12px;">최근 패치에서 ${data.name}의 승률이 ${data.winVari}% 변동 되었습니다. 곧 구체적인 원인을 분석하여 업데이트 될 예정입니다.</p>
                                </div>
            
                                <div style="width:135px; padding: 10px 0px 0px 170px;">
                                    <a class="champ-link" href="/champ/statistics?name=${data.name}&line=${data.line}">챔피언 상세정보 →</a>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    $(e.target).parent().parent().parent().before(card);
                    $(e.target).parent().parent().parent().css({display: 'none'});
                },
            })
        })

        const swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            slidesPerView : 'auto', // 한 슬라이드에 보여줄 갯수
            centeredSlides: true,
            autoplay:true,
            autoplay: {
                delay: 30000,
            },
        });
    },
})

$.ajax({
    type: "POST",
    url: '/community',
    data: JSON.stringify({
        category : "자유 게시판",
        page : 1,
    }),
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        for(let i = 0; i < data.length; i++) {
            list += `<li class="community-list" style="border-bottom: 1px solid #dbdde1;">
                        <span class="post-name free">자유</span>
                        <a class="post-link" href="/community/detail?bno=${data[i].bno}">
                            <span class="post-title">${data[i].title}</span>
                        </a>
                        <span class="post-like">${data[i].good}</span>
                      </li>`;
        }
        $('#free-community').append(list);
        },
})

$.ajax({
    type: "POST",
    url: '/community/build',
    data: JSON.stringify({
        category : "빌드 연구소",
        page : 1,
    }),
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        for(let i = 0; i < data.length; i++) {
            list += `<li class="community-list" style="border-bottom: 1px solid #dbdde1;">
                        <span class="post-name">${data[i].champName}</span>
                        <a class="post-link" href="/community/build/detail?bno=${data[i].bno}">
                            <span class="post-title">${data[i].title}</span>
                        </a>
                        <span class="post-like">${data[i].good}</span>
                    </li>`;
        }
        $('#build-community').append(list);
    },
})