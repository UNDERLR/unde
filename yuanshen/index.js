let a = function () {
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
    document.documentElement.addEventListener(
        "mousedown",
        () =>
            function () {
                launchIntoFullscreen(document.documentElement);
            }
    );
};

a();

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
            out.push("五星" + ranA(["角色刻晴", "角色莫娜", "角色七七", "角色迪卢克", "角色琴", "武器阿莫斯之弓", "武器天空之翼", "武器四风原典", "武器天空之卷", "武器和璞鸢", "武器天空之脊", "武器狼的末路", "武器天空之傲"]));
        } else if (t % 10 === 0) {
            fo += 1;
            out.push("四星" + ranA(["角色辛焱", "角色砂糖", "角色迪奥娜", "角色重云", "角色诺艾尔", "角色班尼特", "角色菲谢尔", "角色凝光", "角色行秋", "角色北斗", "角色香菱", "角色安柏", "角色雷泽", "角色凯亚", "角色芭芭拉", "角色丽莎", "武器弓藏", "武器祭礼弓", "武器绝弦", "武器西风猎弓", "武器昭心", "武器祭礼残章", "武器流浪乐章", "武器西风秘典", "武器西风长枪", "武器匣里灭辰", "武器雨裁", "武器祭礼大剑", "武器钟剑", "武器西风大剑", "武器匣里龙吟", "武器祭礼剑", "武器笛剑", "武器西风剑"]));
        } else {
            let a = Math.random();
            if (a >= 0.994) {
                fi += 1;
                if (a >= 0.997) {
                    out.push("五星" + ranA(["角色刻晴", "角色莫娜", "角色七七", "角色迪卢克", "角色琴"]));
                } else if (a <= 0.997 && a >= 0.994) {
                    out.push("五星" + ranA(["武器阿莫斯之弓", "武器天空之翼", "武器四风原典", "武器天空之卷", "武器和璞鸢", "武器天空之脊", "武器狼的末路", "武器天空之傲"]));
                }
            } else if (a <= 0.994 && a >= 0.943) {
                fo += 1;
                if (a >= 0.9685) {
                    out.push("四星" + ranA(["角色辛焱", "角色砂糖", "角色迪奥娜", "角色重云", "角色诺艾尔", "角色班尼特", "角色菲谢尔", "角色凝光", "角色行秋", "角色北斗", "角色香菱", "角色安柏", "角色雷泽", "角色凯亚", "角色芭芭拉", "角色丽莎"]));
                } else if (a <= 0.9685 && a >= 0.943) {
                    out.push("四星" + ranA(["武器弓藏", "武器祭礼弓", "武器绝弦", "武器西风猎弓", "武器昭心", "武器祭礼残章", "武器流浪乐章", "武器西风秘典", "武器西风长枪", "武器匣里灭辰", "武器雨裁", "武器祭礼大剑", "武器钟剑", "武器西风大剑", "武器匣里龙吟", "武器祭礼剑", "武器笛剑", "武器西风剑"]));
                }
            } else {
                out.push("三星" + ranA(["武器弹弓", "武器神射手之誓", "武器鸦羽弓", "武器翡玉法球", "武器讨龙英杰谭", "武器魔导绪论", "武器黑缨枪", "武器以理服人", "武器沐浴龙血的剑", "武器铁影阔剑", "武器飞天御剑", "武器黎明神剑", "武器冷刃"]));
            }
        }
        t += 1;
    }
    console.log(`5:${fi / t}`);
    console.log(`4:${fo / t}`);

    return out;
}

function display(a) {
    let vBox = document.querySelector(".video");
    let video = document.querySelector(".video>video");
    vBox.style.display = "block";
    video.style.display = "block";

    function end() {
        video.style.display = "none";
        console.log("播放结束");
    }

    for (let i = 0; i < a.length; i++) {
        const t = a[i];
        let div = document.createElement("div");
        div.innerHTML = t;

        document.querySelector(".video>.res").appendChild(div);
    }

    setTimeout(`document.querySelector(".video>video").play()`, 1000);
    video.addEventListener("ended", () => end());
}

function wish(times, type) {
    switch (type) {
        case 3:
            let res = ran(times);
            display(res);
            console.log(res);
            break;

        default:
            break;
    }
}
