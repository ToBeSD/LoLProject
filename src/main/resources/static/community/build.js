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
            list += `<div>
                <a class="contents-item" href="/community/build/detail?bno=${data[i].bno}">
                    <span class="build">
                        <img class="champion-head" src="/image/profile/${data[i].image}"/>
                    </span>
                    <span class="build1">
                        ${data[i].title}
                    </span>
                    <span class="build2" style="width:150px;">
                        ${data[i].nickName}
                    </span>
                    <span class="build2" style="width:100px; font-weight: 400">
                        ${data[i].writeDate}
                    </span>
                    <span class="build2" style="width:30px; font-weight: 400">
                        ${data[i].count}
                    </span>
                    <span class="build2" style="width:30px; color: #353945;">
                        ${data[i].good}
                    </span>
                </a>
            </div>`;
        }
        $('.contents').append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/community/allcontent',
    data: JSON.stringify({
        category : "빌드 연구소",
    }),
    contentType : 'application/json',
    success: function (data) {
        let pageBtn = '';
        for (let i = 0; i < (data.length/10); i++) {
            pageBtn += `<button class="bottom-btn-in">${i + 1}</button>`;
        }
        $('#page-start').after(pageBtn);
    },
})

$(document).on('click', '.bottom-btn-in', function (e){
    console.log(e.target.innerHTML)
    $.ajax({
        type: "POST",
        url: '/community',
        data: JSON.stringify({
            category : "빌드 연구소",
            page : e.target.innerHTML,
        }),
        contentType : 'application/json',
        success: function (data) {
            $('.list').remove();
            let newList = '';

            for (let i = 0; i < data.length; i++) {
                newList += `<div class="list">
                <a class="contents-item" href="/community/detail?bno=${data[i].bno}">
                    <span class="build">
                        자유
                    </span>
                    <span class="build1">
                        ${data[i].title}
                    </span>
                    <span class="build2" style="width:150px;">
                        ${data[i].nickName}
                    </span>
                    <span class="build2" style="width:100px; font-weight: 400">
                        ${data[i].writeDate}
                    </span>
                    <span class="build2" style="width:30px; font-weight: 400">
                        ${data[i].count}
                    </span>
                    <span class="build2" style="width:30px; color: #353945;">
                        ${data[i].good}
                    </span>
                </a>
            </div>`;
            }
            $(".title-build").after(newList);
        },
    })
})