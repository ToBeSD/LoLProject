function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$.ajax({
    type: "POST",
    url: '/champ/statistics/highpick',
    data: JSON.stringify({
        "name": getParameterByName('name')
    }),
    dataType: 'JSON',
    contentType: 'application/json',
    success: function (data) {
        list = `
                <div class="select-line">
                    <a href="/champ/statistics?name=${data[0].name}&line=${data[0].line}">
                        <button class="line-button" style="border-radius: 6px 0px 0px 6px;">
                            <img src="/image/position/line-top.png" alt="img">
                            <span>${data[0].line}</span>
                            <span>${data[0].pickRate}%</span>
                        </button>
                    </a>
                    <a href="/champ/statistics?name=${data[0].name}&line=${data[1].line}">
                    <button class="line-button">
                        <img src="/image/position/line-jun.png" alt="img">
                        <span>${data[1].line}</span>
                        <span>${data[1].pickRate}%</span>
                    </button>
                    <a href="/champ/statistics?name=${data[0].name}&line=${data[2].line}">
                        <button class="line-button">
                            <img src="/image/position/line-mid.png" alt="img">
                            <span>${data[2].line}</span>
                            <span>${data[2].pickRate}%</span>
                        </button>
                    </a>
                    <a href="/champ/statistics?name=${data[0].name}&line=${data[3].line}">
                        <button class="line-button">
                            <img src="/image/position/line-bot.png" alt="img">
                            <span>${data[3].line}</span>
                            <span>${data[3].pickRate}%</span>
                       </button>
                   </a>
                   <a href="/champ/statistics?name=${data[0].name}&line=${data[4].line}">
                        <button class="line-button" style="border-radius: 0px 6px 6px 0px; border-right: none;">
                            <img src="/image/position/line-sup.png" alt="img">
                            <span>${data[4].line}</span>
                            <span>${data[4].pickRate}%</span>
                       </button>
                   </a>
                </div>`;

        $('.line-and-input').prepend(list);

        switch (getParameterByName('line')) {
            case '탑' :
                $('.select-line button').eq(0).addClass('button-active')
                break;
            case '정글' :
                $('.select-line button').eq(1).addClass('button-active')
                break;
            case '미드' :
                $('.select-line button').eq(2).addClass('button-active')
                break;
            case '원딜' :
                $('.select-line button').eq(3).addClass('button-active')
                break;
            case '서폿' :
                $('.select-line button').eq(4).addClass('button-active')
                break;
        }
    },
});

