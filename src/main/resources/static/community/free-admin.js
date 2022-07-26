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
            list += `<div class="list" style="display: flex">
                        <a class="contents-item" href="/community/detail?bno=${data[i].bno}">
                            <span class="free">
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
                        <input type="hidden" value="${data[i].bno}">
                        <img class="delete-button" src="/trash-can.png" style="width: 24px; height: 24px; padding-top: 12px">
                    </div>`;
        }
        $('.contents').append(list);
    },
})

$.ajax({
    type: "POST",
    url: '/community/allcontent',
    data: JSON.stringify({
        category : "자유 게시판",
    }),
    contentType : 'application/json',
    success: function (data) {
        let pageBtn = '';
        let display = 'block';
        for (let i = 0; i < (data.count/10); i++) {
            if(i >= 5) {
                display = 'none';
            }
            pageBtn += `<button class="bottom-btn-in page-btn" id="find-all" style="display: ${display}">${i + 1}</button>`;
        }
        $('#page-start').after(pageBtn);
    },
})

$(document).on('click', '#find-all', function (e){
    $('.page-btn').removeClass('page-button-active')
    e.target.classList.add('page-button-active');

    $.ajax({
        type: "POST",
        url: '/community',
        data: JSON.stringify({
            category : "자유 게시판",
            page : e.target.innerHTML,
        }),
        contentType : 'application/json',
        success: function (data) {
            $('.list').remove();
            let newList = '';

            for (let i = 0; i < data.length; i++) {
                newList += `<div class="list" style="display: flex">
                                <a class="contents-item" href="/community/detail?bno=${data[i].bno}">
                                    <span class="free">
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
                                <input type="hidden" value="${data[i].bno}">
                                <img class="delete-button" src="/trash-can.png" style="width: 24px; height: 24px; padding-top: 12px">
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


$('.contents-input').on('keypress',(e) => {
    if(e.keyCode === 13) {
        if ($('.select').val() == '제목') {
            $.ajax({
                type: "POST",
                url: '/community',
                data: JSON.stringify({
                    category: "자유 게시판",
                    title: $('.contents-input').val(),
                    page: 1,
                }),
                contentType: 'application/json',
                success: function (data) {
                    $('.list').remove();

                    let list = '';
                    for (let i = 0; i < data.length; i++) {
                        list += `<div class="list" style="display: flex">
                                    <a class="contents-item" href="/community/detail?bno=${data[i].bno}">
                                        <span class="free">
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
                                    <input type="hidden" value="${data[i].bno}">
                                    <img class="delete-button" src="/trash-can.png" style="width: 24px; height: 24px; padding-top: 12px">
                                </div>`;
                    }
                    $('.contents').append(list);


                    $.ajax({
                        type: "POST",
                        url: '/community/searchedcontent',
                        data: JSON.stringify({
                            category: "자유 게시판",
                            title: $('.contents-input').val(),
                        }),
                        contentType: 'application/json',
                        success: function (data) {
                            $('.page-btn').remove();
                            let pageBtn = '';
                            let display = 'block';
                            for (let i = 0; i < (data.count / 10); i++) {
                                if (i >= 5) {
                                    display = 'none';
                                }
                                pageBtn += `<button class="bottom-btn-in page-btn" id="find-by-title" style="display: ${display}">${i + 1}</button>`;
                            }
                            $('#page-start').after(pageBtn);
                        },
                    })
                },
            })
        } else if ($('.select').val() == '작성자') {
            $.ajax({
                type: "POST",
                url: '/community',
                data: JSON.stringify({
                    category: "자유 게시판",
                    nickName: $('.contents-input').val(),
                    page: 1,
                }),
                contentType: 'application/json',
                success: function (data) {
                    $('.list').remove();

                    let list = '';
                    for (let i = 0; i < data.length; i++) {
                        list += `<div class="list" style="display: flex">
                                    <a class="contents-item" href="/community/detail?bno=${data[i].bno}">
                                        <span class="free">
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
                                    <input type="hidden" value="${data[i].bno}">
                                    <img class="delete-button" src="/trash-can.png" style="width: 24px; height: 24px; padding-top: 12px">
                                </div>`;
                    }
                    $('.contents').append(list);

                    $.ajax({
                        type: "POST",
                        url: '/community/searchedcontent',
                        data: JSON.stringify({
                            category: "자유 게시판",
                            nickName: $('.contents-input').val(),
                        }),
                        contentType: 'application/json',
                        success: function (data) {
                            $('.page-btn').remove();
                            let pageBtn = '';
                            let display = 'block';
                            for (let i = 0; i < (data.count / 10); i++) {
                                if (i >= 5) {
                                    display = 'none';
                                }
                                pageBtn += `<button class="bottom-btn-in page-btn" id="find-by-nickname" style="display: ${display}">${i + 1}</button>`;
                            }
                            $('#page-start').after(pageBtn);
                        },
                    })
                },
            })
        }
    }
})


$(document).on('click', '#find-by-nickname', function (e) {
    $('.page-btn').removeClass('page-button-active')
    e.target.classList.add('page-button-active');

    $.ajax({
        type: "POST",
        url: '/community',
        data: JSON.stringify({
            category: "자유 게시판",
            nickName: $('.contents-input').val(),
            page: e.target.innerHTML,
        }),
        contentType: 'application/json',
        success: function (data) {
            console.log(data)
            $('.list').remove();
            let newList = '';

            for (let i = 0; i < data.length; i++) {
                newList += `<div class="list" style="display: flex">
                                <a class="contents-item" href="/community/detail?bno=${data[i].bno}">
                                    <span class="free">
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
                                <input type="hidden" value="${data[i].bno}">
                                <img class="delete-button" src="/trash-can.png" style="width: 24px; height: 24px; padding-top: 12px">
                            </div>`;
            }
            $(".title-build").after(newList);
            window.scrollTo({top: 200, behavior: 'smooth'})

            if ($(e.target).html() == $('#page-start').next().html() || $(e.target).html() == $('#page-end').prev().html()) {
                return;

            } else if ($(e.target).html() == $('#page-start').next().next().html()) {

                $('.page-btn').css({display: 'none'});
                $(e.target).next().next().next().css({display: 'block'});
                $(e.target).next().next().css({display: 'block'});
                $(e.target).next().css({display: 'block'});
                $(e.target).css({display: 'block'});
                $(e.target).prev().css({display: 'block'});

            } else if ($(e.target).html() == $('#page-end').prev().prev().html()) {

                $('.page-btn').css({display: 'none'});
                $(e.target).next().css({display: 'block'});
                $(e.target).css({display: 'block'});
                $(e.target).prev().css({display: 'block'});
                $(e.target).prev().prev().css({display: 'block'});
                $(e.target).prev().prev().prev().css({display: 'block'});

            } else {

                $('.page-btn').css({display: 'none'});
                $(e.target).next().next().css({display: 'block'});
                $(e.target).next().css({display: 'block'});
                $(e.target).css({display: 'block'});
                $(e.target).prev().css({display: 'block'});
                $(e.target).prev().prev().css({display: 'block'});

            }
        },
    })
})

$(document).on('click', '#find-by-title', function (e) {
    $('.page-btn').removeClass('page-button-active')
    e.target.classList.add('page-button-active');

    $.ajax({
        type: "POST",
        url: '/community',
        data: JSON.stringify({
            category: "자유 게시판",
            title: $('.contents-input').val(),
            page: e.target.innerHTML,
        }),
        contentType: 'application/json',
        success: function (data) {
            $('.list').remove();
            let newList = '';

            for (let i = 0; i < data.length; i++) {
                newList += `<div class="list" style="display: flex">
                                <a class="contents-item" href="/community/detail?bno=${data[i].bno}">
                                    <span class="free">
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
                                <input type="hidden" value="${data[i].bno}">
                                <img class="delete-button" src="/trash-can.png" style="width: 24px; height: 24px; padding-top: 12px">
                            </div>`;
            }
            $(".title-build").after(newList);
            window.scrollTo({top: 200, behavior: 'smooth'})

            if ($(e.target).html() == $('#page-start').next().html() || $(e.target).html() == $('#page-end').prev().html()) {
                return;

            } else if ($(e.target).html() == $('#page-start').next().next().html()) {

                $('.page-btn').css({display: 'none'});
                $(e.target).next().next().next().css({display: 'block'});
                $(e.target).next().next().css({display: 'block'});
                $(e.target).next().css({display: 'block'});
                $(e.target).css({display: 'block'});
                $(e.target).prev().css({display: 'block'});

            } else if ($(e.target).html() == $('#page-end').prev().prev().html()) {

                $('.page-btn').css({display: 'none'});
                $(e.target).next().css({display: 'block'});
                $(e.target).css({display: 'block'});
                $(e.target).prev().css({display: 'block'});
                $(e.target).prev().prev().css({display: 'block'});
                $(e.target).prev().prev().prev().css({display: 'block'});

            } else {

                $('.page-btn').css({display: 'none'});
                $(e.target).next().next().css({display: 'block'});
                $(e.target).next().css({display: 'block'});
                $(e.target).css({display: 'block'});
                $(e.target).prev().css({display: 'block'});
                $(e.target).prev().prev().css({display: 'block'});

            }
        },
    })
})

$(document).on('click', '.delete-button', (e) => {

    $.ajax({
        type: "POST",
        url: '/community/post/delete',
        data: JSON.stringify({
            bno : $(e.target).siblings('input').val(),
        }),
        contentType: 'application/json',
        success: function () {
            location.reload();
        },
        error() {
            alert('관리자 권한이 없습니다.');
        }
    })

})