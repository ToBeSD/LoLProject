function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).on('click', '.write-comment', function(e) {
    let dedet = `<div class="bottom-comment">
                    <form action="/communoty/comment">
                        <div class="comment">
                            <div class="comment-name">댓글쓰기</div>
                            <input type="hidden" name="bno" value="${getParameterByName('bno')}">
                            <textarea id="input-comment" name="content" class="comment-space"></textarea>
                            <button class="comment-regist" type="button">등록</button>
                        </div>
                    </form>
                </div>`;
    $(e.target).parent().parent().parent().after(dedet);
})

const commentBtn = document.querySelector('.comment-regist');
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
            alert(e.status)
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
    $.ajax({
        type: "POST",
        url: '/community/commentrevise',
        data: JSON.stringify({
            baseNo : $(e.target).parent().siblings('input').eq(1).val(),
            content :  $(e.target).parent().siblings('#resize-area').find('textarea').val(),
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