$.ajax({
    type: "POST",
    url: '/champ/statistics/highpickdesc',
    data: JSON.stringify({
        "name": getParameterByName('name')
    }),
    dataType: 'JSON',
    contentType: 'application/json',
    success: function (data) {
        usuallyPosition = `<div class="rate yellow">주로 선택하는 포지션</div>
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
        $('#usually-position').append(usuallyPosition);
    },
});

$.ajax({
    type: "POST",
    url: '/champ/statistics/ratesummary',
    data: JSON.stringify({
        "name": getParameterByName('name'),
        "line": getParameterByName('line'),
    }),
    dataType: 'JSON',
    contentType: 'application/json',
    success: function (data) {
        let rate = `<div style="padding-top: 10px; width: 80px;">
                        <div class="rate yellow">승률</div>
                        <div class="rate">${data.winRate}%</div>
                    </div>
    
                    <div style="padding-top: 10px; width: 80px;">
                        <div class="rate yellow">픽률</div>
                        <div class="rate">${data.pickRate}%</div>
                    </div>
    
                    <div style="padding-top: 10px; width: 80px;">
                        <div class="rate yellow">벤율</div>
                        <div class="rate">${data.banRate}%</div>
                    </div>
    
                    <div style="padding-top: 10px; width: 165px;">
                        <div class="rate yellow">PS스코어</div>
                        <div class="rate" style="color: #FFFFFFA6;">이전 패치 ${data.psScoreBefore}</div>
                        <div class="rate">현재 패치 ${data.psScore}</div>
                    </div>`;
        $('#rate-summary').prepend(rate);
    },
});


$.ajax({
    type: "POST",
    url: '/champ/statistics/runesummary',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
    }),
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        if(data.length !== 0) {
            if (data[0].runeSummary.includes('r')) {
                list = `<div class="rune-select">
                                <img src="/image/rune/${data[0].runeSummary}" alt="img">
                                <img src="/image/rune/${data[1].runeSummary}" alt="img">
                                <img src="/image/rune/${data[2].runeSummary}" alt="img">
                                <img src="/image/rune/${data[3].runeSummary}" alt="img">
                            </div>
                            <div class="rune-select">
                                <img src="/image/rune/${data[4].runeSummary}" alt="img">
                                <img src="/image/rune/${data[5].runeSummary}" alt="img">
                                <img src="/image/rune/${data[6].runeSummary}" alt="img">
                            </div>
                            <div class="rune-select">
                                <img src="/image/rune/${data[7].runeSummary}" alt="img">
                                <img src="/image/rune/${data[8].runeSummary}" alt="img">
                                <img src="/image/rune/${data[9].runeSummary}" alt="img">
                            </div>
                            <div class="rune-select">
                                <img src="/image/rune/${data[10].runeSummary}" alt="img">
                                <img src="/image/rune/${data[11].runeSummary}" alt="img">
                                <img src="/image/rune/${data[12].runeSummary}" alt="img">
                                <img src="/image/rune/${data[13].runeSummary}" alt="img">
                            </div>`;
            } else if (data[0].runeSummary.includes('y')) {
                list = `<div class="rune-select">
                                <img src="/image/rune/${data[0].runeSummary}" alt="img">
                                <img src="/image/rune/${data[1].runeSummary}" alt="img">
                                <img src="/image/rune/${data[2].runeSummary}" alt="img">
                                <img src="/image/rune/${data[3].runeSummary}" alt="img">
                            </div>
                            <div class="rune-select">
                                <img src="/image/rune/${data[4].runeSummary}" alt="img">
                                <img src="/image/rune/${data[5].runeSummary}" alt="img">
                                <img src="/image/rune/${data[6].runeSummary}" alt="img">
                            </div>
                            <div class="rune-select">
                                <img src="/image/rune/${data[7].runeSummary}" alt="img">
                                <img src="/image/rune/${data[8].runeSummary}" alt="img">
                                <img src="/image/rune/${data[9].runeSummary}" alt="img">
                            </div>
                            <div class="rune-select">
                                <img src="/image/rune/${data[10].runeSummary}" alt="img">
                                <img src="/image/rune/${data[11].runeSummary}" alt="img">
                                <img src="/image/rune/${data[12].runeSummary}" alt="img">
                            </div>`;
            } else {
                list = `<div class="rune-select">
                                <img src="/image/rune/${data[0].runeSummary}" alt="img">
                                <img src="/image/rune/${data[1].runeSummary}" alt="img">
                                <img src="/image/rune/${data[2].runeSummary}" alt="img">
                            </div>
                            <div class="rune-select">
                                <img src="/image/rune/${data[3].runeSummary}" alt="img">
                                <img src="/image/rune/${data[4].runeSummary}" alt="img">
                                <img src="/image/rune/${data[5].runeSummary}" alt="img">
                            </div>
                            <div class="rune-select">
                                <img src="/image/rune/${data[6].runeSummary}" alt="img">
                                <img src="/image/rune/${data[7].runeSummary}" alt="img">
                                <img src="/image/rune/${data[8].runeSummary}" alt="img">
                            </div>
                            <div class="rune-select">
                                <img src="/image/rune/${data[9].runeSummary}" alt="img">
                                <img src="/image/rune/${data[10].runeSummary}" alt="img">
                                <img src="/image/rune/${data[11].runeSummary}" alt="img">
                            </div>`;
            }
            $('#main-rune-summary').append(list);

            $.ajax({
                type: "POST",
                url: '/champ/statistics/runesummary/active',
                data: JSON.stringify({
                    "name": getParameterByName('name'),
                    "line": getParameterByName('line'),
                }),
                contentType: 'application/json',
                success: function (active) {
                    let activeRune = [active.pick1, active.pick2, active.pick3, active.pick4];
                    for (let i = 0; i < activeRune.length; i++) {
                        for(let j = 0; j <=3; j++) {
                            if(activeRune[i].includes(j + 1)) {
                                $('.rune-select').eq(i).children('img').eq(j).attr('src', `/image/rune/${activeRune[i]}`);
                            }
                        }
                    }

                }
            })
        }
    },
})


$.ajax({
    type: "POST",
    url: '/champ/statistics/runesummarysub',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
    }),
    contentType : 'application/json',
    success: function (data) {
        if(data.length !== 0) {
            let darkRune = [data[0].runeSummary, data[1].runeSummary, data[2].runeSummary, data[3].runeSummary,
                            data[4].runeSummary, data[5].runeSummary, data[6].runeSummary, data[7].runeSummary,
                            data[8].runeSummary];

            if (data[0].runeSummary.includes('r')) {
                list = `<div class="rune-select">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[0].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[1].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[2].runeSummary}" alt="img">
                    </div>
                    <div class="rune-select">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[3].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[4].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[5].runeSummary}" alt="img">
                    </div>
                    <div class="rune-select">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[6].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[7].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[8].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[9].runeSummary}" alt="img">
                    </div>`;
            }else {
                list = `<div class="rune-select">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[0].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[1].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[2].runeSummary}" alt="img">
                    </div>
                    <div class="rune-select">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[3].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[4].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[5].runeSummary}" alt="img">
                    </div>
                    <div class="rune-select">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[6].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[7].runeSummary}" alt="img">
                        <img style="width: 38px; height: 38px" src="/image/rune/d_${data[8].runeSummary}" alt="img">
                    </div>`;
            }
            $('#subrune-summary').append(list);

            $.ajax({
                type: "POST",
                url: '/champ/statistics/runesummary/active',
                data: JSON.stringify({
                    "name": getParameterByName('name'),
                    "line": getParameterByName('line'),
                }),
                contentType: 'application/json',
                success: function (active) {
                    let activeRune = [active.pick5, active.pick6];
                    for (let i = 0; i < activeRune.length; i++) {
                        for(let j = 0; j <=8; j++) {
                            if(activeRune[i] == `${darkRune[j]}`) {
                                $('#subrune-summary').find('img').eq(j).attr('src', `/image/rune/${activeRune[i]}`);
                            }
                        }
                    }

                }
            })
        }
    },
})


$.ajax({
    type: "POST",
    url: '/champ/basicskill',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        if(data.length !== 0) {
            let skillImg = '';
            for(let i = 0; i < data.length; i++) {
                skillImg = `<img class="skill-image-summary" src="/image/skill/${data[i].image}" alt="img">`;
                $('.skill-title').eq(i).after(skillImg);
            }
        }

        $.ajax({
            type: "POST",
            url: '/champ/statistics/skillseqsummary',
            data: JSON.stringify({
                "name" : getParameterByName('name'),
                "line" : getParameterByName('line'),
            }),
            dataType: 'JSON',
            contentType : 'application/json',
            success: function (data) {
                if(data.length !== 0) {
                    let skillSeq = [data.skill1,data.skill2,data.skill3,data.skill4,data.skill5,data.skill6,
                        data.skill7,data.skill8,data.skill9,data.skill10,data.skill11];

                    for (let i = 0; i < skillSeq.length; i++) {
                        if (skillSeq[i] == "Q") {
                            $('.skill-seq-row').eq(0).append(`<div class="skill-box" style="background-color: #ffc030;">${i+1}</div>`)
                            $('.skill-seq-row').eq(1).append('<div class="skill-box"></div>')
                            $('.skill-seq-row').eq(2).append('<div class="skill-box"></div>')
                            $('.skill-seq-row').eq(3).append('<div class="skill-box"></div>')
                        }else if (skillSeq[i] == "W") {
                            $('.skill-seq-row').eq(0).append('<div class="skill-box"></div>')
                            $('.skill-seq-row').eq(1).append(`<div class="skill-box" style="background-color: #ffc030;">${i+1}</div>`)
                            $('.skill-seq-row').eq(2).append('<div class="skill-box"></div>')
                            $('.skill-seq-row').eq(3).append('<div class="skill-box"></div>')
                        } else if (skillSeq[i] == "E") {
                            $('.skill-seq-row').eq(0).append('<div class="skill-box"></div>')
                            $('.skill-seq-row').eq(1).append('<div class="skill-box"></div>')
                            $('.skill-seq-row').eq(2).append(`<div class="skill-box" style="background-color: #ffc030;">${i+1}</div>`)
                            $('.skill-seq-row').eq(3).append('<div class="skill-box"></div>')
                        } else if (skillSeq[i] == "R") {
                            $('.skill-seq-row').eq(0).append('<div class="skill-box"></div>')
                            $('.skill-seq-row').eq(1).append('<div class="skill-box"></div>')
                            $('.skill-seq-row').eq(2).append('<div class="skill-box"></div>')
                            $('.skill-seq-row').eq(3).append(`<div class="skill-box" style="background-color: #ffc030;">${i+1}</div>`)
                        }
                    }
                }
            },
        })
    },
})




$.ajax({
    type: "POST",
    url: '/champ/statistics/hardmatch',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }
                list += `<a href="/champ/statistics?name=${data[i].name}&line=${data[i].line}" class="list-a">
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
        }

        let counterList = '';
        if(data.length !== 0) {
            for (let i = 0; i < 5; i++) {
                counterList += `<div>
                                    <img class="counter-img" src="/image/champhead/${data[i].image}">
                                    <span class="counter-rate">${data[i].winRate}%</span>
                               </div>`;
            }
            $('.counter-text').after(counterList);
        }
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/easymatch',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }
                list += `<a href="/champ/statistics?name=${data[i].name}&line=${data[i].line}" class="list-a">
                            <div class="hard-list ${isGray}">
                                <div style="width: 10%;">
                                    <img src="../image/champhead/${data[i].image}" alt="img">
                                </div>
                                <div style="width: 60%; padding: 10px 0px 0px 20px; text-align: left;">
                                   <span>${data[i].name}</span>
                                </div>
                                <div style="width: 30%; padding-top: 10px;">
                                    <span>${data[i].count}</span>
                                    <span class="easy">${data[i].winRate}%</span>
                                </div>
                            </div>
                        </a>`;
            }
            $('.match-list').eq(1).append(list);
        }
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/spell',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
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
        }
    },
})


