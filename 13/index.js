let cla = {
    bu: [24, 25, 31, 10, 11],
    jia: [1, 2, 3, 4, 17, 18],
};

let a = function () {
    
    window.addEventListener("scroll", (e) => scr(e));

    function getMonthDays(year, month) {
        var thisDate = new Date(year, month, 0); //当天数为0 js自动处理为上一月的最后一天
        return thisDate.getDate();
    }

    function scr(e) {
        if (e.path[1].pageYOffset > 50) {
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
