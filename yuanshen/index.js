function launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function ranA(a) {
    return a[Math.floor(Math.random() * a.length)];
}

function ran(times) {
    let out = [];
    let t = 1;
    let fi = 0;
    let fo = 0;
    for (let i = 0; i < times; i++) {
        if (t % 90 === 0) {
            fi += 1;
            out.push(anA(["刻晴", "莫娜", "七七", "迪卢克", "琴", "阿莫斯之弓", "天空之翼", "四风原典", "天空之卷", "和璞鸢", "天空之脊", "狼的末路", "天空之傲"]));
        } else if (t % 10 === 0) {
            fo += 1;
            out.push(ranA(["辛焱", "砂糖", "迪奥娜", "重云", "诺艾尔", "班尼特", "菲谢尔", "凝光", "行秋", "北斗", "香菱", "安柏", "雷泽", "凯亚", "芭芭拉", "丽莎", "弓藏", "祭礼弓", "绝弦", "西风猎弓", "昭心", "祭礼残章", "流浪乐章", "西风秘典", "西风长枪", "匣里灭辰", "雨裁", "祭礼大剑", "钟剑", "西风大剑", "匣里龙吟", "祭礼剑", "笛剑", "西风剑"]));
        } else {
            let a = Math.random();
            if (a >= 0.994) {
                fi += 1;
                if (a >= 0.997) {
                    out.push(ranA(["刻晴", "莫娜", "七七", "迪卢克", "琴"]));
                } else if (a <= 0.997 && a >= 0.994) {
                    out.push(ranA(["阿莫斯之弓", "天空之翼", "四风原典", "天空之卷", "和璞鸢", "天空之脊", "狼的末路", "天空之傲"]));
                }
            } else if (a <= 0.994 && a >= 0.943) {
                fo += 1;
                if (a >= 0.9685) {
                    out.push(ranA(["辛焱", "砂糖", "迪奥娜", "重云", "诺艾尔", "班尼特", "菲谢尔", "凝光", "行秋", "北斗", "香菱", "安柏", "雷泽", "凯亚", "芭芭拉", "丽莎"]));
                } else if (a <= 0.9685 && a >= 0.943) {
                    out.push(ranA(["弓藏", "祭礼弓", "绝弦", "西风猎弓", "昭心", "祭礼残章", "流浪乐章", "西风秘典", "西风长枪", "匣里灭辰", "雨裁", "祭礼大剑", "钟剑", "西风大剑", "匣里龙吟", "祭礼剑", "笛剑", "西风剑"]));
                }
            } else {
                out.push(ranA(["弹弓", "神射手之誓", "鸦羽弓", "翡玉法球", "讨龙英杰谭", "魔导绪论", "黑缨枪", "以理服人", "沐浴龙血的剑", "铁影阔剑", "飞天御剑", "黎明神剑", "冷刃"]));
            }
        }
        t += 1;
    }
    console.log(`5:${fi / t}`);
    console.log(`4:${fo / t}`);

    return out;
}

function display(a, t) {
    let vBox = document.querySelector(".video");
    let video = document.querySelector(".video>video");
    vBox.style.display = "block";
    video.style.display = "block";

    let v = 3;
    let ty = "单";

    function end() {
        video.style.display = "none";
        console.log("播放结束");
    }

    for (let i = 0; i < a.length; i++) {
        const t = a[i];
        let div = document.createElement("div");
        let img = document.createElement("img");
        if (link["fi"][t]) {
            img.src = link["fi"][t];
            if (v < 5) v = 5;
        } else if (link["fo"][t]) {
            if (v < 4) v = 4;
            img.src = link["fo"][t];
        } else if (link["th"][t]) {
            img.src = link["th"][t];
        }

        div.innerHTML = t;
        div.appendChild(img);
        div.onclick = "this.parentNode.removeChild(this);";

        document.querySelector(".video>.res").appendChild(div);
    }
    switch (v) {
        case 5:
            v = "五星";
            break;
        case 4:
            v = "四星";
            break;

        default:
            v = "三星";
            break;
    }
    switch (t) {
        case 1:
            ty = "单";
            break;

        default:
            ty = "十";
            break;
    }

    console.log(`${v}-${ty}`);
    document.querySelector(".video>video").src = `./video/${v}-${ty}.mp4`;

    setTimeout(`document.querySelector(".video>video").play()`, 500);
    video.addEventListener("ended", () => end());
}

function wish(times, type) {
    switch (type) {
        case 3:
            let res = ran(times);
            display(res, times);
            console.log(res);
            break;

        default:
            break;
    }
}