$.ajax({
    type: "POST",
    url: '/champ/statistics/startitem',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let goodStartItem = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
                    isGoodOrBad = "trash";
                }

                if (data[i].pick2 == '없음') {
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
                } else {
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


            if (data[0].pick2 == '없음') {
                goodStartItem = `<p>시작 아이템</p>
                                     <img src="../image/item/${data[0].pick1}" alt="img">`;
            } else {
                goodStartItem = `<p>시작 아이템</p>
                                     <img src="../image/item/${data[0].pick1}" alt="img">
                                     <img src="../image/item/${data[0].pick2}" alt="img">`;
            }
            $('.good-start-item').append(goodStartItem);
            $('#start-item-list').append(list);
        }
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/shoes',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
                    isGoodOrBad = "trash";
                }

                if (data[i].pick2 == '없음') {
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
        }
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/coreeach',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
        "rank" : '1코어',
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
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

            let goodOneCore = '';
            if(data.length == 1) {
                goodOneCore = `1코어
                                   <div class="core-img-div">
                                        <img src="../image/item/${data[0].item}" alt="img">
                                   </div>`;
            }else if(data.length ==2) {
                goodOneCore = `1코어
                                   <div class="core-img-div">
                                        <img src="../image/item/${data[0].item}" alt="img">
                                   </div>
                                   or
                                   <img src="../image/item/${data[1].item}" alt="img">`;
            }else {
                goodOneCore = `1코어
                                   <div class="core-img-div">
                                        <img src="../image/item/${data[0].item}" alt="img">
                                   </div>
                                   or
                                   <img src="../image/item/${data[1].item}" alt="img">
                                   or
                                   <img src="../image/item/${data[2].item}" alt="img">`;
            }
            $('#goodOneCore').append(goodOneCore);
            $('#core1-list').append(list);
        }
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/coreeach',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
        "rank" : '2코어',
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
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


            let goodTwoCore = '';
            if(data.length == 1) {
                goodTwoCore = `2코어
                                   <div class="core-img-div">
                                        <img src="../image/item/${data[0].item}" alt="img">
                                   </div>`;
            }else if(data.length ==2) {
                goodTwoCore = `2코어
                                   <div class="core-img-div">
                                        <img src="../image/item/${data[0].item}" alt="img">
                                   </div>
                                   or
                                   <img src="../image/item/${data[1].item}" alt="img">`;
            }else {
                goodTwoCore = `2코어
                                   <div class="core-img-div">
                                        <img src="../image/item/${data[0].item}" alt="img">
                                   </div>
                                   or
                                   <img src="../image/item/${data[1].item}" alt="img">
                                   or
                                   <img src="../image/item/${data[2].item}" alt="img">`;
            }


            $('#goodTwoCore').append(goodTwoCore);
            $('#core2-list').append(list);
        }
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/coreeach',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
        "rank" : '3코어',
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
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

            let goodThreeCore = '';
            if(data.length == 1) {
                goodThreeCore = `2코어
                                   <div class="core-img-div">
                                        <img src="../image/item/${data[0].item}" alt="img">
                                   </div>`;
            }else if(data.length ==2) {
                goodThreeCore = `2코어
                                   <div class="core-img-div">
                                        <img src="../image/item/${data[0].item}" alt="img">
                                   </div>
                                   or
                                   <img src="../image/item/${data[1].item}" alt="img">`;
            }else {
                goodThreeCore = `2코어
                                   <div class="core-img-div">
                                        <img src="../image/item/${data[0].item}" alt="img">
                                   </div>
                                   or
                                   <img src="../image/item/${data[1].item}" alt="img">
                                   or
                                   <img src="../image/item/${data[2].item}" alt="img">`;
            }

            $('#goodThreeCore').append(goodThreeCore);
            $('#core3-list').append(list);
        }
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/corecombine',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
        "rank" : '2코어 조합',
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
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
        }
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/corecombine',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
        "rank" : '3코어 조합',
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
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
        }
    },
})
$.ajax({
    type: "POST",
    url: '/champ/statistics/corecombine',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
        "rank" : '4코어 조합',
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        if (data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
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
        }
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/skillmaster',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
        "whatLevel" : 3,
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
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
        }
    },
})


