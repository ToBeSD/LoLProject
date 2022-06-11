// $.get('/champ/statistics/champname')
//     .done((data) => {
//         let name = `<h1 style="font-weight: 400; font-size: 38px; margin: 0; width:100%; margin-top: 15px;">${data.name}</h1>`;
//
//         $('.champ-head').append(name);
//     })

$.ajax({
    type: "POST",
    url: '/champ/statistics/hardmatch',
    data: JSON.stringify({ "name" : "가렌" }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list;
        let isGray = "gray";
        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }
            list += `<div class="hard-list ${isGray}">
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
                    </div>`;
        }
        $('.match-list').eq(0).append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/easymatch',
    data: JSON.stringify({ "name" : "가렌" }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list;
        let isGray = "gray";
        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }
            list += `<div class="hard-list ${isGray}">
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
                    </div>`;
        }
        $('.match-list').eq(1).append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/champ/statistics/spell',
    data: JSON.stringify({ "name" : "가렌" }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list;
        let isGray = "gray";
        for(let i = 0; i < data.length; i++) {
            if((i + 3) % 2 === 0) {
                isGray = ""
            }else {
                isGray = "gray"
            }
            list += `<li class="list-items ${isGray}">
                        <div class="spell">
                            <img src="../image/spell/${data[i].pick1}" alt="img">
                            <img src="../image/spell/${data[i].pick2}" alt="img">
                        </div>
                        <div class="spell-percent">
                            <span style="width: 23.3%;">${data[i].winRate}</span>
                            <span style="width: 23.3%;">${data[i].pickRate}</span>
                            <span style="width: 23.3%;">${data[i].count}</span>
                        </div>
                    </li>`;
        }
        $('#spell-list').append(list);
    },
})
//
// $.ajax({
//     type: "POST",
//     url: '/champ/statistics/startitem',
//     data: JSON.stringify({ "name" : "가렌" }),
//     dataType: 'JSON',
//     contentType : 'application/json',
//     success: function (data) {
//         let list;
//         let isGray = "gray";
//         for(let i = 0; i < data.length; i++) {
//             if((i + 3) % 2 === 0) {
//                 isGray = ""
//             }else {
//                 isGray = "gray"
//             }
//             list += `<li class="list-items ${isGray}">
//                         <div class="spell">
//                             <img src="../image/spell/${data[i].pick1}" alt="img">
//                             <img src="../image/spell/${data[i].pick2}" alt="img">
//                         </div>
//                         <div class="spell-percent">
//                             <span style="width: 23.3%;">${data[i].winRate}</span>
//                             <span style="width: 23.3%;">${data[i].pickRate}</span>
//                             <span style="width: 23.3%;">${data[i].count}</span>
//                         </div>
//                     </li>`;
//         }
//         $('#start-item-list').append(list);
//     },
// })
//
// $.ajax({
//     type: "POST",
//     url: '/champ/statistics/shoes',
//     data: JSON.stringify({ "name" : "가렌" }),
//     dataType: 'JSON',
//     contentType : 'application/json',
//     success: function (data) {
//         let list;
//         let isGray = "gray";
//         for(let i = 0; i < data.length; i++) {
//             if((i + 3) % 2 === 0) {
//                 isGray = ""
//             }else {
//                 isGray = "gray"
//             }
//             list += `<li class="list-items ${isGray}">
//                         <div class="spell">
//                             <img src="../image/spell/${data[i].pick1}" alt="img">
//                             <img src="../image/spell/${data[i].pick2}" alt="img">
//                         </div>
//                         <div class="spell-percent">
//                             <span style="width: 23.3%;">${data[i].winRate}</span>
//                             <span style="width: 23.3%;">${data[i].pickRate}</span>
//                             <span style="width: 23.3%;">${data[i].count}</span>
//                         </div>
//                     </li>`;
//         }
//         $('#shoes-list').append(list);
//     },
// })



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



const whatLv0 = document.querySelectorAll('.what-level')[0];
const whatLv1 = document.querySelectorAll('.what-level')[1];
const whatLv2 = document.querySelectorAll('.what-level')[2];

whatLv0.addEventListener('click', () => {
    whatLv0.classList.remove('what-level-active');
    whatLv1.classList.remove('what-level-active');
    whatLv2.classList.remove('what-level-active');
    
    whatLv0.classList.add('what-level-active');
})

whatLv1.addEventListener('click', () => {
    whatLv0.classList.remove('what-level-active');
    whatLv1.classList.remove('what-level-active');
    whatLv2.classList.remove('what-level-active');

    whatLv1.classList.add('what-level-active');
})

whatLv2.addEventListener('click', () => {
    whatLv0.classList.remove('what-level-active');
    whatLv1.classList.remove('what-level-active');
    whatLv2.classList.remove('what-level-active');

    whatLv2.classList.add('what-level-active');
})

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


