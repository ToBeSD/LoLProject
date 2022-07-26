$.ajax({
    type: "POST",
    url: '/notice',
    contentType : 'application/json',
    success: function (data) {
        let list = '';
        for(let i = 0; i < data.length; i++) {
            list += `<div class="list" style="display: flex">
                        <a class="contents-item" href="/notice/detail?bno=${data[i].bno}">
                            <span class="build1">
                                ${data[i].title}
                            </span>
                            <span class="build2" style="width:100px; font-weight: 400">
                                ${data[i].writeDate}
                            </span>
                        </a>
                    </div>`;
        }
        $('.contents').append(list);
    },
})