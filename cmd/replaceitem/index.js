function color(c,b) {
    $('.c').css('color',c);
    $('.block').css('border-top-color',c);
    $('input,select').css('outline-color',c);
    $('input[type="text"]+div').css('border-color',c);
    $('label code').css('color',c);
    $('label code').css('background',b);
    $('label,h1,p').css('color','#000');
    $('body').css('background','#fff');
}
function setting(key,val) {
    if(key==='fs')$('*').css('font-size',val);
    if(key==='c')$('label,h1,p').css('color',val);
    if(key==='tc'){
        $('label code,.c').css('color',val);
        $('input,select,button').css('outline',val);
        $('.block').css('border-top-color',val);
    }
    if(key==='tb')$('label code').css('background',val);
    if(key==='bb')$('body').css('background',val);
}
function mod(m) {
    if(m==='entity'){
        $('.m').html("<h1><i class='fad fa-meh-blank fa-fw c' ></i>目标</h1><label>/replaceitem的目标用选择器来表示,例<code>@a</code>,也可以用玩家名来表示来表示,例<code>UNDERLR</code></label><label>语法：</label><code>/replaceitem entity <目标></code><label>你可以在下面填入选择器或玩家名</label><br /><label><i class='fad fa-meh-blank fa-fw c' ></i>目标</label><input class='tar' type='text' /><div><i class='fad fa-check-square fa-fw'></i>没有任何问题</div>");
    }
    if(m==='block'){
        $('.m').html("<h1><i class='fad fa-map-marker fa-fw c' ></i>位置</h1><label>/replaceitem的方块用坐标来表示,例<code>1 2 3</code></label><label>语法：</label><code>/replaceitem block <位置></code><label>你可以在下面填入方块位置</label><br /><label><i class='fad fa-map-marker fa-fw c' ></i>位置</label><input class='pot' type='text' /><div><i class='fad fa-check-square fa-fw'></i>没有任何问题</div>");
    }
}
$(function () {
    $('.pot').keyup(function () {
        this.value = this.value.replace(/^\s|\s{2}$|[^0-9~\-\.\s^]/g, '');
        let val = this.value;
        let points = val.split(' ');
        if (!points[0]) points[0] = '~';pqapaap
        if (!points[1]) points[1] = '~';
        if (!points[2]) points[2] = '~';
        $(this).autocomplete({
            delay: 0,
            source: [
            `${points[0]} `,
            `${points[0]} ${points[1]} `,
            `${points[0]} ${points[1]} ${points[2]}`
            ],
            minLength: -1,
            position: { my: 'left bottom', at: 'left top' }
        });
        if (/(\d*\s*[~^]){4,}|\s+\d+[~^]/g.test(val)) {
            let et = val.match(/(\d*\s*[~^]){4,}|\s+\d+[~^]/g);
            $('input:hover+div').html(`<i class='fad fa-times-square fa-fw'></i>错误:错误的${et}`).css('border', '#ff6b81 1vw solid').css('color', '#ff4757');
        } else if (/(\d*[~^]){2,}|\d+~/g.test(val)) {
            let et = val.match(/(\d*\s*[~^]){2,}|\d+~/g);
            $('input:hover+div').html(`<i class='fad fa-exclamation-square fa-fw'></i>警告:语法不规范(${et})`).css('border', '#eccc68 .5vw solid').css('color', '#ffa502');
        } else {
            $('input:hover+div').html('<i class="fad fa-check-square fa-fw"></i>没有任何问题').css('border', '').css('color', '');
        }
    });
    $('.tar').keyup(function(){
        let val = this.value.replace(/\s/,'');
        $(this).autocomplete({
            delay: 0,
            source: [{label:'@a-所有玩家',value:'@a'},{label:'@p-最近的玩家',value:'@p'},{label:'@r-随机玩家',value:'@r'},{label:'@s-自己',value:'@s'},{label:'@e-所有实体',value:'@e'}],
            minLength: -1,
            position: { my: 'left bottom', at: 'left top' }
        });
        if (/^@/.test(val)) {
            if (/^@[^asper]/g.test(val)) {
                let et = val.match(/^@.*/g);
                $('input:hover+div').html(`<i class='fad fa-times-square fa-fw'></i>错误:错误的${et}`).css('border', '#ff6b81 1vw solid').css('color', '#ff4757');
            } else {
                $('input:hover+div').html('<i class="fad fa-check-square fa-fw"></i>没有任何问题').css('border', '').css('color', '');
            }
        }
    });
    $('.blocks').keyup(function () {
        this.value = this.value.replace(/[^a-z0-9_:\-]/g, '');
        let val = this.value;
        $(this).autocomplete({
            delay: 0,
            source: block_id,
            minLength: -1,
            position: { my: 'left bottom', at: 'left top' }
        });
        if (/[^a-z0-9_:\-]|^\d+/g.test(val)) {
            let et = val.match(/[^a-z0-9_:\-]|^\d+/g);
            $('input:hover+div').html(`<i class='fad fa-times-square fa-fw'></i>错误:错误的${et}`).css('border', '#ff6b81 1vw solid').css('color', '#ff4757');
        } else {
            $('input:hover+div').html('<i class="fad fa-check-square fa-fw"></i>没有任何问题').css('border', '').css('color', '');
        }
    });
    $('.test').keyup(function () {
        this.value = this.value.replace(/^\s|\s{2}$|[^/0-9a-z\d~\-\.\s^]/, '');
        let val = this.value;
        let cmd = val.split(' ');
        cmd[0] = '/fill';
        $(this).autocomplete({
            delay: 0,
            source: cmd,
            minLength: -1,
            position: { my: 'left bottom', at: 'left top' }
        });
    });
    $('.open').click(function () {
        let cmd = `/fill ${$('.point.a').val()} ${$('.point.b').val()} ${$('.blocks.a').val()} ${$('.data.a').val()}`;
        let a = document.getElementById('mod').selectedIndex;
        let b = document.getElementById('mod').options;
        if ($('select.mod').selectedIndex === 4) {
            cmd = `${cmd} replace ${$('.blocks.b').val()} ${$('.data.b').val()}`;
        } else {
            cmd = `${cmd} ${b[a].text}`;
        }
        $('#output').val(cmd);
    });
    $('button.open,button.close').click(function(){
        $('div.output').toggleClass('show');
    });
    $('button.copy').click(function () {
        document.getElementById('output').select();
        document.execCommand('copy');
        alert('复制成功');
    });
});
    