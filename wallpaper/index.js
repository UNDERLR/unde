let a = function () {
    let city = function () {
        let url = window.location.search;
        url = url.replace(/\?/, "");
        url = url.split("&");
        let c;
        for (let i = 0; i < url.length; i++) {
            const test = url[i];
            if (/^city/.test(test)) c = test.replace(/^city=/, "");
        }
        return c;
    };
    $.getJSON("https://www.tianqiapi.com/api/", `appid=23035354&appsecret=8YvlPNrz&version=v9&cityid=0&city=${city()}&ip=0&callback=0`, function (a) {
        console.log(a);
        $(".cityName").html(a.city);
        $(".cityCountry").html(a.country);
        let today = a.data[0];
        $(".temperature")
            .attr("title", "气温：" + today.hours[0].tem + "℃")
            .html(today.tem + "℃");

        // if (/转/g.test(today.hours[0].wea)) {
        //     let day = today.hours[0].wea_day_img;
        //     let night = today.wea_night_img;
        //     $(".weatherIcon")
        //         .attr("title", "天气" + today.hours[0].wea)
        //         .html(`<embed src="svg/day/${day}.svg" title="${today.wea_day}" type="image/svg+xml" />  <embed src="svg/gang.svg" type="image/svg+xml" />  <embed src="svg/night/${night}.svg" title="${today.wea_night}" type="image/svg+xml" />`);
        // } else
        if (today.hours[0].hours.match(/\d+/g) * 1 > 6 && today.hours[0].hours.match(/\d+/g) * 1 < 18) {
            $(".weatherIcon")
                .attr("title", "天气:" + today.hours[0].wea)
                .html(`<embed src="svg/day/${today.hours[0].wea_img}.svg" title="${today.hours[0].wea}" type="image/svg+xml" />`);
        } else
            $(".weatherIcon")
                .attr("title", "天气:" + today.hours[0].wea)
                .html(`<embed src="svg/night/${today.hours[0].wea_img}.svg" title="${today.hours[0].wea}" type="image/svg+xml" />`);
        $(".humidity")
            .html(`<embed src="svg/shidu.svg" title="${"相对湿度：" + today.humidity}" type="image/svg+xml" /><br> ` + today.humidity)
            .attr("title", "相对湿度：" + today.humidity);

        $(".sunrise")
            .html(`<embed src="svg/sunrise.svg" title="${"日出：" + today.sunrise}" type="image/svg+xml" /> <br>` + today.sunrise)
            .attr("title", "日出：" + today.sunrise);
        $(".sunset")
            .html(`<embed src="svg/sunset.svg" title="${"日落：" + today.sunset}" type="image/svg+xml" /> <br>` + today.sunset)
            .attr("title", "日落：" + today.sunset);

        let winSpeed = today.hours[0].win_speed.match(/\d+/);
        $(".wind").attr("title", `${today.hours[0].win} ${today.hours[0].win_speed}`).html(`<span class="windIcon"><embed src="svg/wind/wind-${winSpeed}.svg" type="image/svg+xml" /></span><br>${today.hours[0].win} ${today.hours[0].win_speed}`);
        switch (today.hours[0].win) {
            case "北风":
                $(".windIcon embed").attr("style", "transform: rotate(0deg);");
                break;
            case "东北风":
                $(".windIcon embed").attr("style", "transform: rotate(45deg);");
                break;
            case "东风":
                $(".windIcon embed").attr("style", "transform: rotate(90deg);");
                break;
            case "东南风":
                $(".windIcon embed").attr("style", "transform: rotate(135deg);");
                break;
            case "南风":
                $(".windIcon embed").attr("style", "transform: rotate(180deg);");
                break;
            case "西南风":
                $(".windIcon embed").attr("style", "transform: rotate(225deg);");
                break;
            case "西风":
                $(".windIcon embed").attr("style", "transform: rotate(270deg);");
                break;
            case "西北风":
                $(".windIcon embed").attr("style", "transform: rotate(315deg);");
                break;

            default:
                break;
        }
        $(".lastTime").html("最后更新于" + a.update_time);
    });
};

a();
window.setInterval(a(), 600000);

document.documentElement.addEventListener("mousemove", (e) => move(e));

function move(e) {
    let screenCenterW = window.screen.availWidth / 2;
    let screenCenterH = window.screen.availHeight / 2;
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    $(".bg").css("transform", `translate(${(mouseX - screenCenterW) * -0.01}px, ${(mouseY - screenCenterH) * -0.01}px) scale(1.01)`);
    // console.log(e)
}
function t() {
    let time = new Date();
    let hour = function () {
        if (time.getHours() < 10) {
            return "0" + time.getHours();
        } else return time.getHours();
    };
    let min = function () {
        if (time.getMinutes() < 10) {
            return "0" + time.getMinutes();
        } else return time.getMinutes();
    };
    let sec = function () {
        if (time.getSeconds() < 10) {
            return "0" + time.getSeconds();
        } else return time.getSeconds();
    };
    $(".time").html(`${hour()} : ${min()} : ${sec()}`);
    let year = function () {
        if (time.getFullYear() < 10) {
            return "0" + time.getFullYear();
        } else return time.getFullYear();
    };
    let mouth = function () {
        if (time.getMonth() + 1 < 10) {
            return "0" + (time.getMonth() + 1);
        } else return time.getMonth() + 1;
    };
    let day = function () {
        if (time.getDate() < 10) {
            return "0" + time.getDate();
        } else return time.getDate();
    };
    let week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    $(".day").html(`${year()}-${mouth()}-${day()}<br>${week[time.getDay()]}`);
}

function his() {
    $.get("https://api.muxiaoguo.cn/api/lishijr", function (a) {
        console.log(a);
    });
}
// function bing() {
//     $.getJSON("https://cn.bing.com/HPImageArchive.aspx", "format=js&cc=jp&idx=0&n=1", function (a) {
//         console.log(a.copyright);
//     });
// }
// bing();

window.setInterval(() => t(), 1000);
