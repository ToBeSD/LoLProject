function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$.ajax({
    type: "POST",
    url: '/champ/community',
    data: JSON.stringify({ "champName" : getParameterByName('name')}),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';

        for(let i = 0; i < data.length; i++) {

            list += `  <div class ="board-list-container">
                            <div class = "board-list">
                                <a class = "board-item" href="/community/detail?bno=${data[i].bno}">
                                    <span class = "post-img">${data[i].champName}</span>
                                    <span class = "board-detail-box">
                                    <span class ="board-detail-title">${data[i].title}</span></span>
                                    <span class = "board-detail-writer">${data[i].nickName}</span>
                                    <span class = "board-detail-date">${data[i].writeDate}</span>
                                    <span class = "board-detail-count">${data[i].count}</span>
                                    <span class = "board-detail-recommand">${data[i].good}</span>
                                </a>
                            </div>
                        </div>`;
        }

        $('.community-container').append(list);
    },
})