let cla = {
    bu: [1, 7, 8, 21, 22, 28, 29],
    jia: [14, 15],
};

function mod(m) {
    switch (m) {
        case "day":
            document.cookie = "mod=day; expires=Thu, 18 Dec 2040 12:00:00 GMT; path=/";
            document.documentElement.style.setProperty("--headerColor", "#99d893");
            document.documentElement.style.setProperty("--mainFontColor", "#000");
            document.documentElement.style.setProperty("--backGroundColor", "#fff");
            document.documentElement.style.setProperty("--isDisplay", 1);
            break;
        case "night":
            document.cookie = "mod=night; expires=Thu, 18 Dec 2040 12:00:00 GMT; path=/";
            document.documentElement.style.setProperty("--headerColor", "#555");
            document.documentElement.style.setProperty("--mainFontColor", "#fff");
            document.documentElement.style.setProperty("--backGroundColor", "rgba(34, 34, 34)");
            document.documentElement.style.setProperty("--isDisplay", 0);
            break;

        default:
            break;
    }
}

let a = function () {
    window.addEventListener("scroll", (e) => scr(e));

    function getMonthDays(year, month) {
        var thisDate = new Date(year, month, 0); //当天数为0 js自动处理为上一月的最后一天
        return thisDate.getDate();
    }

    function getMod(c) {
        c = `{"${c.replace(/=/g, '":"')}"}`;
        if (/;/.test(c)) c = c.replace(/;/g, '","');
        let o = JSON.parse(c);
        console.log(o);
        switch (o.mod) {
            case "day":
                document.querySelector("#day").checked = true;
                mod("day");
                break;
            case "night":
                document.querySelector("#night").checked = true;
                mod("night");
                break;

            default:
                mod("day");
                break;
        }
    }
    getMod(document.cookie);
    function scr(e) {
        // document.querySelector("img.bg").style.top = e.path[1].pageYOffset + "px";
        if (e.path[1].pageYOffset > window.innerHeight - window.innerHeight * 0.2) {
            document.querySelector("header").style.height = "5vh";
            document.querySelector("header").className = "";
        } else {
            document.querySelector("header").style.height = "8vh";
            document.querySelector("header").className = "top";
        }
    }
    document.querySelector("a[href='#dateList']").innerHTML = new Date().getDate();
    Array.from(document.querySelectorAll(".dateList")).forEach(function (e) {
        let firstDayInWeek = new Date().setDate(1);
        firstDayInWeek = new Date(firstDayInWeek).getDay();
        for (let b = 0; b < 5; b++) {
            let line = document.createElement("div");
            for (let i = 0; i < 7; i++) {
                if (i + 1 + 7 * b - firstDayInWeek + 1 <= 0) {
                    let day = document.createElement("div");
                    day.className = "block";
                    line.appendChild(day);
                } else {
                    let day = document.createElement("div");
                    if (i + 1 + 7 * b - firstDayInWeek + 1 === new Date().getDate()) day.style = "--dateListColor:#f8d86a";
                    if (i + 1 + 7 * b - firstDayInWeek + 1 <= getMonthDays(new Date().getFullYear(), new Date().getMonth() + 1)) day.innerHTML = i + 1 + 7 * b - firstDayInWeek + 1;
                    if (
                        cla.bu.find(function (t) {
                            return t === i + 1 + 7 * b - firstDayInWeek + 1;
                        })
                    ) {
                        day.className = "block bu";
                    } else if (
                        cla.jia.find(function (t) {
                            return t === i + 1 + 7 * b - firstDayInWeek + 1;
                        })
                    ) {
                        day.className = "block jia";
                    } else if (i + 1 + 7 * b - firstDayInWeek + 1 <= getMonthDays(new Date().getFullYear(), new Date().getMonth() + 1)) {
                        day.className = "block ke";
                    } else day.className = "block";
                    line.appendChild(day);
                }
            }
            e.appendChild(line);
        }
    });
};

a();