const whatLv0 = document.querySelectorAll('.what-level')[0];
const whatLv1 = document.querySelectorAll('.what-level')[1];
const whatLv2 = document.querySelectorAll('.what-level')[2];

$.ajax({
    type: "POST",
    url: '/champ/statistics/skillseq',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
        "whatLevel" : 3,
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGoodOrBad = "";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
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
        }
    },
})


if(whatLv0 !== undefined) {

    whatLv0.addEventListener('click', () => {
        whatLv0.classList.remove('what-level-active');
        whatLv1.classList.remove('what-level-active');
        whatLv2.classList.remove('what-level-active');

        whatLv0.classList.add('what-level-active');


        $.ajax({
            type: "POST",
            url: '/champ/statistics/skillseq',
            data: JSON.stringify({
                "name" : getParameterByName('name'),
                "line" : getParameterByName('line'),
                "whatLevel" : 3,
            }),
            dataType: 'JSON',
            contentType : 'application/json',
            success: function (data) {
                $('#skill-seq').children('li').remove();
                let list = '';
                let isGoodOrBad = "";
                if(data.length !== 0) {
                    for (let i = 0; i < data.length; i++) {

                        if (data[i].winRate >= 54) {
                            isGoodOrBad = "very-good";
                        } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                            isGoodOrBad = "good";
                        } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                            isGoodOrBad = "soso";
                        } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                            isGoodOrBad = "bad";
                        } else if (data[i].winRate < 46) {
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
                }
            },
        })
    })
}

