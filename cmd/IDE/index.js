$(function(){
    $(".code").keyup(function(){
        let val = "<pre>"+this.value+"</pre>";
        let lines = 0;
        $("header").html("<p>1</p>");
        if (val.search(/\n/) === -1) $("header").html("<p>1</p>");
        let v = val;
        while (v.search(/\n/) !== -1) {
            lines += 1;
            v = v.replace(/\n/,"<br/>");
            if (v.search(/\n/) === -1) {
                for (let i = 0;i<lines;i++) {
                    $("header").append(`<p>${i+2}</p>`);
                }
                $(".code").attr("rows",lines+1);
                
            }
        }
        $(".length").html(this.value.replace(/\n/g,"").length+"字");
        
        
        let txt = val;
        txt = txt.replace(/#.*/g,function(t){return(`<span style='color:gray'>${t}</span>`)});
        txt = txt.replace(/"[^"]*"?/g,function(t){return(`<span style="color:rgb(123,237,159)">${t}</span>`)});
        //c-emmet
        txt = txt.replace(/h-c-/g,"cl-c 清空");
        txt = txt.replace(/h-c/g,function(t){return(`<span style="color:rgb(236,204,104)">${t}</span>`)});
        
        
        txt = txt.replace(/(\n|<pre>)(\?\s|ability\b|advancement\b|agent\b|ban\b|ban-ip\b|banlist\b|bossbar\b|classroommode\b|clear\b|clone\b|closewebsocket\b|connect\b|data\b|datapack\b|debug\b|defaultgamemode\b|deop\b|difficulty\b|effect\b|enableencryption\b|enchant\b|execute\b|experience\b|fill\b|forceload\b|function\b|gamemode\b|gamerule\b|give\b|help\b|immutableworld\b|kick\b|kill\b|list\b|listd\b|locate\b|locatebiome\b|loot\b|me\b|mixer\b|mobevent\b|msg\b|op\b|pardon\b|particle\b|playsound\b|publish\b|querytarget\b|recipe\b|reload\b|remove\b|replaceitem\b|save\b|save-all\b|save-off\b|save-on\b|say\b|schedule\b|scoreboard\b|seed\b|setblock\b|setidletimeout\b|setmaxplayers\b|setworldspawn\b|spawnpoint\b|spreadplayers\b|stop\b|stopsound\b|summon\b|tag\b|team\b|teleport\b|teammsg\b|tell\b|tellraw\b|testfor\b|testforblock\b|testforblocks\b|tickingarea\b|time\b|title\b|toggledownfall\b|tp\b|transferserver\b|trigger\b|w\b|weather\b|whitelist\b|worldborder\b|worldbuilder\b|wsserver\b|xp\b)/g,function(t){return(`<span style='color:skyblue;'>${t}</span>`)});
        
        
        
        $(".view").html(txt.replace(/\n/g,"<br/>"));
        
    });
});
