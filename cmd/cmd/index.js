let block;
let player;
(function(){
    $('button').click(function(){
        let txt = $('input').val();
        exe(txt);
        $('input').val('');
    });
    player = {
        x: 0,
        y: 0,
        z: 0,
        armor: {
            head: 'none',
            cheat: 'none',
            leg: 'none',
            foot: 'none'
        },
        offer: 'none',
        
    };
    block = {};
}());
function exe(t) {
    let txt = t.replace(/^\/|\s.*/g,'');
    if (/(?<=blocks\.).+/.test(txt)){
        let bl = t.match(/(?<=blocks\.).+/);
        output(t,JSON.stringify(block[bl]));
        return;
    }
    switch(txt) {
        case 'clear':
            $('.output').html('');
            break;
        case 'blocks':
            output(t,JSON.stringify(block));
            break;
        case 'player':
            output(t,JSON.stringify(player));
            break;
        case 'reset':
            block = {};
            break;
        case 'tp':
            if (/tp(\s+-?\d+){3}/.test(t)) {
                let x = t.match(/(?<=tp(\s+-?\d+){0}\s+)-?\d+/g)*1;
                let y = t.match(/(?<=tp(\s+-?\d+){1}\s+)-?\d+/g)*1;
                let z = t.match(/(?<=tp(\s+-?\d+){2}\s+)-?\d+/g)*1;
                player.x = x;
                player.y = y;
                player.z = z;
                output(t,`已将玩家传送至 ${x} ${y} ${z}`);
            }
            break;
        case 'say':
            let o = function() {
                if (/\s/g.test(t)) {
                    return(t.match(/\s.*/));
                }else return(' error at "say<=" (is not has string)');                                                                                                            
            };
            output(t,o());
            break;
        case 'fill':
            let bs = function(){
                if (/fill(\s+-?\d+){6}\s+\S+/.test(t)) {
                    let p1 = {  
                        x : t.match(/(?<=\/?fill\s+(-?\d+\s+){0})-?\d+/g),
                        y : t.match(/(?<=\/?fill\s+(-?\d+\s+){1})-?\d+/g),
                        z : t.match(/(?<=\/?fill\s+(-?\d+\s+){2})-?\d+/g)
                    };
                    let p2 = {  
                        x : t.match(/(?<=\/?fill\s+(-?\d+\s+){3})-?\d+/g),
                        y : t.match(/(?<=\/?fill\s+(-?\d+\s+){4})-?\d+/g),
                        z : t.match(/(?<=\/?fill\s+(-?\d+\s+){5})-?\d+/g)
                    };
                    let id = t.match(/(?<=fill(\s+-?\d+){6}\s+)\S+/g);
                    let x,y,z;
                    p1.x > p2.x ? x = p1.x - p2.x: x = p2.x - p1.x;
                    p1.y > p2.y ? y = p1.y - p2.y: y = p2.y - p1.y;
                    p1.z > p2.z ? z = p1.z - p2.z: z = p2.z - p1.z;
                    let blocks = (x + 1)*(y + 1)*(z + 1);
                    if (blocks > 32768) {
                        return(`${p1.x},${p1.y},${p1.z} to ${p2.x},${p2.y},${p2.z} blocks(${blocks}) > 32767 (if you want to fill the blocks > 32768,please use "filln")`);
                    } else {
                        let mx,my,mz;
                        p1.x < p2.x ? mx = p1.x*1:mx = p2.x*1;
                        p1.y < p2.y ? my = p1.y*1:my = p2.y*1;
                        p1.z < p2.z ? mz = p1.z*1:mz = p2.z*1;
                        
                        for (let by = 0;by<=y;by++) {
                            for (let bx = 0;bx<=x;bx++) {
                                for (let bz = 0;bz<=z;bz++) {
                                    let b = {id:id,x:bx+mx,y:by+my,z:bz+mz};
                                    block[`b${bx+mx}-${by+my}-${bz+mz}`] = b;
                                }
                            }
                        }
                        return(`${blocks} blocks was been changed`);
                    }
                }else return('error');
            };
            output(t,bs());
            break;
        case 'filln':
            let bls = function(){
                if (/filln(\s+-?\d+){6}\s+\S+/.test(t)) {
                    let p1 = {  
                        x : t.match(/(?<=\/?filln\s+(-?\d+\s+){0})-?\d+/g),
                        y : t.match(/(?<=\/?filln\s+(-?\d+\s+){1})-?\d+/g),
                        z : t.match(/(?<=\/?filln\s+(-?\d+\s+){2})-?\d+/g)
                    };
                    let p2 = {  
                        x : t.match(/(?<=\/?filln\s+(-?\d+\s+){3})-?\d+/g),
                        y : t.match(/(?<=\/?filln\s+(-?\d+\s+){4})-?\d+/g),
                        z : t.match(/(?<=\/?filln\s+(-?\d+\s+){5})-?\d+/g)
                    };
                    let id = t.match(/(?<=fill(\s+-?\d+){6}\s+)\S+/g);
                    let x,y,z;
                    p1.x > p2.x ? x = p1.x - p2.x: x = p2.x - p1.x;
                    p1.y > p2.y ? y = p1.y - p2.y: y = p2.y - p1.y;
                    p1.z > p2.z ? z = p1.z - p2.z: z = p2.z - p1.z;
                    let blocks = (x + 1)*(y + 1)*(z + 1);
                    
                    let mx,my,mz;
                    p1.x < p2.x ? mx = p1.x*1:mx = p2.x*1;
                    p1.y < p2.y ? my = p1.y*1:my = p2.y*1;
                    p1.z < p2.z ? mz = p1.z*1:mz = p2.z*1;
                        
                    for (let by = 0;by<=y;by++) {
                        for (let bx = 0;bx<=x;bx++) {
                            for (let bz = 0;bz<=z;bz++) {
                                let b = {id:id,x:bx+mx,y:by+my,z:bz+mz};
                                block[`b${bx+mx}-${by+my}-${bz+mz}`] = b;
                            }
                        }
                    }
                    return(`${blocks} blocks was been changed`);
                }else return('error');
            };
            output(t,bls());
            break;
        default:
            output(t,t);
    }
}
function output(c,o) {
    $('.output').append(`<div class='re'>
                    <div class='in'>
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <span>${c}</span>
                    </div>
                    <div class='ou'>
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <span>${o}</span>
                    </div>
                </div>`);
}