if(whatLv1 !== undefined) {

    whatLv1.addEventListener('click', () => {
        whatLv0.classList.remove('what-level-active');
        whatLv1.classList.remove('what-level-active');
        whatLv2.classList.remove('what-level-active');

        whatLv1.classList.add('what-level-active');

        $.ajax({
            type: "POST",
            url: '/champ/statistics/skillseq',
            data: JSON.stringify({
                "name" : getParameterByName('name'),
                "line" : getParameterByName('line'),
                "whatLevel" : 6,
            }),
            dataType: 'JSON',
            contentType : 'application/json',
            success: function (data) {
                $('#skill-seq').children('li').remove();
                let list = '';
                let isGoodOrBad = "";
                if(data.length !== 0) {
                    for (let i = 0; i < data.length; i++) {

                        if (data[i].winRate >= 54) {
                            isGoodOrBad = "very-good";
                        } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                            isGoodOrBad = "good";
                        } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                            isGoodOrBad = "soso";
                        } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                            isGoodOrBad = "bad";
                        } else if (data[i].winRate < 46) {
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
                }
            },
        })
    })
}

if(whatLv2 !== undefined) {

    whatLv2.addEventListener('click', () => {
        whatLv0.classList.remove('what-level-active');
        whatLv1.classList.remove('what-level-active');
        whatLv2.classList.remove('what-level-active');

        whatLv2.classList.add('what-level-active');

        $.ajax({
            type: "POST",
            url: '/champ/statistics/skillseq',
            data: JSON.stringify({
                "name" : getParameterByName('name'),
                "line" : getParameterByName('line'),
                "whatLevel" : 11,
            }),
            dataType: 'JSON',
            contentType : 'application/json',
            success: function (data) {
                $('#skill-seq').children('li').remove();
                let list = '';
                let isGoodOrBad = "";

                if(data.length !== 0) {
                    for (let i = 0; i < data.length; i++) {

                        if (data[i].winRate >= 54) {
                            isGoodOrBad = "very-good";
                        } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                            isGoodOrBad = "good";
                        } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                            isGoodOrBad = "soso";
                        } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                            isGoodOrBad = "bad";
                        } else if (data[i].winRate < 46) {
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
                }
            },
        })
    })
}

