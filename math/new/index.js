//变量
let Axis = {
    Margin: 20, //坐标轴边距
    Width: 2, //坐标轴宽度
    FontSize: 18, //坐标轴字体大小
    FontColor: {
        X: "black", //x字体颜色
        Y: "black", //y轴字体颜色
    },
    Color: {
        X: "red", //x轴颜色
        Y: "blue", //y轴颜色
    },
};
let Win = {
    translate: {
        X: 0,
        Y: 0,
    },
    Scale: 1,
};

function fun(t) {
    if (/x\^2/g.test(t)) {
        let n = t.replace(/-/g, "+-").split("+");
        if (/^-/.test(t)) n.shift();
        n[0] = n[0].replace("-x^2", "-1").replace(/^x\^2/, "1").replace(/x\^2/, "");
        n[1] = n[1].replace("x", "");
        if (n[0] === undefined) n[0] = 0;
        if (n[1] === undefined) n[1] = 0;
        if (n[2] === undefined) n[2] = "";

        n[1] = n[1] / (n[0] * 2);
        n[2] = (4 * n[0] * n[2] - Math.pow(n[1], 2)) / (4 * n[0]);
        func = n;
        // a(2, func[0], func[1], func[2]);

        n[1] > 0 ? (n[1] = "+" + n[1]) : (n[1] = n[1]);
        n[2] > 0 ? (n[2] = "+" + n[2]) : (n[2] = n[2]);
        if (n[1] === 0) n[1] = "+" + n[1];

        document.getElementById("dds").value = `${n[0]}(x${n[1]})^2${n[2]}`;
    } else if (/\)\^2/g.test(t)) {
        let n = t
            .replace(/\(/g, "|")
            .replace(/(\)\^2)/g, "|")
            .split("|"); //

        if (n[0] === "") {
            n[0] = 1;
        } else if (n[0] === "-") n[0] = n[0].replace(/-/, "-1");
        n[1] = n[1].replace(/x\+?/, "");
        n[2] = n[2].replace(/\+/, "");

        func = n;
        // a(2, func[0], func[1], func[2]);
    } else {
    }
}

