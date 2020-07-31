document.documentElement.addEventListener("keyup", (e) => input(e));
window.setInterval(() => input(), 1);

function input(e) {
    let val = document.querySelector(".input").innerHTML;
    highLight(val);
    document.querySelector("div.lines").innerHTML = "<div>1</div>";
    for (let i = 1; /<\/div>/.test(val); i++) {
        val = val.replace(/\/div>/, "\n");
        let lineBox = document.querySelector("div.lines");
        lineBox.innerHTML = lineBox.innerHTML + `<div>${i + 1}</div>`;
    }
}

function highLight(txt) {
    let pre = document.querySelector(".pre");
    txt = txt.replace(/#.{1,}/g, function (t) {
        return `<span class='zs'>${t}</span>`;
    });
    txt = txt.replace(/"[^"\n]{1,}"/g, function (t) {
        return `<span class='txt'>${t}</span>`;
    });
    txt = txt.replace(/(?<=\s)@(a|s|p|r|e)(?=\s|\[)/g, function (t) {
        return `<span class='at'>${t}</span>`;
    });
    txt = txt.replace(/(?<=\s|~)-?\d+(\.\d+)?/g, function (t) {
        return `<span class='num'>${t}</span>`;
    });

    txt = txt.replace(/(?<=\n|>)(\?|ability|advancement|alwaysday|attribute|agent|ban|ban-ip|banlist|bossbar|classroommode|clear|clone|closewebsocket|connect|data|datapack|debug|defaultgamemode|deop|difficulty|effect|enableencryption|enchant|execute|experience|fill|forceload|function|gamemode|gamerule|give|help|immutableworld|kick|kill|list|listd|locate|locatebiome|loot|me|mixer|mobevent|msg|op|pardon|particle|playsound|publish|querytarget|recipe|reload|remove|replaceitem|save|save-all|save-off|save-on|say|schedule|scoreboard|seed|setblock|setidletimeout|setmaxplayers|setworldspawn|spawnpoint|spreadplayers|stop|stopsound|summon|tag|team|teleport|teammsg|tell|tellraw|testfor|testforblock|testforblocks|tickingarea|time|title|toggledownfall|tp|transferserver|trigger|w|weather|whitelist|worldborder|worldbuilder|wsserver|xp)/g, function (t) {
        return `<span class='cmd'>${t.replace(/\//g, "")}</span>`;
    });
    txt = txt.replace(/(?<=\n|>)\/(\?|ability|advancement|alwaysday|attribute|agent|ban|ban-ip|banlist|bossbar|classroommode|clear|clone|closewebsocket|connect|data|datapack|debug|defaultgamemode|deop|difficulty|effect|enableencryption|enchant|execute|experience|fill|forceload|function|gamemode|gamerule|give|help|immutableworld|kick|kill|list|listd|locate|locatebiome|loot|me|mixer|mobevent|msg|op|pardon|particle|playsound|publish|querytarget|recipe|reload|remove|replaceitem|save|save-all|save-off|save-on|say|schedule|scoreboard|seed|setblock|setidletimeout|setmaxplayers|setworldspawn|spawnpoint|spreadplayers|stop|stopsound|summon|tag|team|teleport|teammsg|tell|tellraw|testfor|testforblock|testforblocks|tickingarea|time|title|toggledownfall|tp|transferserver|trigger|w|weather|whitelist|worldborder|worldbuilder|wsserver|xp)/g, function (t) {
        return `<span style='text-decoration: line-through red;color: red;'>/</span><span class='err'>${t.replace(/\//g, "")}</span>`;
    });
    pre.innerHTML = txt;
}
