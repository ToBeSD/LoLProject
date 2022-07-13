$(function() {
    //프로필 설정
    $(".change-img div.profile-settings").hover(function() {
        $(this).find("img:first-child").animate({opacity:0},100);// ('opacity','0');
        $(this).find("img").eq(1).animate({opacity:1},100); // .css('opacity','1');
        $(this).find("div").animate({opacity:1},250); //css('opacity','1');
        $(this).find("img").eq(2).animate({opacity:1},100);  //.css('opacity','1');
        $(this).find("div").off('click').on('click', (e) => {
            let targetImage = $(e.target).siblings('#img').attr('src').replace('/image/profile/', '');
            $.ajax({
                type: "POST",
                url: '/mypage/changeprofile',
                data: JSON.stringify({
                    memberKey: $('#memberkey').val(),
                    image: targetImage,
                }),
                contentType : 'application/json',
                success: function (data) {
                    alert('프로필이 변경되었습니다.');
                },
            })
            $('.my-image').attr('src', $(e.target).siblings('#img').attr('src'));
        })
    }, function() {
        $(this).find("img:first-child").animate({opacity:1});  //.css('opacity','1');
        $(this).find("img").eq(1).animate({opacity:0});  //.css('opacity','0');
        $(this).find("div").animate({opacity:0});  //.css('opacity','0');
        $(this).find("img").eq(2).animate({opacity:0});  //.css('opacity','0');
    });
    //한줄소개변경
    $("#btn-save-id").click(function() {
        var text = $("#introduce-modal-insert-id").val();
        const introduce = $('#introduce');
        const memberkey = $('#memberkey').val();
        $.ajax({
            type: "POST",
            url: '/mypage/introduce',
            data: JSON.stringify({
                memberKey : memberkey,
                introduce : text,
            }),
            contentType : 'application/json',
            success: function () {
                introduce.html(text);
                alert("한줄소개가 변경되었습니다.")
            },
            error(e) {
              alert(e.status);
            },
        })
    })

    $("#btn-save-id2").click(function() {
        if($('#new-password').val() === $('#new-password-confirm').val()) {
            $.ajax({
                type: "POST",
                url: '/mypage/changepassword',
                data: JSON.stringify({
                    memberKey: $('#memberkey').val(),
                    password: $('#now-password').val(),
                    newPassword: $('#new-password').val(),
                }),
                contentType: 'application/json',
                success: function (data, textStatus, jqXHR) {  // data는 서버가 보내준 data , textStatus는 status를 텍스트로 보여줌
                                                               // jqXHR은 jq.XHR.status로 status코드 보여줌
                    alert("비밀번호가 변경되었습니다.")
                },
                error: function(e) {
                    // alert(e.status); status코드
                    alert("현재 비밀번호를 잘못 입력 하셨습니다.")
                }
            })

        } else {
            $('#new-password').html("");
            $('#new-password-confirm').html("");
            $('#new-password').focus();
            alert('새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.')
        }
    });



    $("#btn-save-id3").click(function() {
        $.ajax({
            type: "DELETE",
            url: '/mypage/quit',
            data: JSON.stringify({
                memberKey : $('#memberkey').val(),
            }),
            contentType : 'application/json',
            success: function () {
                location.href = "/";
                alert('회원탈퇴 완료.')
            },
        })
    });

    $('#introduce-modal-id').animate({opacity:0},10);
    $('#change-pw-modal-id').animate({opacity:0},10);
    $('#member-secession-modal-id').animate({opacity:0},10);

    $("#introduce-btn").click(function() {
        $('#fake-body').animate({opacity:0.7},10);
        $('#introduce-modal-id').animate({opacity:1});

        $('.background-gray').removeClass('modal-del');
        $('.background-gray').addClass('modal-show');
        $('html, body').addClass('modal-body');

        $('#introduce-modal-id').css({
            "margin-top" : (($(window).height() - $('#introduce-modal-id').outerHeight())/2 + $(window).scrollTop()) + "px",
            "margin-left" : (($(window).width() - $('#introduce-modal-id').outerWidth())/2 + $(window).scrollLeft()) + "px"
        });

        $('.background-gray').click(function(e) {
            if(e.target.id === 'background-gray-id') {
                $('#fake-body').animate({opacity:1});
                $('#introduce-modal-id').animate({opacity:0},10);
                $('.background-gray').removeClass('modal-show');
                $('.background-gray').addClass('modal-del');

                $('html, body').removeClass('modal-body');
                $('#element').off('scroll touchmove mousewheel', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
            }
        });
        $('.introduce-modal-btn').click(function(e) {
            if(e.target.id === 'introduce-modal-btn-id') {
                $('#fake-body').animate({opacity:1});
                $('#introduce-modal-id').animate({opacity:0},10);
                $('.background-gray').removeClass('modal-show');
                $('.background-gray').addClass('modal-del');

                $('html, body').removeClass('modal-body');
                $('#element').off('scroll touchmove mousewheel', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
            }
        });
        $('.btn-save').click(function(e) {
            if(e.target.id === 'btn-save-id') {
                $('#fake-body').animate({opacity:1});
                $('#introduce-modal-id').animate({opacity:0},10);
                $('.background-gray').removeClass('modal-show');
                $('.background-gray').addClass('modal-del');

                $('html, body').removeClass('modal-body');
                $('#element').off('scroll touchmove mousewheel', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
            }
        });

        $('#element').on('scroll touchmove mousewheel', function(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
    });
    // 비밀번호 변경
    $("#change-pw-btn").click(function() {
        $('#fake-body').animate({opacity:0.7},10);
        $('#change-pw-modal-id').animate({opacity:1});

        $('.background-gray2').removeClass('modal-del');
        $('.background-gray2').addClass('modal-show');
        $('html, body').addClass('modal-body');

        $('#change-pw-modal-id').css({
            "margin-top" : (($(window).height() - $('#change-pw-modal-id').outerHeight())/2 + $(window).scrollTop()) + "px",
            "margin-left" : (($(window).width() - $('#change-pw-modal-id').outerWidth())/2 + $(window).scrollLeft()) + "px"
        });

        $('.background-gray2').click(function(e) {
            if(e.target.id === 'background-gray-id2') {
                $('#fake-body').animate({opacity:1});
                $('#change-pw-modal-id').animate({opacity:0},10);
                $('.background-gray2').removeClass('modal-show');
                $('.background-gray2').addClass('modal-del');

                $('html, body').removeClass('modal-body');
                $('#element').off('scroll touchmove mousewheel', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
            }
        });
        $('.change-pw-modal-btn').click(function(e) {
            if(e.target.id === 'change-pw-modal-btn-id') {
                $('#fake-body').animate({opacity:1});
                $('#change-pw-modal-id').animate({opacity:0},10);
                $('.background-gray2').removeClass('modal-show');
                $('.background-gray2').addClass('modal-del');

                $('html, body').removeClass('modal-body');
                $('#element').off('scroll touchmove mousewheel', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
            }
        });
        $('#btn-save-id2').click(function(e) {
            if(e.target.id === 'btn-save-id2') {
                $('#fake-body').animate({opacity:1});
                $('#change-pw-modal-id').animate({opacity:0},10);
                $('.background-gray2').removeClass('modal-show');
                $('.background-gray2').addClass('modal-del');

                $('html, body').removeClass('modal-body');
                $('#element').off('scroll touchmove mousewheel', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
            }
        });

        $('#element').on('scroll touchmove mousewheel', function(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
    });
    //회원탈퇴
    $("#member-secession-btn").click(function() {
        $('#fake-body').animate({opacity:0.7},10);
        $('#member-secession-modal-id').animate({opacity:1});

        $('.background-gray3').removeClass('modal-del');
        $('.background-gray3').addClass('modal-show');
        $('html, body').addClass('modal-body');

        $('#member-secession-modal-id').css({
            "margin-top" : (($(window).height() - $('#member-secession-modal-id').outerHeight())/2 + $(window).scrollTop()) + "px",
            "margin-left" : (($(window).width() - $('#member-secession-modal-id').outerWidth())/2 + $(window).scrollLeft()) + "px"
        });

        $('.background-gray3').click(function(e) {
            if(e.target.id === 'background-gray-id3') {
                $('#fake-body').animate({opacity:1});
                $('#member-secession-modal-id').animate({opacity:0},10);
                $('.background-gray3').removeClass('modal-show');
                $('.background-gray3').addClass('modal-del');

                $('html, body').removeClass('modal-body');
                $('#element').off('scroll touchmove mousewheel', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
            }
        });
        $('.member-secession-modal-btn').click(function(e) {
            if(e.target.id === 'member-secession-modal-btn-id') {
                $('#fake-body').animate({opacity:1});
                $('#member-secession-modal-id').animate({opacity:0},10);
                $('.background-gray3').removeClass('modal-show');
                $('.background-gray3').addClass('modal-del');

                $('html, body').removeClass('modal-body');
                $('#element').off('scroll touchmove mousewheel', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
            }
        });
        $('#btn-save-id3').click(function(e) {
            if(e.target.id === 'btn-save-id3') {
                $('#fake-body').animate({opacity:1});
                $('#member-secession-modal-id').animate({opacity:0},10);
                $('.background-gray3').removeClass('modal-show');
                $('.background-gray3').addClass('modal-del');

                $('html, body').removeClass('modal-body');
                $('#element').off('scroll touchmove mousewheel', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
            }
        });

        $('#element').on('scroll touchmove mousewheel', function(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
    });
});