function canvas() {
    // 侧边栏
    var startX, startWidth;
    startWidth = localStorage.getItem("scalable_width") || getScalableDivWidth();

    document.querySelector(".scalable").style.width = startWidth + "px";

    document.querySelector(".separator").addEventListener("mousedown", startDrag);

    function startDrag(e) {
        startX = e.clientX;
        startWidth = getScalableDivWidth();

        document.documentElement.addEventListener("mousemove", onDrag);
        document.documentElement.addEventListener("mouseup", stopDrag);
    }

    function onDrag(e) {
        let newWidth = startWidth + e.clientX - startX;
        document.querySelector(".scalable").style.width = newWidth + "px";
        draw(document.getElementById("content").offsetWidth);
        // twice(func[0], func[1], func[2]);
    }

    function stopDrag() {
        localStorage.setItem("scalable_width", getScalableDivWidth());
        document.documentElement.removeEventListener("mousemove", onDrag);
        document.documentElement.removeEventListener("mouseup", stopDrag);
    }

    function getScalableDivWidth() {
        return parseInt(window.getComputedStyle(document.querySelector(".scalable")).width, 10);
    }

    // --------------------------------

    let canvas = document.getElementById("canvas");
    let can = canvas.getContext("2d");

    canvas.height = window.outerHeight;
    canvas.width = window.outerWidth;
    can.translate(window.outerWidth / 2 - Win.translate.X, window.outerHeight / 2 - Win.translate.Y);
    canvas.addEventListener("mousemove", function (e) {
        draw(document.getElementById("content").offsetWidth);
        let mouseX = e.clientX + Win.translate.X;
        let mouseY = e.clientY + Win.translate.Y;

        mouseX -= window.outerWidth / 2;
        mouseY -= window.outerHeight / 2;
        // mouseY *= -1;

        can.fillStyle = "gray";
        can.fillRect(mouseX + 7, mouseY + 7, 106, 36);
        can.fillStyle = "#dddddd";
        can.fillRect(mouseX + 10, mouseY + 10, 100, 30);

        can.fillStyle = "black";
        can.font = `bolder ${Axis.FontSize + 3 + "px"} Times New Roman`;
        can.textAlign = "center";
        can.fillText(`(${mouseX} , ${mouseY * -1})`, mouseX + 60, mouseY + 30);
        // console.log(mouseX);
        // console.log(mouseY);
    });

    function draw(a) {
        document.getElementById("scale").style.right = a + 20 + document.getElementsByClassName("separator").item(0).offsetWidth + "px";
        //初始化
        can.strokeStyle = "black";
        can.fillStyle = "#ffffff";
        can.fillRect(-10000 + Win.translate.X, -10000+ Win.translate.Y, 20000 + Win.translate.X, 20000 + Win.translate.Y);
        can.font = "bolder 24px Times New Roman";
        //坐标系

        //坐标轴数字 & 辅助线
        //x
        for (i = 0; i < window.outerWidth; ) {
            //次要
            //正半轴
            can.beginPath();
            can.lineWidth = "1";
            can.strokeStyle = "lightgray";
            can.moveTo(i, window.outerHeight * -1);
            can.lineTo(i, window.outerHeight);
            can.stroke();
            //负半轴
            can.beginPath();
            can.lineWidth = "1";
            can.strokeStyle = "lightgray";
            can.moveTo(-i, window.outerHeight * -1);
            can.lineTo(-i, window.outerHeight);
            can.stroke();

            i += 10;
        }
        //y
        for (i = 0; i < window.outerHeight; ) {
            //正半轴
            can.beginPath();
            can.lineWidth = "1";
            can.strokeStyle = "lightgray";
            can.moveTo(window.outerWidth * -1, i);
            can.lineTo(window.outerWidth, i);
            can.stroke();
            //负半轴
            can.beginPath();
            can.lineWidth = "1";
            can.strokeStyle = "lightgray";
            can.moveTo(window.outerWidth * -1, -i);
            can.lineTo(window.outerWidth, -i);
            can.stroke();
            i += 10;
        }
        //主要&数字

        //x
        for (i = 0; i < window.outerWidth; ) {
            if (i !== 0) {
                //主要
                //正半轴
                can.beginPath();
                can.lineWidth = "1";
                can.strokeStyle = "gray";
                can.moveTo(i, window.outerHeight * -1);
                can.lineTo(i, window.outerHeight);
                //数字
                can.stroke();
                can.fillStyle = Axis.FontColor.X;
                can.font = `bolder ${Axis.FontSize + "px"} Times New Roman`;
                can.textAlign = "center";
                can.fillText(i, i, 20);
                //负半轴
                can.beginPath();
                can.lineWidth = "1";
                can.strokeStyle = "gray";
                can.moveTo(-i, window.outerHeight * -1);
                can.lineTo(-i, window.outerHeight);
                can.stroke();
                //数字
                can.stroke();
                can.fillStyle = Axis.FontColor.X;
                can.font = `bolder ${Axis.FontSize + "px"} Times New Roman`;
                can.textAlign = "center";
                can.fillText(-i, -i, 20);
            }
            i += 50;
        }
        //y
        for (i = 0; i < window.outerHeight; ) {
            if ((i !== 0) & (window.outerWidth / 2 + Axis.Margin > a + Axis.Margin + document.getElementsByClassName("separator").item(0).offsetWidth)) {
                //正半轴
                can.beginPath();
                can.lineWidth = "1";
                can.strokeStyle = "gray";
                can.moveTo(window.outerWidth * -1, i);
                can.lineTo(window.outerWidth, i);
                can.stroke();
                //数字
                can.stroke();
                can.fillStyle = Axis.FontColor.Y;
                can.font = `bolder ${Axis.FontSize + "px"} Times New Roman`;
                can.textAlign = "center";
                can.fillText(-i, -20, i + 5);
                //负半轴
                can.beginPath();
                can.lineWidth = "1";
                can.strokeStyle = "gray";
                can.moveTo(window.outerWidth * -1, -i);
                can.lineTo(window.outerWidth, -i);
                can.stroke();
                //数字
                can.stroke();
                can.fillStyle = Axis.FontColor.Y;
                can.font = `bolder ${Axis.FontSize + "px"} Times New Roman`;
                can.textAlign = "center";
                can.fillText(i, -20, -i + 5);
            } else if ((i !== 0) & (window.outerWidth / 2 + Axis.Margin <= a + Axis.Margin + document.getElementsByClassName("separator").item(0).offsetWidth)) {
                //正半轴
                can.beginPath();
                can.lineWidth = "1";
                can.strokeStyle = "gray";
                can.moveTo(window.outerWidth * -1, i);
                can.lineTo(window.outerWidth, i);
                can.stroke();
                //数字
                can.stroke();
                can.fillStyle = Axis.FontColor.y;
                can.font = `bolder ${Axis.FontSize + "px"} Times New Roman`;
                can.textAlign = "center";
                can.fillText(-i, (a - window.outerWidth / 2) * -1 - Axis.Margin - document.getElementsByClassName("separator").item(0).offsetWidth, i + 5);
                //负半轴
                can.beginPath();
                can.lineWidth = "1";
                can.strokeStyle = "gray";
                can.moveTo(window.outerWidth * -1, -i);
                can.lineTo(window.outerWidth, -i);
                can.stroke();
                //数字
                can.stroke();
                can.fillStyle = Axis.FontColor.Y;
                can.font = `bolder ${Axis.FontSize + "px"} Times New Roman`;
                can.textAlign = "center";
                can.fillText(i, (a - window.outerWidth / 2) * -1 - Axis.Margin - document.getElementsByClassName("separator").item(0).offsetWidth, -i + 5);
            }
            i += 50;
        }

        //y=0
        can.beginPath();
        can.lineWidth = Axis.Width;
        can.strokeStyle = Axis.Color.X;
        can.moveTo(-1 * (window.outerWidth / 2), 0);
        can.lineTo(window.outerWidth / 2 - (a + Axis.Margin + document.getElementsByClassName("separator").item(0).offsetWidth), 0);
        can.stroke();

        //x=0
        can.beginPath();
        can.lineWidth = Axis.Width;
        can.strokeStyle = Axis.Color.Y;
        can.moveTo(0, (window.outerHeight / 2) * -1 + Axis.Margin);
        can.lineTo(0, window.outerHeight / 2);
        can.stroke();
        //坐标轴箭头
        //x-arraw
        can.beginPath();
        can.lineWidth = Axis.Width;
        can.strokeStyle = "red";
        can.moveTo(window.outerWidth / 2 - (a + Axis.Margin + document.getElementsByClassName("separator").item(0).offsetWidth) - 5, 5);
        can.lineTo(window.outerWidth / 2 - (a + Axis.Margin + document.getElementsByClassName("separator").item(0).offsetWidth), 0);
        can.lineTo(window.outerWidth / 2 - (a + Axis.Margin + document.getElementsByClassName("separator").item(0).offsetWidth) - 5, -5);
        can.stroke();

        //y-arraw
        can.beginPath();
        can.lineWidth = Axis.Width;
        can.strokeStyle = "blue";
        can.moveTo(-5, (window.outerHeight / 2) * -1 + Axis.Margin + 5);
        can.lineTo(0, (window.outerHeight / 2) * -1 + Axis.Margin);
        can.lineTo(5, (window.outerHeight / 2) * -1 + Axis.Margin + 5);
        can.stroke();

        //文字标识
        can.fillStyle = Axis.FontColor;
        can.font = "italic bolder 30px Times New Roman";
        can.textAlign = "center";
        can.fillText("O", 20, -10);
        can.fillText("x", window.outerWidth / 2 - (a + Axis.Margin + document.getElementsByClassName("separator").item(0).offsetWidth), -10);
        can.fillText("y", 20, (window.outerHeight / 2) * -1 + 10 + Axis.Margin);
    }
    draw(document.getElementById("content").offsetWidth);
}
canvas();
