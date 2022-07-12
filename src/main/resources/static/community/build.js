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
                        ${data[i].champName}
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
        let display = 'block';
        for (let i = 0; i < (data.count/10); i++) {
            if(i >= 5) {
                display = 'none';
            }
            pageBtn += `<button class="bottom-btn-in page-btn" style="display: ${display}">${i + 1}</button>`;
        }
        $('#page-start').after(pageBtn);
    },
})

$(document).on('click', '.page-btn', function (e){
    $.ajax({
        type: "POST",
        url: '/community',
        data: JSON.stringify({
            category : "빌드 연구소",
            page : e.target.innerHTML,
        }),
        contentType : 'application/json',
        success: function (data) {
            $('.contents-item').remove();
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
            window.scrollTo({ top:200, behavior: 'smooth' })

            if($(e.target).html() == $('#page-start').next().html()  ||  $(e.target).html() == $('#page-end').prev().html()) {
                return;

            }else if($(e.target).html() == $('#page-start').next().next().html()) {

                $('.page-btn').css({display: 'none'});
                $(e.target).next().next().next().css({display: 'block'});
                $(e.target).next().next().css({display: 'block'});
                $(e.target).next().css({display: 'block'});
                $(e.target).css({display: 'block'});
                $(e.target).prev().css({display : 'block'});

            } else if($(e.target).html() == $('#page-end').prev().prev().html()) {

                $('.page-btn').css({display: 'none'});
                $(e.target).next().css({display: 'block'});
                $(e.target).css({display: 'block'});
                $(e.target).prev().css({display : 'block'});
                $(e.target).prev().prev().css({display : 'block'});
                $(e.target).prev().prev().prev().css({display : 'block'});

            } else{

                $('.page-btn').css({display: 'none'});
                $(e.target).next().next().css({display: 'block'});
                $(e.target).next().css({display: 'block'});
                $(e.target).css({display: 'block'});
                $(e.target).prev().css({display : 'block'});
                $(e.target).prev().prev().css({display : 'block'});

            }
        },
    })
})

$('#find-form').submit(() => {
    if($('.select').val() == '제목') {
        $.ajax({
            type: "POST",
            url: '/community/build',
            data: JSON.stringify({
                category : "빌드 연구소",
                title : $('.contents-input').val(),
                page : 1,
            }),
            contentType : 'application/json',
            success: function (data) {
                let list = '';
                for(let i = 0; i < data.length; i++) {
                    list += `<div>
                                <a class="contents-item" href="/community/build/detail?bno=${data[i].bno}">
                                    <span class="build">
                                        ${data[i].champName}
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
    }else if($('.select').val() == '작성자') {
        $.ajax({
            type: "POST",
            url: '/community/build',
            data: JSON.stringify({
                category : "빌드 연구소",
                title : $('.contents-input').val(),
                page : 1,
            }),
            contentType : 'application/json',
            success: function (data) {
                let list = '';
                for(let i = 0; i < data.length; i++) {
                    list += `<div>
                                <a class="contents-item" href="/community/build/detail?bno=${data[i].bno}">
                                    <span class="build">
                                        ${data[i].champName}
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
    }
})
