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

$.ajax({
    type: "POST",
    url: '/champ/rankline',
    data: JSON.stringify({ "line" : "탑" }),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        for(let i = 0; i < data.length; i++) {
            list +=`
             <a href="/champ/statistics?name=${data[i].name}&line=${data[i].line}" style="text-decoration: none; color: #353945;">
               <div class="list">
                    <span>${i + 1}</span>
                    <div style="width: 40px; padding: 0;">
                        <img class="list-image" src="../image/champhead/${data[i].image}" alt="img">
                    </div>
                    <span style="width: 30%;">${data[i].name}</span>
                    <span>${data[i].line}</span>
                    <span class="list-number">${data[i].psScore}</span>
                    <span class="list-number">${data[i].honeyScore}</span>
                    <span class="list-number">${data[i].winRate}</span>
                    <span class="list-number">${data[i].pickRate}</span>
                    <span class="list-number">${data[i].banRate}</span>
                    <span class="list-number">${data[i].count}</span>
                </div>
               </a>`;
        }
        $('.champ-list').append(list);
    },
});

position.addEventListener('click', (e) => {
    if(e.target === topBtn) {
        topBtn.classList.remove('active');
        jungleBtn.classList.remove('active');
        midBtn.classList.remove('active');
        adBtn.classList.remove('active');
        supBtn.classList.remove('active');
        allBtn.classList.remove('active')

        topBtn.classList.add('active');

        $.ajax({
            type: "POST",
            url: '/champ/rankline',
            data: JSON.stringify({ "line" : "탑" }),
            dataType: 'JSON',
            contentType : 'application/json',
            success: function (data) {
                $('.champ-list').remove();
                let champList = $("<div>").attr('class', 'champ-list');
                let list = '';
                for(let i = 0; i < data.length; i++) {
                    list +=`
                     <a href="/champ/statistics?name=${data[i].name}&line=${data[i].line}" style="text-decoration: none; color: #353945;">
                       <div class="list">
                            <span>${i + 1}</span>
                            <div style="width: 40px; padding: 0;">
                                <img class="list-image" src="../image/champhead/${data[i].image}" alt="img">
                            </div>
                            <span style="width: 30%;">${data[i].name}</span>
                            <span>${data[i].line}</span>
                            <span class="list-number">${data[i].psScore}</span>
                            <span class="list-number">${data[i].honeyScore}</span>
                            <span class="list-number">${data[i].winRate}</span>
                            <span class="list-number">${data[i].pickRate}</span>
                            <span class="list-number">${data[i].banRate}</span>
                            <span class="list-number">${data[i].count}</span>
                        </div>
                     </a>`;
                }
                champList.append(list);
                $('.champ-rank-container').append(champList);
            },
        });

    } 
    if(e.target === jungleBtn) {
        topBtn.classList.remove('active');
        jungleBtn.classList.remove('active');
        midBtn.classList.remove('active');
        adBtn.classList.remove('active');
        supBtn.classList.remove('active');
        allBtn.classList.remove('active');

        jungleBtn.classList.add('active');

        $.ajax({
            type: "POST",
            url: '/champ/rankline',
            data: JSON.stringify({ "line" : "정글" }),
            dataType: 'JSON',
            contentType : 'application/json',
            success: function (data) {
                $('.champ-list').remove();
                let champList = $("<div>").attr('class', 'champ-list');
                let list = '';
                for(let i = 0; i < data.length; i++) {
                    list +=`
                     <a href="/champ/statistics?name=${data[i].name}&line=${data[i].line}" style="text-decoration: none; color: #353945;">
                       <div class="list">
                            <span>${i + 1}</span>
                            <div style="width: 40px; padding: 0;">
                                <img class="list-image" src="../image/champhead/${data[i].image}" alt="img">
                            </div>
                            <span style="width: 30%;">${data[i].name}</span>
                            <span>${data[i].line}</span>
                            <span class="list-number">${data[i].psScore}</span>
                            <span class="list-number">${data[i].honeyScore}</span>
                            <span class="list-number">${data[i].winRate}</span>
                            <span class="list-number">${data[i].pickRate}</span>
                            <span class="list-number">${data[i].banRate}</span>
                            <span class="list-number">${data[i].count}</span>
                        </div>
                     </a>`;
                }
                champList.append(list);
                $('.champ-rank-container').append(champList);
            },
        });
    } 
    if(e.target === midBtn) {
        topBtn.classList.remove('active');
        jungleBtn.classList.remove('active');
        midBtn.classList.remove('active');
        adBtn.classList.remove('active');
        supBtn.classList.remove('active');
        allBtn.classList.remove('active');

        midBtn.classList.add('active');

        $.ajax({
            type: "POST",
            url: '/champ/rankline',
            data: JSON.stringify({ "line" : "미드" }),
            dataType: 'JSON',
            contentType : 'application/json',
            success: function (data) {
                $('.champ-list').remove();
                let champList = $("<div>").attr('class', 'champ-list');
                let list = '';
                for(let i = 0; i < data.length; i++) {
                    list +=`
                     <a href="/champ/statistics?name=${data[i].name}&line=${data[i].line}" style="text-decoration: none; color: #353945;">
                       <div class="list">
                            <span>${i + 1}</span>
                            <div style="width: 40px; padding: 0;">
                                <img class="list-image" src="../image/champhead/${data[i].image}" alt="img">
                            </div>
                            <span style="width: 30%;">${data[i].name}</span>
                            <span>${data[i].line}</span>
                            <span class="list-number">${data[i].psScore}</span>
                            <span class="list-number">${data[i].honeyScore}</span>
                            <span class="list-number">${data[i].winRate}</span>
                            <span class="list-number">${data[i].pickRate}</span>
                            <span class="list-number">${data[i].banRate}</span>
                            <span class="list-number">${data[i].count}</span>
                        </div>
                     </a>`;
                }
                champList.append(list);
                $('.champ-rank-container').append(champList);
            },
        });
    } 
    if(e.target === adBtn) {

        topBtn.classList.remove('active');
        jungleBtn.classList.remove('active');
        midBtn.classList.remove('active');
        adBtn.classList.remove('active');
        supBtn.classList.remove('active');
        allBtn.classList.remove('active');

        adBtn.classList.add('active');

        $.ajax({
            type: "POST",
            url: '/champ/rankline',
            data: JSON.stringify({ "line" : "원딜" }),
            dataType: 'JSON',
            contentType : 'application/json',
            success: function (data) {
                $('.champ-list').remove();
                let champList = $("<div>").attr('class', 'champ-list');
                let list = '';
                for(let i = 0; i < data.length; i++) {
                    list +=`
                     <a href="/champ/statistics?name=${data[i].name}&line=${data[i].line}" style="text-decoration: none; color: #353945;">
                       <div class="list">
                            <span>${i + 1}</span>
                            <div style="width: 40px; padding: 0;">
                                <img class="list-image" src="../image/champhead/${data[i].image}" alt="img">
                            </div>
                            <span style="width: 30%;">${data[i].name}</span>
                            <span>${data[i].line}</span>
                            <span class="list-number">${data[i].psScore}</span>
                            <span class="list-number">${data[i].honeyScore}</span>
                            <span class="list-number">${data[i].winRate}</span>
                            <span class="list-number">${data[i].pickRate}</span>
                            <span class="list-number">${data[i].banRate}</span>
                            <span class="list-number">${data[i].count}</span>
                        </div>
                     </a>`;
                }
                champList.append(list);
                $('.champ-rank-container').append(champList);
            },
        });
    } 
    if(e.target === supBtn) {
        topBtn.classList.remove('active');
        jungleBtn.classList.remove('active');
        midBtn.classList.remove('active');
        adBtn.classList.remove('active');
        supBtn.classList.remove('active');
        allBtn.classList.remove('active');

        supBtn.classList.add('active');

        $.ajax({
            type: "POST",
            url: '/champ/rankline',
            data: JSON.stringify({ "line" : "서폿" }),
            dataType: 'JSON',
            contentType : 'application/json',
            success: function (data) {
                $('.champ-list').remove();
                let champList = $("<div>").attr('class', 'champ-list');
                let list = '';
                for(let i = 0; i < data.length; i++) {
                    list +=`
                     <a href="/champ/statistics?name=${data[i].name}&line=${data[i].line}" style="text-decoration: none; color: #353945;">
                       <div class="list">
                            <span>${i + 1}</span>
                            <div style="width: 40px; padding: 0;">
                                <img class="list-image" src="../image/champhead/${data[i].image}" alt="img">
                            </div>
                            <span style="width: 30%;">${data[i].name}</span>
                            <span>${data[i].line}</span>
                            <span class="list-number">${data[i].psScore}</span>
                            <span class="list-number">${data[i].honeyScore}</span>
                            <span class="list-number">${data[i].winRate}</span>
                            <span class="list-number">${data[i].pickRate}</span>
                            <span class="list-number">${data[i].banRate}</span>
                            <span class="list-number">${data[i].count}</span>
                        </div>
                     </a>`;
                }
                champList.append(list);
                $('.champ-rank-container').append(champList);
            },
        });
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
                $('.champ-list').remove();
                let champList = $("<div>").attr('class', 'champ-list');
                let list = '';
                for(let i = 0; i < data.length; i++) {
                     list +=`
                     <a href="/champ/statistics?name=${data[i].name}&line=${data[i].line}" style="text-decoration: none; color: #353945;">
                       <div class="list">
                            <span>${i + 1}</span>
                            <div style="width: 40px; padding: 0;">
                                <img class="list-image" src="../image/champhead/${data[i].image}" alt="img">
                            </div>
                            <span style="width: 30%;">${data[i].name}</span>
                            <span>${data[i].line}</span>
                            <span class="list-number">${data[i].psScore}</span>
                            <span class="list-number">${data[i].honeyScore}</span>
                            <span class="list-number">${data[i].winRate}</span>
                            <span class="list-number">${data[i].pickRate}</span>
                            <span class="list-number">${data[i].banRate}</span>
                            <span class="list-number">${data[i].count}</span>
                        </div>
                     </a>`;
                }
                champList.append(list);
                $('.champ-rank-container').append(champList);
            })
    }
})

const goTop = document.querySelector('.top-button');

goTop.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior: 'smooth' })
})