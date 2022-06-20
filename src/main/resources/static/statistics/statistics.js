const summaryBtn1 = document.querySelectorAll('.summary-button')[0];
const summaryBtn2 = document.querySelectorAll('.summary-button')[1];

summaryBtn1.addEventListener('click', () => {
    summaryBtn1.classList.remove('summary-button-active');
    summaryBtn2.classList.remove('summary-button-active');

    summaryBtn1.classList.add('summary-button-active');
})

summaryBtn2.addEventListener('click', () => {
    summaryBtn1.classList.remove('summary-button-active');
    summaryBtn2.classList.remove('summary-button-active');

    summaryBtn2.classList.add('summary-button-active');
})



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$.ajax({
    type: "POST",
    url: '/champ/statistics/highpick',
    data: JSON.stringify({"name": getParameterByName('name')}),
    dataType: 'JSON',
    contentType: 'application/json',
    success: function (data) {
        list = `
                <div class="select-line">
                    <button class="line-button button-active" style="border-radius: 6px 0px 0px 6px;">
                        <img src="/image/position/line-top.png" alt="img">
                        <span>${data[0].line}</span>
                        <span>${data[0].pickRate}%</span>
                    </button>
                    <button class="line-button">
                        <img src="/image/position/line-jun.png" alt="img">
                        <span>${data[1].line}</span>
                        <span>${data[1].pickRate}%</span>
                    </button>
                    <button class="line-button">
                        <img src="/image/position/line-mid.png" alt="img">
                        <span>${data[2].line}</span>
                        <span>${data[2].pickRate}%</span>
                    </button>
                    <button class="line-button">
                        <img src="/image/position/line-bot.png" alt="img">
                        <span>${data[3].line}</span>
                        <span>${data[3].pickRate}%</span>
                   </button>
                    <button class="line-button" style="border-radius: 0px 6px 6px 0px; border-right: none;">
                        <img src="/image/position/line-sup.png" alt="img">
                        <span>${data[4].line}</span>
                        <span>${data[4].pickRate}%</span>
                   </button>
                </div>`;

    usually = `<div class="rate yellow">주로 선택하는 포지션</div>
                    <div class="rate" style="width: 33.3%;">
                        <p>${data[0].line}</p>
                        <span style="color: #FFFFFFA6;">${data[0].pickRate}%</span>
                    </div>
                    <div class="rate" style="width: 33.3%;">
                        <p>${data[1].line}</p>
                        <span style="color: #FFFFFFA6;">${data[1].pickRate}%</span>
                    </div>
                    <div class="rate" style="width: 33.3%;">
                        <p>${data[2].line}</p>
                        <span style="color: #FFFFFFA6;">${data[2].pickRate}%</span>
               </div>`;

        $('.line-and-input').prepend(list);
        $('#usually-position').append(usually);
    },
});

$.ajax({
    type: "POST",
    url: '/champ/statistics/hardmatch',
    data: JSON.stringify({ "name" : getParameterByName('name') }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }
            list += `<a href="/champ/statistics?name=${data[i].name}" class="list-a">
                        <div class="hard-list ${isGray}">
                            <div style="width: 10%;">
                                <img src="../image/champhead/${data[i].image}" alt="img">
                            </div>
                            <div style="width: 60%; padding: 10px 0px 0px 20px; text-align: left;">
                               <span>${data[i].name}</span>
                            </div>
                            <div style="width: 30%; padding-top: 10px;">
                                <span>${data[i].count}</span>
                                <span class="hard">${data[i].winRate}%</span>
                            </div>
                        </div>
                    </a>`;
        }
        $('.match-list').eq(0).append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/easymatch',
    data: JSON.stringify({ "name" : getParameterByName('name') }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }
            list += `<a href="/champ/statistics?name=${data[i].name}" class="list-a">
                        <div class="hard-list ${isGray}">
                            <div style="width: 10%;">
                                <img src="../image/champhead/${data[i].image}" alt="img">
                            </div>
                            <div style="width: 60%; padding: 10px 0px 0px 20px; text-align: left;">
                               <span>${data[i].name}</span>
                            </div>
                            <div style="width: 30%; padding-top: 10px;">
                                <span>${data[i].count}</span>
                                <span class="hard">${data[i].winRate}%</span>
                            </div>
                        </div>
                    </a>`;
        }
        $('.match-list').eq(1).append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/spell',
    data: JSON.stringify({ "name" : getParameterByName('name') }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }
            list += `<li class="list-items ${isGray}">
                        <div class="spell">
                            <img src="../image/spell/${data[i].pick1}" alt="img">
                            <img src="../image/spell/${data[i].pick2}" alt="img">
                        </div>
                        <div class="spell-percent">
                            <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                            <span style="width: 23.3%;">${data[i].pickRate}</span>
                            <span style="width: 23.3%;">${data[i].count}</span>
                        </div>
                    </li>`;
        }

        let goodSpell = `<p>추천 스펠</p>
                         <img src="../image/spell/${data[0].pick1}" alt="img">
                         <img src="../image/spell/${data[0].pick2}" alt="img">`;

        $('.good-spell').append(goodSpell);
        $('#spell-list').append(list);
    },
})


