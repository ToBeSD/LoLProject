$.ajax({
    type: "POST",
    url: '/community/build',
    data: JSON.stringify({
        category : "빌드 연구소",
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