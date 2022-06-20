function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$.ajax({
    type: "POST",
    url: '/champ/patch',
    data: JSON.stringify({ "name" : getParameterByName('name')}),
    dataType: 'JSON',
    contentType : 'application/json',
    success: function (data) {
        let list = '';

        for(let i = 0; i < data.length; i++) {

            list += `<div class="patch">
                        <div class="ver">
                            <h4 style="width: 10%">${data[i].version}</h4>
                            <div class="skill-imgbox" style="width: 5%">
                                <span><img class="img" src="../image/skill/${data[i].image}"/></span>
                            </div>
                            <div class="content" style="width: 85%">
                                <ul>
                                    <li>${data[i].content}</li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
        }

        $('#patch-history').append(list);
    },
})