$.ajax({
    type: "POST",
    url: '/champ/statistics/startitem',
    data: JSON.stringify({ "name" : getParameterByName('name') }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }

            if(data[i].pick2 == '없음') {
                list += `<li class="list-items ${isGray}">
                            <div class="spell">
                                <img src="../image/item/${data[i].pick1}" alt="img">
                            </div>
                            <div class="spell-percent">
                                <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                                <span style="width: 23.3%;">${data[i].pickRate}</span>
                                <span style="width: 23.3%;">${data[i].count}</span>
                            </div>
                        </li>`;
            }else {
                list += `<li class="list-items ${isGray}">
                            <div class="spell">
                                <img src="../image/item/${data[i].pick1}" alt="img">
                                <img src="../image/item/${data[i].pick2}" alt="img">
                            </div>
                            <div class="spell-percent">
                                <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                                <span style="width: 23.3%;">${data[i].pickRate}</span>
                                <span style="width: 23.3%;">${data[i].count}</span>
                            </div>
                        </li>`;
            }
        }

        let goodStartItem = `<p>시작 아이템</p>
                             <img src="../image/item/${data[0].pick1}" alt="img">
                             <img src="../image/item/${data[0].pick2}" alt="img">`;
        $('.good-start-item').append(goodStartItem);
        $('#start-item-list').append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/shoes',
    data: JSON.stringify({ "name" : getParameterByName('name') }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }

            if(data[i].pick2 == '없음') {
                list += `<li class="list-items ${isGray}">
                            <div class="spell">
                                <img src="../image/item/${data[i].pick1}" alt="img">
                            </div>
                            <div class="spell-percent">
                                <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                                <span style="width: 23.3%;">${data[i].pickRate}</span>
                                <span style="width: 23.3%;">${data[i].count}</span>
                            </div>
                        </li>`;
            }
        }
        let goodShoes = `<p>신발</p>
                         <img src="../image/item/${data[0].pick1}" alt="img">`;
        $('.good-shoes').append(goodShoes);
        $('#shoes-list').append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/coreeach',
    data: JSON.stringify({ "name" : getParameterByName('name'), "rank" : "1코어" }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";

        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }

            list +=
                `<li class="list-items ${isGray}">
                    <div class="spell">
                        <img src="../image/item/${data[i].item}" alt="img">
                    </div>
                    <div class="spell-percent">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                        <span style="width: 23.3%;">${data[i].count}</span>
                    </div>
                </li>`;
        }

        let goodOneCore = `1코어
                           <div class="core-img-div">
                                <img src="../image/item/${data[0].item}" alt="img">
                           </div>
                           or
                           <img src="../image/item/${data[1].item}" alt="img">
                           or
                           <img src="../image/item/${data[2].item}" alt="img">`;
        $('#goodOneCore').append(goodOneCore);
        $('#core1-list').append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/coreeach',
    data: JSON.stringify({ "name" : getParameterByName('name'), "rank" : "2코어" }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";

        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }

            list +=
                `<li class="list-items ${isGray}">
                    <div class="spell">
                        <img src="../image/item/${data[i].item}" alt="img">
                    </div>
                    <div class="spell-percent">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                        <span style="width: 23.3%;">${data[i].count}</span>
                    </div>
                </li>`;
        }
        let goodTwoCore = `2코어
                           <div class="core-img-div">
                               <img src="../image/item/${data[0].item}" alt="img">
                           </div>
                           or
                           <img src="../image/item/${data[1].item}" alt="img">
                           or
                           <img src="../image/item/${data[2].item}" alt="img">`;
        $('#goodTwoCore').append(goodTwoCore);
        $('#core2-list').append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/coreeach',
    data: JSON.stringify({ "name" : getParameterByName('name'), "rank" : "3코어" }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";

        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }

            list +=
                `<li class="list-items ${isGray}">
                    <div class="spell">
                        <img src="../image/item/${data[i].item}" alt="img">
                    </div>
                    <div class="spell-percent">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                        <span style="width: 23.3%;">${data[i].count}</span>
                    </div>
                </li>`;
        }

        let goodThreeCore = `3코어
                           <div class="core-img-div">
                               <img src="../image/item/${data[0].item}" alt="img">
                           </div>
                           or
                           <img src="../image/item/${data[1].item}" alt="img">
                           or
                           <img src="../image/item/${data[2].item}" alt="img">`;
        $('#goodThreeCore').append(goodThreeCore);
        $('#core3-list').append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/corecombine',
    data: JSON.stringify({ "name" : getParameterByName('name'), "rank" : "2코어 조합" }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";

        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }

            list +=
                `<li class="list-items ${isGray}">
                    <div class="spell">
                        <img src="../image/item/${data[i].item1}" alt="img">
                        <img src="../image/item/${data[i].item2}" alt="img">
                    </div>
                    <div class="spell-percent">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                        <span style="width: 23.3%;">${data[i].count}</span>
                    </div>
                </li>`;
        }
        $('#core2-combine').append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/corecombine',
    data: JSON.stringify({ "name" : getParameterByName('name'), "rank" : "3코어 조합" }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";

        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }

            list +=
                `<li class="list-items ${isGray}">
                    <div class="spell">
                        <img src="../image/item/${data[i].item1}" alt="img">
                        <img src="../image/item/${data[i].item2}" alt="img">
                        <img src="../image/item/${data[i].item3}" alt="img">
                    </div>
                    <div class="spell-percent">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                        <span style="width: 23.3%;">${data[i].count}</span>
                    </div>
                </li>`;
        }
        $('#core3-combine').append(list);
    },
})
$.ajax({
    type: "POST",
    url: '/champ/statistics/corecombine',
    data: JSON.stringify({ "name" : getParameterByName('name'), "rank" : "4코어 조합" }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";

        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }

            list +=
                `<li class="list-items ${isGray}">
                    <div class="spell">
                        <img src="../image/item/${data[i].item1}" alt="img">
                        <img src="../image/item/${data[i].item2}" alt="img">
                        <img src="../image/item/${data[i].item3}" alt="img">
                        <img src="../image/item/${data[i].item4}" alt="img">
                    </div>
                    <div class="spell-percent">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                        <span style="width: 23.3%;">${data[i].count}</span>
                    </div>
                </li>`;
        }

        let goodCore = `<p>코어템</p>
                        <img src="../image/item/${data[0].item1}" alt="img">
                        <img src="../image/item/${data[0].item2}" alt="img">
                        <img src="../image/item/${data[0].item3}" alt="img">
                        <img src="../image/item/${data[0].item4}" alt="img">`;
        $('.good-core').append(goodCore);
        $('#core4-combine').append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/skillmaster',
    data: JSON.stringify({ "name" : getParameterByName('name') }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";

        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }

            list +=
                `<li class="list-items ${isGray}">
                    <div class="spell">
                        <img src="../image/skill/${data[i].skill1}" alt="img">
                        <img src="../image/skill/${data[i].skill2}" alt="img">
                        <img src="../image/skill/${data[i].skill3}" alt="img">
                    </div>
                    <div class="spell-percent">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                        <span style="width: 23.3%;">${data[i].count}</span>
                    </div>
                </li>`;
        }

        let goodSkillMaster = `<p>스킬 마스터 순서</p>
                               <img src="../image/skill/${data[0].skill1}" alt="img">
                               <img src="../image/skill/${data[0].skill2}" alt="img">
                               <img src="../image/skill/${data[0].skill3}" alt="img">`;
        $('.good-skill-master').append(goodSkillMaster);
        $('#skill-master').append(list);
    },
})


