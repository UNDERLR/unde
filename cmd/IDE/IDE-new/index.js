let re = 1;
document.documentElement.addEventListener("keyup", (e) => input(e));
window.setInterval(() => input(), re);

function input(e) {
    let div = document.querySelectorAll(".input div");
    for (let i = 0; i < div.length; i++) {
        div[i].addEventListener("mouseover", (e) => over(e));
    }
    let val = document.querySelector(".input").innerHTML;
    highLight(val);
    document.querySelector("div.lines").innerHTML = "<div>1</div>";
    for (let i = 1; /<\/div>/.test(val); i++) {
        val = val.replace(/\/div>/, "\n");
        let lineBox = document.querySelector("div.lines");
        lineBox.innerHTML = lineBox.innerHTML + `<div>${i + 1}</div>`;
        if (i >= 50 && i <= 100) re = 50;
        if (i > 100 && i < 200) re = 100;
        if (i > 200) re = 200;
    }
}

function highLight(txt) {
    let pre = document.querySelector(".pre");
    pre.innerHTML = "";
    txt = txt.replace(/#[^\n<]*/g, function (t) {
        return `<span class='zs'>${t}</span>`; //注释
    });
    txt = txt.replace(/"[^"\n]{1,}"/g, function (t) {
        return `<span class='txt'>${t}</span>`; //字符串
    });
    txt = txt.replace(/(?<=\s|])@(a|s|p|r|e)(?=\s?)/g, function (t) {
        return `<span class='at'>${t}</span>`; //@
    });
    txt = txt.replace(/(?<=\[|,)(x|y|z|distance‌‌|r|rm‌‌|dx|dy|dz|scores|tag|team‌‌|limit|sort‌‌|c‌‌|level‌‌|l|lm‌‌|gamemode‌‌|m‌‌|name|x_rotation‌‌|rx|rxm‌‌|y_rotation‌‌|ry|rym‌‌|type|nbt‌‌|advancements‌‌|predicate‌‌)(?=\=)/g, function (t) {
        return `<span class='sel'>${t}</span>`; //选择器
    });
    txt = txt.replace(/(?<=\s)(\+|-|\*|%|\/)?=|(&gt;|&lt;|&gt;&lt;)|(?<=x|y|z|distance‌‌|r|rm‌‌|dx|dy|dz|scores|tag|team‌‌|limit|sort‌‌|c‌‌|level‌‌|l|lm‌‌|gamemode‌‌|m‌‌|name|x_rotation‌‌|rx|rxm‌‌|y_rotation‌‌|ry|rym‌‌|type|nbt‌‌|advancements‌‌|predicate‌‌)=/g, function (t) {
        return `<span class='fh'>${t}</span>`; //符号
    });
    txt = txt.replace(/(?<=\s|~|=)-?\d+(\.\d+)?/g, function (t) {
        return `<span class='num'>${t}</span>`; //数字
    });

    txt = txt.replace(/(?<=\n|>)(\?|ability|advancement|alwaysday|attribute|agent|ban|ban-ip|banlist|bossbar|classroommode|clear|clone|closewebsocket|connect|data|datapack|debug|defaultgamemode|deop|difficulty|effect|enableencryption|enchant|execute|experience|fill|forceload|function|gamemode|gamerule|give|help|immutableworld|kick|kill|list|listd|locate|locatebiome|loot|me|mixer|mobevent|msg|op|pardon|particle|playsound|publish|querytarget|recipe|reload|remove|replaceitem|save|save-all|save-off|save-on|say|schedule|scoreboard|seed|setblock|setidletimeout|setmaxplayers|setworldspawn|spawnpoint|spreadplayers|stop|stopsound|summon|tag|team|teleport|teammsg|tell|tellraw|testfor|testforblock|testforblocks|tickingarea|time|title|toggledownfall|tp|transferserver|trigger|w|weather|whitelist|worldborder|worldbuilder|wsserver|xp)/g, function (t) {
        return `<span class='cmd'>${t.replace(/\//g, "")}</span>`; //指令
    });
    txt = txt.replace(/(?<=\s)(players|objectives)/g, function (t) {
        return `<span class='mod'>${t.replace(/\//g, "")}</span>`; //指令
    });
    txt = txt.replace(/(?<=\n|>)\/(\?|ability|advancement|alwaysday|attribute|agent|ban|ban-ip|banlist|bossbar|classroommode|clear|clone|closewebsocket|connect|data|datapack|debug|defaultgamemode|deop|difficulty|effect|enableencryption|enchant|execute|experience|fill|forceload|function|gamemode|gamerule|give|help|immutableworld|kick|kill|list|listd|locate|locatebiome|loot|me|mixer|mobevent|msg|op|pardon|particle|playsound|publish|querytarget|recipe|reload|remove|replaceitem|save|save-all|save-off|save-on|say|schedule|scoreboard|seed|setblock|setidletimeout|setmaxplayers|setworldspawn|spawnpoint|spreadplayers|stop|stopsound|summon|tag|team|teleport|teammsg|tell|tellraw|testfor|testforblock|testforblocks|tickingarea|time|title|toggledownfall|tp|transferserver|trigger|w|weather|whitelist|worldborder|worldbuilder|wsserver|xp)/g, function (t) {
        return `<span style='text-decoration: line-through red;color: red;'>/</span><span class='err'>${t.replace(/\//g, "")}</span>`;
    }); //错误
    pre.innerHTML = txt;
}

function over(e) {
    let tip = document.querySelector(".tip");
    let mh = document.querySelector(".input>div:last-child").offsetTop;
    let l = e.path[0].offsetLeft;
    let t = e.path[0].offsetTop;
    let bh = e.path[0].offsetHeight;
    let doch = document.body.offsetHeight;
    tip.style.left = l + "px";
    if (tip.offsetHeight < doch - (t + tip.offsetHeight*1.5)) tip.style.top = t + bh + "px";
    if (tip.offsetHeight > doch - (t + tip.offsetHeight*1.5)) tip.style.top = t - tip.offsetHeight + "px";
}