$.ajax({
    type: "POST",
    url: '/champ/statistics/runecombine',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
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
        }
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/runeshard',
    data: JSON.stringify({
        "name" : getParameterByName('name'),
        "line" : getParameterByName('line'),
    }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        let isGray = "gray";
        let isGoodOrBad = "";
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                if ((i + 3) % 2 === 0) {
                    isGray = ""
                } else {
                    isGray = "gray"
                }

                if (data[i].winRate >= 54) {
                    isGoodOrBad = "very-good";
                } else if (data[i].winRate < 54 && data[i].winRate >= 51) {
                    isGoodOrBad = "good";
                } else if (data[i].winRate < 51 && data[i].winRate >= 48) {
                    isGoodOrBad = "soso";
                } else if (data[i].winRate < 48 && data[i].winRate >= 46) {
                    isGoodOrBad = "bad";
                } else if (data[i].winRate < 46) {
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
            $('#rune-shard').append(list);

            let runeShardSummary = [data[0].pick1, data[0].pick2, data[0].pick3];
            let runeShard1 = ['ability.png', 'attackspeed.png', 'cooltime.png'];
            let runeShard2 = ['ability.png','Def.png', 'magicDef.png'];
            let runeShard3 = ['health.png', 'Def.png', 'magicDef.png'];
            for (let j = 0; j < 3; j++) {
                if (runeShardSummary[0] == runeShard1[j]) {
                    $('.rune-select').eq(7).children('img').eq(j).css({opacity: 1});
                }
                if (runeShardSummary[1] == runeShard2[j]) {
                    $('.rune-select').eq(8).children('img').eq(j).css({opacity: 1});
                }
                if (runeShardSummary[2] == runeShard3[j]) {
                    $('.rune-select').eq(9).children('img').eq(j).css({opacity: 1});
                }
            }
        }
    },
})