const whatLv0 = document.querySelectorAll('.what-level')[0];
const whatLv1 = document.querySelectorAll('.what-level')[1];
const whatLv2 = document.querySelectorAll('.what-level')[2];

$.ajax({
    type: "POST",
    url: '/champ/statistics/skillseq',
    data: JSON.stringify({ "name" : getParameterByName('name'), "whatLevel" : 3}),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGoodOrBad = "";

        for(let i = 0; i < data.length; i++) {

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }

            list +=
                `<li class="list-items border-bottom">
                    <div class="spell">
                        <img src="../image/skill/${data[i].skill1}" alt="img">
                        <img src="../image/skill/${data[i].skill2}" alt="img">
                        <img src="../image/skill/${data[i].skill3}" alt="img">
                    </div>
                    <div class="spell-percent" style="width: 40%;">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                        <span style="width: 23.3%;">${data[i].count}</span>
                    </div>
                </li>`;
        }
        $('#skill-seq').append(list);
    },
})

whatLv0.addEventListener('click', () => {
    whatLv0.classList.remove('what-level-active');
    whatLv1.classList.remove('what-level-active');
    whatLv2.classList.remove('what-level-active');

    whatLv0.classList.add('what-level-active');


    $.ajax({
        type: "POST",
        url: '/champ/statistics/skillseq',
        data: JSON.stringify({ "name" : getParameterByName('name'), "whatLevel" : 3}),
        dataType: 'JSON',
        contentType : 'application/json',
        success: function (data) {
            $('#skill-seq').children('li').remove();
            let list = '';
            let isGoodOrBad = "";

            for(let i = 0; i < data.length; i++) {

                if(data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                }else if(data[i].winRate < 46) {
                    isGoodOrBad = "trash";
                }

                list +=
                    `<li class="list-items border-bottom">
                    <div class="spell">
                        <img src="../image/skill/${data[i].skill1}" alt="img">
                        <img src="../image/skill/${data[i].skill2}" alt="img">
                        <img src="../image/skill/${data[i].skill3}" alt="img">
                    </div>
                    <div class="spell-percent" style="width: 40%;">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                        <span style="width: 23.3%;">${data[i].count}</span>
                    </div>
                </li>`;
            }
            $('#skill-seq').append(list);
        },
    })
})

