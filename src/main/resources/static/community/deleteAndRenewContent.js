function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).on('click', '.write-comment', function(e) {
    $('.under-comment-button').remove();

    let baseNo = $(e.target).parent().parent().siblings('input').eq(1).val();
    let dedet = `<div class="bottom-comment under-comment-button">
                    <form action="/communoty/comment">
                        <div class="comment">
                            <div class="comment-name">댓글쓰기</div>
                            <input type="hidden" name="bno" value="${getParameterByName('bno')}">
                            <input type="hidden" name="baseNo" value="${baseNo}">
                            <textarea id="under-text" name="content" class="comment-space"></textarea>
                            <button id="under-comment" class="comment-regist" type="button">등록</button>
                        </div>
                    </form>
                </div>`;
    $(e.target).parent().parent().parent().after(dedet);
})

$(document).on('click', '#under-comment', (e)=> {
    $.ajax({
        type: "POST",
        url: '/community/undercomment',
        data: JSON.stringify({
            bno : getParameterByName('bno'),
            baseNo : $(e.target).siblings('input').eq(1).val(),
            content : $('#under-text').val(),
        }),
        contentType : 'application/json',
        success: function () {
            location.reload();
        },
        error(e) {
            alert('로그인 하셔야합니다.')
            location.href = '/login'
        }
    })
})

const commentBtn = document.querySelector('#comment-regist');
const comment = document.querySelector('#input-comment');

commentBtn.addEventListener('click', () => {
    $.ajax({
        type: "POST",
        url: '/community/comment',
        data: JSON.stringify({
            bno : getParameterByName('bno'),
            content : comment.value,
        }),
        contentType : 'application/json',
        success: function () {
            location.reload();
        },
        error(e) {
            alert('로그인 하셔야합니다.')
            location.href = '/login'
        }
    })
})




$(document).on('click', '#comment-revise', function (e){

    $(e.target).parent().siblings('#comment-writer').hide();
    $(e.target).parent().siblings('#resize-area').show();
    $(e.target).parent().hide();
    $(e.target).parent().siblings('#complete-or-cancle').show();

})

$(document).on('click', '#comment-revise-cancle', function (e){

    $(e.target).parent().siblings('#comment-writer').show();
    $(e.target).parent().siblings('#resize-area').hide();
    $(e.target).parent().hide();
    $(e.target).parent().siblings('#revise-or-delete').show();

})

$(document).on('click', '#comment-delete', function (e){
    $.ajax({
        type: "POST",
        url: '/community/commentdelete',
        data: JSON.stringify({
            baseNo : $(e.target).parent().siblings('input').eq(1).val(),
            upperBaseNo : $(e.target).parent().siblings('input').eq(2).val(),
        }),
        contentType : 'application/json',
        success: function () {
            location.reload();
        },
        error(e) {
            alert(e.status)
        }
    })
})

$(document).on('click', '#comment-revise-complete', function (e){
    let textArea = $(e.target).parent().siblings('#resize-area').find('textarea').val()

    if(textArea == '') {
        alert('변경사항을 입력해 주세요.')
        return;
    }

    $.ajax({
        type: "POST",
        url: '/community/commentrevise',
        data: JSON.stringify({
            baseNo : $(e.target).parent().siblings('input').eq(1).val(),
            upperBaseNo : $(e.target).parent().siblings('input').eq(2).val(),
            content :  textArea,
        }),
        contentType : 'application/json',
        success: function () {
            location.reload();
        },
        error(e) {
            alert(e.status)
        }
    })
})




$('.recommend').click((e) => {
    let goodOrBad = '';
    if (e.target.innerHTML.includes('좋아요')) {
        goodOrBad = 'good';
    } else if(e.target.innerHTML.includes('싫어요')){
        goodOrBad = 'bad';
    }

    $.ajax({
        type: "POST",
        url: '/community/goodorbad',
        data: JSON.stringify({
            goodBad : goodOrBad,
            bno : getParameterByName('bno'),
        }),
        contentType : 'application/json',
        success: function (data) {

        },
        error(e) {
            console.log(e.status)
        }
    });
})

const deleteBtn = document.querySelector('#delete-button');

deleteBtn.addEventListener('click', () => {
    $.ajax({
        type: "POST",
        url: '/community/post/delete',
        data: JSON.stringify({
            bno : getParameterByName('bno'),
        }),
        contentType : 'application/json',
        success: function (data) {
            if(data.category == '자유 게시판') {
                location.href = '/community';
            }else if (data.category == '빌드 연구소') {
                location.href = '/community/build';
            }
        },
        error(e) {
            console.log(e.status)
        }
    })
})
