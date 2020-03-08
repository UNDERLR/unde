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
$(function () {
    $(document).autocomplete();
    $('.point').keyup(function () {
        this.value = this.value.replace(/^\s|\s{2}$|[^0-9~\-\.\s^]/g, '');
        let val = this.value;
        let points = val.split(' ');
        if (!points[0]) points[0] = '~';
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
    $('select.mod').change(function () {
        let num = this.selectedIndex;
        if (num === 0) {//destroy
            $('select.mod+label').html('用指定方块替换填充区域内所有方块（包括空气），原有方块视为被无附魔的钻石锹或镐采掘而掉落对应的实体形式');
            $('select.mod~code').html('/fill <填充范围> <方块id> [特殊值] destroy');
        }
        if (num === 1) {//hollow
            $('select.mod+label').html('仅用指定方块替换填充区域外层的方块。内部方块被替换为空气');
            $('select.mod~code').html('/fill <填充范围> <方块id> [特殊值] hollow');
        }
        if (num === 2) {//keep
            $('select.mod+label').html('仅用指定方块替换填充区域内的空气方块');
            $('select.mod~code').html('/fill <填充范围> <方块id> [特殊值] keep');
        }
        if (num === 3) {//outline
            $('select.mod+label').html('仅用指定方块替换填充区域外层的方块');
            $('select.mod~code').html('/fill <填充范围> <方块id> [特殊值] outline');
        }
        if (num === 4) {//replace
            $('select.mod+label').html('用指定方块替换填充区域内所有方块（包括空气），而不以实体形式掉落被替换的方块和方块内容物。可选地，不指定替换后方块的数据标签，而是指定方块ID和数据值，用于限制被替换的方块类型');
            $('select.mod~code').html('/fill <填充范围> <方块id> [特殊值] replace [替换方块名：方块] [替换方块数据：整数]');
            $('label.mod,label.mod~*').css('display', '');
        } else $('label.mod,label.mod~*').css('display', 'none');
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
    