whatLv1.addEventListener('click', () => {
    whatLv0.classList.remove('what-level-active');
    whatLv1.classList.remove('what-level-active');
    whatLv2.classList.remove('what-level-active');

    whatLv1.classList.add('what-level-active');

    $.ajax({
        type: "POST",
        url: '/champ/statistics/skillseq',
        data: JSON.stringify({ "name" : getParameterByName('name'), "whatLevel" : 6}),
        dataType: 'JSON',
        contentType : 'application/json',
        success: function (data) {
            $('#skill-seq').children('li').remove();
            let list = '';
            let isGoodOrBad = "";

            for(let i = 0; i < data.length; i++) {

                if(data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                }else if(data[i].winRate < 46) {
                    isGoodOrBad = "trash";
                }

                list +=
                    `<li class="list-items border-bottom">
                    <div class="spell">
                        <img src="../image/skill/${data[i].skill1}" alt="img">
                        <img src="../image/skill/${data[i].skill2}" alt="img">
                        <img src="../image/skill/${data[i].skill3}" alt="img">
                        <img src="../image/skill/${data[i].skill4}" alt="img">
                        <img src="../image/skill/${data[i].skill5}" alt="img">
                        <img src="../image/skill/${data[i].skill6}" alt="img">
                    </div>
                    <div class="spell-percent" style="width: 40%;">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                        <span style="width: 23.3%;">${data[i].count}</span>
                    </div>
                </li>`;
            }
            $('#skill-seq').append(list);
        },
    })
})

