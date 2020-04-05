
$(function(){
    $(".search + div input:nth-child(1)").keyup(function(){
        let txt = $(".code").val();
        let sv = new RegExp(this.value,g);
        txt = txt.replace(sv,
        function(t){return(`<span style="background: #ced6e050">${t}</span>`)});
        $(".view").html("<pre>"+txt.replace(/\n/g,"<br/>")+"</pre>");
    });
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
        $(".length+div").html(this.value.length+"字符<br/>"+this.value.replace(/\n/g,"").length+"字符(不含换行)<br/>"+this.value.replace(/\n|\s/g,"").length+"字符(不含空格和换行)<br/>");
        
        let txt = "\n"+this.value;
        txt = txt.replace(/#.*/g,function(t){return(`<span style='color:gray'>${t}</span>`)});
        txt = txt.replace(/"[^"]*"?/g,function(t){return(`<span style="color:DarkSeaGreen">${t}</span>`)});
        //c-emmet
        txt = txt.replace(/h-c-/g,"cl-c 清空");
        txt = txt.replace(/h-c/g,function(t){return(`<span style="color:rgb(236,204,104)">${t}</span>`)});
        //
        
        txt = txt.replace(/(?<=@s\s?\[[^\[]*|@a\s?\[[^\[]*|@p\s?\[[^\[]*|@e\s?\[[^\[]*|@r\s?\[[^\[]*|@v\s?\[[^\[]*|@c\s?\[[^\[]*)[^,=\n]*?(?==)/g,
        function(t){return(`<span style="color:skyblue">${t}</span>`)});
        txt = txt.replace(/(@s|@a|@p|@e|@r|@v|@c)\b/g,
        function(t){return(`<span style="color:rgb(236, 204, 104)">${t}</span>`)});
        txt = txt.replace(/\n\//g,
        function(t){return(`<span style="background:rgb(255, 71, 87)">${t}</span>`)});
        //scoreboard 
        txt = txt.replace(/(?<=\nscoreboard\s+objectives\s+)(setdisplay|add|list|remove)\b/g,
        function(t){return(`<span style="color:skyblue">${t}</span>`)});
        
        txt = txt.replace(/(?<=\nscoreboard\s+players\s+)(add|set|list|remove|test|random|reset|operation)\b/g,
        function(t){return(`<span style="color:skyblue">${t}</span>`)});
        txt = txt.replace(/(?<=\nscoreboard)\s+(objectives|players)\b/g,
        function(t){return(`<span style="color:skyblue">${t}</span>`)});
        txt = txt.replace(/(\n)(\?\s|ability|advancement|agent|ban|ban-ip|banlist|bossbar|classroommode|clear|clone|closewebsocket|connect|data|datapack|debug|defaultgamemode|deop|difficulty|effect|enableencryption|enchant|execute|experience|fill|forceload|function|gamemode|gamerule|give|help|immutableworld|kick|kill|list|listd|locate|locatebiome|loot|me|mixer|mobevent|msg|op|pardon|particle|playsound|publish|querytarget|recipe|reload|remove|replaceitem|save|save-all|save-off|save-on|say|schedule|scoreboard|seed|setblock|setidletimeout|setmaxplayers|setworldspawn|spawnpoint|spreadplayers|stop|stopsound|summon|tag|team|teleport|teammsg|tell|tellraw|testfor|testforblock|testforblocks|tickingarea|time|title|toggledownfall|tp|transferserver|trigger|w|weather|whitelist|worldborder|worldbuilder|wsserver|xp)\b/g,
        function(t){return(`<span style='color:rgb(112, 161, 255);'>${t}</span>`)});
        
        
        txt = "<pre>"+txt.replace(/\n/,"")+"</pre>";
        
        $(".view").html(txt.replace(/\n/g,"<br/>"));
        
    });
    
});
