    function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$.ajax({
    type: "POST",
        url: '/champ/basicskill',
        data: JSON.stringify({ "name" : getParameterByName('name') }),
        dataType: 'JSON',
        contentType : 'application/json',
        success: function (data) {
        let list = '';
        let skillInfo = '';
        for(let i = 1; i < 3; i++) {
            list += `<div class="skill-info-box" style="border-top: 1px solid rgba(126, 155, 255, .5);">
                        <div class="skill-info-name">
                            <span class="skill-kind" id="skill-p">${data[i].skillKey}</span>
                            <h5 class="skill-kor-name">${data[i].skillName}</h5>
                        </div>
                        <div class="skill-info">
                            <img src="../image/skill/${data[i].image}" style="display: block;"/>
                    
                            <p class="skill-text-style">${data[i].function}</p>
                    
                        </div>
                    </div>`;

            skillInfo += `<a href="#skill-${data[i].skillKey}" class="skill-detail-info">
                             <img class="champ-img" src="../image/skill/${data[i].image}"/>
                             <span class="champ-skill">${data[i].skillKey}</span>
                             <p class="skill-name">${data[i].skillName}</p>
                         </a>`;
        }

            list += `<div class="skill-info-box" style="border-top: 1px solid rgba(126, 155, 255, .5);">
                        <div class="skill-info-name">
                            <span class="skill-kind" id="skill-p">${data[4].skillKey}</span>
                            <h5 class="skill-kor-name">${data[4].skillName}</h5>
                        </div>
                        <div class="skill-info">
                            <img src="../image/skill/${data[4].image}" style="display: block;"/>
                    
                            <p class="skill-text-style">${data[4].function}</p>
                    
                        </div>
                    </div>`;

            skillInfo += `<a href="#skill-${data[4].skillKey}" class="skill-detail-info">
                             <img class="champ-img" src="../image/skill/${data[4].image}"/>
                             <span class="champ-skill">${data[4].skillKey}</span>
                             <p class="skill-name">${data[4].skillName}</p>
                         </a>`;

            list += `<div class="skill-info-box" style="border-top: 1px solid rgba(126, 155, 255, .5);">
                        <div class="skill-info-name">
                            <span class="skill-kind" id="skill-p">${data[0].skillKey}</span>
                            <h5 class="skill-kor-name">${data[0].skillName}</h5>
                        </div>
                        <div class="skill-info">
                            <img src="../image/skill/${data[0].image}" style="display: block;"/>
                    
                            <p class="skill-text-style">${data[0].function}</p>
                    
                        </div>
                    </div>`;

            skillInfo += `<a href="#skill-${data[0].skillKey}" class="skill-detail-info">
                             <img class="champ-img" src="../image/skill/${data[0].image}"/>
                             <span class="champ-skill">${data[0].skillKey}</span>
                             <p class="skill-name">${data[0].skillName}</p>
                         </a>`;

            list += `<div class="skill-info-box" style="border-top: 1px solid rgba(126, 155, 255, .5);">
                        <div class="skill-info-name">
                            <span class="skill-kind" id="skill-p">${data[3].skillKey}</span>
                            <h5 class="skill-kor-name">${data[3].skillName}</h5>
                        </div>
                        <div class="skill-info">
                            <img src="../image/skill/${data[3].image}" style="display: block;"/>
                    
                            <p class="skill-text-style">${data[3].function}</p>
                    
                        </div>
                    </div>`;

            skillInfo += `<a href="#skill-${data[3].skillKey}" class="skill-detail-info">
                             <img class="champ-img" src="../image/skill/${data[3].image}"/>
                             <span class="champ-skill">${data[3].skillKey}</span>
                             <p class="skill-name">${data[3].skillName}</p>
                         </a>`;

        $('#skill-info').append(skillInfo);
        $('.skill-container').append(list);
    },
})

$.ajax({
    type: "POST",
        url: '/champ/basicstat',
        data: JSON.stringify({ "name" : getParameterByName('name') }),
        dataType: 'JSON',
        contentType : 'application/json',
        success: function (data) {
        let list = '';
        for(let i = 0; i < data.length; i++) {
            list += `<div class = "stat-div">
                        <span class = "stat-name">${data[i].stat}</span>
                        <span class = "stat-basic">${data[i].statStart}</span>
                        <span class = "stat-final">${data[i].statFinal}</span>
                        <span class = "stat-rank">${data[i].statRank}</span>
                    </div>`;
        }
        $('.basic-stat-box').append(list);
    },
})