whatLv2.addEventListener('click', () => {
    whatLv0.classList.remove('what-level-active');
    whatLv1.classList.remove('what-level-active');
    whatLv2.classList.remove('what-level-active');

    whatLv2.classList.add('what-level-active');

    $.ajax({
        type: "POST",
        url: '/champ/statistics/skillseq',
        data: JSON.stringify({ "name" : getParameterByName('name'), "whatLevel" : 11}),
        dataType: 'JSON',
        contentType : 'application/json',
        success: function (data) {
            $('#skill-seq').children('li').remove();
            let list = '';
            let isGoodOrBad = "";

            for(let i = 0; i < data.length; i++) {

                if(data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                }else if(data[i].winRate < 46) {
                    isGoodOrBad = "trash";
                }

                list +=
                    `<li class="list-items border-bottom">
                    <div class="spell">
                        <img src="../image/skill/${data[i].skill1}" alt="img">
                        <img src="../image/skill/${data[i].skill2}" alt="img">
                        <img src="../image/skill/${data[i].skill3}" alt="img">
                        <img src="../image/skill/${data[i].skill4}" alt="img">
                        <img src="../image/skill/${data[i].skill5}" alt="img">
                        <img src="../image/skill/${data[i].skill6}" alt="img">
                        <img src="../image/skill/${data[i].skill7}" alt="img">
                        <img src="../image/skill/${data[i].skill8}" alt="img">
                        <img src="../image/skill/${data[i].skill9}" alt="img">
                        <img src="../image/skill/${data[i].skill10}" alt="img">
                        <img src="../image/skill/${data[i].skill11}" alt="img">
                    </div>
                    <div class="spell-percent" style="width: 40%;">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                        <span style="width: 23.3%;">${data[i].count}</span>
                    </div>
                </li>`;
            }
            $('#skill-seq').append(list);
        },
    })
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/runecombine',
    data: JSON.stringify({ "name" : getParameterByName('name')}),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";

        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }

            list +=
                `<li class="list-items ${isGray}" style="height: 45px"> 
                    <div class="spell" style="width: 75%">
                        <img style="width: 35px; height: 35px" src="../image/rune/${data[i].pick1}" alt="img">
                        <img style="width: 35px; height: 35px" src="../image/rune/${data[i].pick2}" alt="img">
                        <img style="width: 35px; height: 35px" src="../image/rune/${data[i].pick3}" alt="img">
                        <img style="width: 35px; height: 35px" src="../image/rune/${data[i].pick4}" alt="img">
                        <img style="width: 35px; height: 35px" src="../image/rune/${data[i].pick5}" alt="img">
                        <img style="width: 35px; height: 35px" src="../image/rune/${data[i].pick6}" alt="img">
                    </div>
                    <div class="spell-percent" style="width: 45%;">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                    </div>
                </li>`;
        }

        $('#rune-combine').append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/runeshard',
    data: JSON.stringify({ "name" : getParameterByName('name')}),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";

        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }

            if(data[i].winRate >= 54) {
                isGoodOrBad = "very-good";
            }else if(data[i].winRate < 54 && data[i].winRate >= 51) {
                isGoodOrBad = "good";
            }else if(data[i].winRate < 51 && data[i].winRate >= 48) {
                isGoodOrBad = "soso";
            }else if(data[i].winRate < 48 && data[i].winRate >= 46) {
                isGoodOrBad = "bad";
            }else if(data[i].winRate < 46) {
                isGoodOrBad = "trash";
            }

            list +=
                `<li class="list-items ${isGray}" style="height: 45px">
                    <div class="spell">
                        <img src="../image/rune/${data[i].pick1}" alt="img">
                        <img src="../image/rune/${data[i].pick2}" alt="img">
                        <img src="../image/rune/${data[i].pick3}" alt="img">
                    </div>
                    <div class="spell-percent">
                        <span style="width: 23.3%;" class="${isGoodOrBad}">${data[i].winRate}</span>
                        <span style="width: 23.3%;">${data[i].pickRate}</span>
                    </div>
                </li>`;
        }

        let goodRuneShard = ``;
        $('#good-rune-shard').append(goodRuneShard);
        $('#rune-shard').append(list);
    },
})
