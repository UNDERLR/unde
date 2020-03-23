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
let cm = {
    cmd:'/replaceitem',
    ty:'entity',
    ta:'',
    r:'',
    id:'',
    it:'',
    n:'',
    d:'',
    json:''
};
function mod(m) {
    if(m==='entity'){
        cm.ty = 'entity';
        $('.m').html("<h1><i class='fad fa-meh-blank fa-fw c' ></i>目标</h1><label>/replaceitem的目标用选择器来表示,例<code>@a</code>,也可以用玩家名来表示来表示,例<code>UNDERLR</code></label><label>语法：</label><code>/replaceitem entity <目标></code><label>你可以在下面填入选择器或玩家名</label><br /><label><i class='fad fa-meh-blank fa-fw c' ></i>目标</label><input class='tar' type='text' /><div><i class='fad fa-check-square fa-fw'></i>没有任何问题</div>");
    }
    if(m==='block'){
        cm.ty = 'block';
        $('.m').html("<h1><i class='fad fa-map-marker fa-fw c' ></i>位置</h1><label>/replaceitem的方块用坐标来表示,例<code>1 2 3</code></label><label>语法：</label><code>/replaceitem block <位置></code><label>你可以在下面填入方块位置</label><br /><label><i class='fad fa-map-marker fa-fw c' ></i>位置</label><input class='pot' type='text' /><div><i class='fad fa-check-square fa-fw'></i>没有任何问题</div>");
    }
}
$(function () {
    $('.pot').keyup(function () {
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
        cm.tar = val;
    });
    $('.tar').keyup(function(){
    let val = this.value.replace(/\s/,'');
    let tars = [
        "x",
        "y",
        "z",
        "dx",
        "dy",
        "dz",
        "r",
        "rm",
        "rx",
        "rxm",
        "ry",
        "rym",
        "scores",
        "tag",
        "c",
        "l",
        "lm",
        "m",
        "name",
        "type"
        ];
    let tartip = [
        "x点",
        "y点",
        "z点",
        "dx-x轴长度",
        "dy-y轴长度",
        "dz-z轴长度",
        "r-最大范围",
        "rm-最小范围",
        "rx-最大水平旋转角度",
        "rxm-最小水平旋转角度",
        "ry-最大垂直旋转角度",
        "rym-最小垂直旋转角度",
        "scores-记分板",
        "tag-标签",
        "c-数量",
        "l-最大经验等级",
        "lm-最小经验等级",
        "m-模式",
        "name-名字",
        "type-生物类型"
        ];
    let target = [];
    for (let i=0;i<tars.length;i++) {
        let tar = val.substring(3,val.length);
        let t = tar.match(/([^,]+=[^,]+,?)*/g);
        target[i] = {label:val.match(/^@.{2}/) + t + tartip[i],value:val.match(/^@.{2}/) + t + tars[i] + '='};
    }
    if (/\[/.test(val) && /\]/.test(val) === false) {
        $(this).autocomplete({
            delay: 0,
            source: target,
            minLength: -1,
            position: { my: 'left bottom>', at: 'left top' }
        });
    }else{
        $(this).autocomplete({
            delay: 0,
            source: [{label:'@a-所有玩家',value:'@a'},{label:'@p-最近的玩家',value:'@p'},{label:'@r-随机玩家',value:'@r'},{label:'@s-自己',value:'@s'},{label:'@e-所有实体',value:'@e'}],
            minLength: -1,
            position: { my: 'left bottom', at: 'left top' }
        });
    }
    if (/^@/.test(val)) {
        if (/(x=[^\d.-]+|y=[^\d.-]+|z=[^\d.-]+|dx=[^\d.-]+|dy^=[^\d.-]+|dz=[^\d.-]+|r=[^\d.-]+|rm=[^\d.-]+|rx=[^\d.-]+|rxm=[^\d.-]+|ry=[^\d.-]+|rym=[^\d.-]+|l=[^\d.-]+|lm=[^\d.-]+|c=[^\d.-]+)/.test(val)) {
            let et = val.match(/(x=[^~\d.-]+|y=[^~\d.-]+|z=[^~\d.-]+|dx=[^\d.-]+|dy^=[^\d.-]+|dz=[^\d.-]+|r=[^\d.-]+|rm=[^\d.-]+|rx=[^\d.-]+|rxm=[^\d.-]+|ry=[^\d.-]+|rym=[^\d.-]+|l=[^\d.-]+|lm=[^\d.-]+|c=[^\d.-]+)/g);
            $('input:hover+div').html(`<i class='fad fa-times-square fa-fw'></i>错误:错误的"${et}"<pre>\n *= \n   ^此处应为数字或~</pre>`).css('border', '#ff6b81 1vw solid').css('color', '#ff4757');
        } else if (/^@(a|s|p|e|r)\[[^\]]*\]/g.test(val) === false && /\[/g.test(val)) {
            $('input:hover+div').html(`<i class='fad fa-times-square fa-fw'></i>错误:错误的"[",缺少"]"`).css('border', '#ff6b81 1vw solid').css('color', '#ff4757');
        } else if (/^@(a|s|p|e|r)\[[^\[{]*{[^\]}]*}[^\[{]*\]/g.test(val) === false && /{/g.test(val)) {
            $('input:hover+div').html(`<i class='fad fa-times-square fa-fw'></i>错误:错误的"{",缺少"}"`).css('border', '#ff6b81 1vw solid').css('color', '#ff4757');
        } else if (/^@[^asper]{1}/g.test(val)) {
            let et = val.match(/^@.*/g);
            $('input:hover+div').html(`<i class='fad fa-times-square fa-fw'></i>错误:错误的${et},没有${et}选择器`).css('border', '#ff6b81 1vw solid').css('color', '#ff4757');
        } else {
            $('input:hover+div').html('<i class="fad fa-check-square fa-fw"></i>没有任何问题').css('border', '').css('color', '');
        }
    }
    cm.ta = val;
});
    $('.type').keyup(function(){
        let val = this.value.replace(/\s/,'');
        $(this).autocomplete({
            delay: 0,
            source: [
                {label:'slot.armor-马铠',value:'slot.armor'},
                {label:'slot.armor.chest-护甲',value:'slot.armor.chest'},
                {label:'slot.armor.feet-靴子',value:'slot.armor.feet'},
                {label:'slot.armor.head-头盔',value:'slot.armor.head'},
                {label:'slot.armor.legs-腿甲',value:'slot.armor.legs'},
                {label:'slot.weapon.mainhand-主手',value:'weapon.mainhand'},
                {label:'slot.weapon.offhand-副手',value:'slot.weapon.offhand'},
                {label:'slot.chest-箱子',value:'slot.chest'},
                {label:'slot.enderchest-末影箱',value:'slot.enderchest'},
                {label:'slot.hotbar-快捷栏',value:'slot.hotbar'},
                {label:'slot.inventory-物品栏',value:'slot.inventory'},
                {label:'slot.saddle-鞍',value:'slot.saddle'}
                ],
            minLength: -1,
            position: { my: 'left bottom', at: 'left top' }
        });
        if (/^@/.test(val)) {
            if (/^@(asper)/g.test(val)) {
                let et = val.match(/^@.*/g);
                $('input:hover+div').html(`<i class='fad fa-times-square fa-fw'></i>错误:错误的${et}`).css('border', '#ff6b81 1vw solid').css('color', '#ff4757');
            } else {
                $('input:hover+div').html('<i class="fad fa-check-square fa-fw"></i>没有任何问题').css('border', '').css('color', '');
            }
        }
        cm.r = val;
    });
    $('.item').keyup(function () {
        this.value = this.value.replace(/[^a-z0-9_:\-]/g, '');
        let val = this.value;
        $(this).autocomplete({
            delay: 0,
            source: item_id,
            minLength: -1,
            position: { my: 'left bottom', at: 'left top' }
        });
        if (/[^a-z0-9_:\-]|^\d+/g.test(val)) {
            let et = val.match(/[^a-z0-9_:\-]|^\d+/g);
            $('input:hover+div').html(`<i class='fad fa-times-square fa-fw'></i>错误:错误的${et}`).css('border', '#ff6b81 1vw solid').css('color', '#ff4757');
        } else {
            $('input:hover+div').html('<i class="fad fa-check-square fa-fw"></i>没有任何问题').css('border', '').css('color', '');
        }
        cm.it = val;
    });
    $('.json').keyup(function () {
        //this.value = this.value.replace(/[^a-z0-9_:\-]/g, '');
        let val = this.value;
        $(this).autocomplete({
            delay: 0,
            source: [{label:'CanPlaceOn-可放置于..',value:'{"minecraft:can_place_on":{"blocks":[""]}}'},
                    {label:'CanDestroy-可破坏..',value:'{"minecraft:can_destroy":{"blocks":[""]}}'}
                    ],
            minLength: -1,
            position: { my: 'left bottom', at: 'left top' }
        });
        /*if (/[^a-z0-9_:\-]|^\d+/g.test(val)) {
            let et = val.match(/[^a-z0-9_:\-]|^\d+/g);
            $('input:hover+div').html(`<i class='fad fa-times-square fa-fw'></i>错误:错误的${et}`).css('border', '#ff6b81 1vw solid').css('color', '#ff4757');
        } else {
            $('input:hover+div').html('<i class="fad fa-check-square fa-fw"></i>没有任何问题').css('border', '').css('color', '');
        }*/
        cm.json = val;
    });
    /*$('.test').keyup(function () {
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
    });*/
    $('.open').click(function () {
        let s = ' ';
        let cmt = cm.cmd + s + cm.ty + s + cm.ta + s + cm.r + s + cm.id + s + cm.it;
        if(!cm.n==='')cmt=cmt+s+cm.n;
        if(!cm.d==='')cmt=cmt+s+cm.d;
        if(!cm.json==='')cmt=cmt+s+cm.json;
        $('#output').val(cmt);
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
    
