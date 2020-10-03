let func = "";

document.getElementById("canvas").addEventListener(
    "mousemove",
    (e) =>
        function (e) {
            console.log(e);
        }
);

function fun(t) {
    if (/x\^2/g.test(t)) {
        let n = t.replace(/-/g, "+-").split("+");
        if (/^-/.test(t)) n.shift();
        n[0] = n[0].replace("-x^2", "-1").replace(/^x\^2/, "1").replace(/x\^2/, "");
        n[1] = n[1].replace("x", "");

        n[1] = n[1] / (n[0] * 2);
        n[2] = (4 * n[0] * n[2] - Math.pow(n[1], 2)) / (4 * n[0]);
        func = n;
        a(2, func[0], func[1], func[2]);

        n[1] > 0 ? (n[1] = "+" + n[1]) : (n[1] = n[1]);
        n[2] > 0 ? (n[2] = "+" + n[2]) : (n[2] = n[2]);
        document.getElementById("dds").value = `${n[0]}(x+${n[1]})^2${n[2]}`;
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
        a(2, func[0], func[1], func[2]);
    } else {
    }
}
let a = (m, o, u, c) => {
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
        twice(func[0], func[1], func[2]);
    }

    function stopDrag() {
        localStorage.setItem("scalable_width", getScalableDivWidth());
        document.documentElement.removeEventListener("mousemove", onDrag);
        document.documentElement.removeEventListener("mouseup", stopDrag);
    }

    function getScalableDivWidth() {
        return parseInt(window.getComputedStyle(document.querySelector(".scalable")).width, 10);
    }

    let canvas = document.getElementById("canvas");
    let can = canvas.getContext("2d");

    canvas.height = window.outerHeight;
    canvas.width = window.outerWidth;

    // canvas.height = 600;
    // canvas.width = canvas.height;
    canvas.addEventListener(
        "mousemove",
        (e) =>
            function (e) {
                draw();
                console.log(e);
                let mouseX = e.clientX;
            }
    );

    function draw(w) {
        can.textAlign = "center";
        can.fillStyle = "white";
        can.fillRect(0, 0, 10000, 10000);
        can.fillStyle = "black";
        can.lineWidth = 1;
        //x轴
        for (let i = 0; i < canvas.width; i += 10) {
            can.lineWidth = a > 0 ? a * 5 : a * 5 * -1;
            can.strokeStyle = "lightgray";

            can.beginPath();
            can.moveTo(i, 0);
            can.lineTo(i, canvas.height);
            can.stroke();
        }
        //z轴
        for (let i = 0; i < canvas.height; i += 10) {
            can.lineWidth = a > 0 ? a * 5 : a * 5 * -1;
            can.strokeStyle = "lightgray";

            can.beginPath();
            can.moveTo(0, i);
            can.lineTo(canvas.width, i);
            can.stroke();
        }
        //x轴
        for (let i = 0; i < canvas.width; i += 50) {
            can.lineWidth = a > 0 ? a * 5 : a * 5 * -1;
            can.strokeStyle = "gray";

            can.beginPath();
            can.moveTo(i + 10, 0);
            can.lineTo(i + 10, canvas.height);
            can.stroke();

            can.font = "bolder 18px Times New Roman";
            if (i - canvas.width / 2 + 10 !== 0) can.fillText(i - canvas.width / 2 + 10, i + 10, canvas.height / 2 + 20);
        }
        //y轴
        for (let i = 0; i < canvas.height; i += 50) {
            can.lineWidth = a > 0 ? a * 5 : a * 5 * -1;

            can.beginPath();
            can.moveTo(0, i - 10);
            can.lineTo(canvas.width, i - 10);
            can.stroke();

            can.font = "bolder 18px Times New Roman";
            if (i - 10 - canvas.height / 2 !== 0) canvas.width / 2 - 60 > w ? can.fillText(canvas.height / 2 - i + 10, canvas.width / 2 + 20, i - 5) : can.fillText(canvas.height / 2 - i + 10, canvas.width - w - 40, i - 5);
        }
        can.fillStyle = "red";
        can.fillRect(0, canvas.height / 2, canvas.width - (20 + w), 2);

        can.lineWidth = 2; //arraw-x
        can.strokeStyle = "red";
        can.beginPath();
        can.moveTo(canvas.width - (20 + w) - 5, canvas.height / 2 - 5 + 1);
        can.lineTo(canvas.width - (20 + w), canvas.height / 2 + 1);
        can.lineTo(canvas.width - (20 + w) - 5, canvas.height / 2 + 5 + 1);
        can.stroke();

        can.fillStyle = "blue";
        can.fillRect(canvas.width / 2, 5, 2, canvas.height);

        can.lineWidth = 2; //arraw-y
        can.strokeStyle = "blue";
        can.beginPath();
        can.moveTo(canvas.width / 2 - 5 + 1, 10);
        can.lineTo(canvas.width / 2 + 1, 5);
        can.lineTo(canvas.width / 2 + 5 + 1, 10);
        can.stroke();
        can.fillStyle = "black";

        can.font = "italic bolder 30px Times New Roman";
        can.fillText("O", canvas.width / 2 + 20, canvas.height / 2 - 10);
        can.fillText("y", canvas.width / 2 + 20, canvas.height * 0.02);
        can.fillText("x", canvas.width * 0.98 - w, canvas.height / 2 - 10);
    }
    draw(document.getElementById("content").offsetWidth);

    if (m === 1) {
        once(o, u);
    } else twice(o, u, c);

    function once(a, k) {
        for (let x = 0; x < canvas.width; ) {
            let t = x - canvas.width / 2;
            can.lineWidth = a > 0 ? a * 0 : a * 0 * -1;
            can.strokeStyle = "red";

            can.beginPath();
            can.moveTo(x + k, t * a + canvas.height / 2);
            can.lineTo(x + 1 + k, t * a + canvas.height / 2);
            can.stroke();

            x++;
        }
        can.font = "italic bolder 30px Times New Roman";

        can.fillText(`y=${a}x${k >= 0 ? "+" + k : k}`, (canvas.height * 0.1 - k) / a >= 0 ? (canvas.height * 0.1 - k) / a : ((canvas.height * 0.1 - k) / a) * -1, canvas.height * 0.1);
    }
    function twice(a, k, h) {
        // a >= 0 ?:;
        let width = canvas.width / 2;
        let height = canvas.height / 2;
        can.beginPath();
        can.moveTo(canvas.width * -1 + width + k * -1, a * -1 * Math.pow(canvas.width * -1, 2) + height - h);
        can.strokeStyle = "blue";
        for (let x = canvas.width * -1; x < canvas.width; ) {
            if (!a > 0 && a < 1) {
                can.lineWidth = a > 0 ? a * 1 : a * 0 * -1;
            } else can.lineWidth = (10 / a) * a * 0.5;
            can.lineTo(x + 1 + width + k * -1, a * -1 * Math.pow(x + 1, 2) + height - h);

            x += canvas.width / 500;
        }
        can.stroke();
    }
};

$(document).ready(() => a());
