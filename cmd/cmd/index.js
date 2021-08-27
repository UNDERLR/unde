let valueSplitArray;

document.getElementById("input").addEventListener("input", (e) => {
    let inputView = document.getElementById("inputView");
    let inputTip = document.getElementById("inputTip");
    let tipSpan = document.getElementById("span");
    let tipDisplayUl = document.querySelector("#tipDisplay>ul");
    let value = e.target.value;
    // console.log(e);
    let valueSplit = value.split(" ");
    valueSplitArray = () => {
        let arr = () => {
            return valueSplit.toString();
        };
        return arr();
    };
    inputView.innerHTML = `<pre>${value}</pre>`;

    // inputTip.innerHTML = value + "<span>asda</span>";

    for (let i = 0; i < valueSplit.length; i++) {
        tipDisplayUl.innerHTML = "";
        if (valueSplit.length === 1) {
            for (const Key in grammar) {
                let k = Key;
                if (/^\//.test(valueSplit[0])) k = "/" + k;
                tipSpan.innerHTML = "";
                let rxp = new RegExp(valueSplit[0], "g");
                if (rxp.test(k)) {
                    let li = document.createElement("li");
                    //是否可被自动完成
                    li.setAttribute("completable", true);

                    li.setAttribute("value", k);
                    li.innerHTML =
                        k.replace(rxp, (t) => {
                            if (k === t) {
                                inputView.innerHTML = `<span style="color: #AAAAAA">${k}</span>`;
                                document.querySelector(".autoOpenWiki>iframe").src = `https://wiki.biligame.com/mc/%E5%91%BD%E4%BB%A4/${valueSplit[0].replace("/", "")}`;
                            }
                            return `<span style="font-weight: lighter;color: hsl(0,0%,60%)">${t}</span>`;
                        }) +
                        " - " +
                        grammar[Key].text;
                    i++;

                    tipDisplayUl.append(li);
                }
            }
        } else {
            let cmd = valueSplit[0].replace("/", "");
            let gra = grammar[cmd]["grammar"];
            let gras = typeof gra !== "string" ? gra().split(" ") : gra.split(" ");
            gras.shift();
            let nowTip = gras[valueSplit.length - 2];

            if (/^<|>$/g.test(gras[valueSplit.length - 2])) nowTip = variate[nowTip.replace(/^<|>$/g, "")];
            if (/^\[|]$/g.test(gras[valueSplit.length - 2])) nowTip = nowTip.replace(/^\[|]$/g, "").split("|");

            let spanValue = "";
            for (let j = 0; j < valueSplit.length - 1; j++) {
                spanValue += valueSplit[j] + " ";
            }
            tipSpan.innerHTML = `<pre>${spanValue}</pre>`;

            if (typeof nowTip === "string") {
                console.log(nowTip);
                let k = nowTip;
                let li = document.createElement("li");
                //是否可被自动完成
                li.setAttribute("completable", false);

                li.setAttribute("value", k);
                li.innerHTML = nowTip;
                tipDisplayUl.append(li);
            } else if (Array.isArray(nowTip) === false) {
                for (let j in nowTip) {
                    let k = j;
                    let rxp = new RegExp(valueSplit[valueSplit.length - 1], "g");
                    if (rxp.test(k)) {
                        let li = document.createElement("li");
                        //是否可被自动完成
                        li.setAttribute("completable", true);

                        li.setAttribute("value", k);
                        li.innerHTML =
                            k.replace(rxp, (t) => {
                                return `<span style="font-weight: bolder;color: #AAAAAA">${t}</span>`;
                            }) + ` - ${nowTip[j]}`;
                        tipDisplayUl.append(li);
                    }
                }
            } else if (Array.isArray(nowTip) === true) {
                for (let x = 0; x < nowTip.length; x++) {
                    nowTip[x] = JSON.parse('{"' + nowTip[x].replace(/'/g, '"').replace(/:/g, '":') + "}");
                    for (let j in nowTip[x]) {
                        let k = j;
                        let rxp = new RegExp(valueSplit[valueSplit.length - 1], "g");
                        if (rxp.test(k)) {
                            let li = document.createElement("li");
                            //是否可被自动完成
                            li.setAttribute("completable", true);

                            li.setAttribute("value", k);
                            li.innerHTML =
                                k.replace(rxp, (t) => {
                                    return `<span style="font-weight: bolder;color: #AAAAAA">${t}</span>`;
                                }) + ` - ${nowTip[x][j]}`;
                            tipDisplayUl.append(li);
                        }
                    }
                }
            }
        }

        if (tipDisplayUl.childElementCount < 1) {
            tipDisplayUl.style.opacity = 0;
        } else tipDisplayUl.style.opacity = 1;

        tipDisplayUl.firstElementChild.classList.add("selected");
    }

    function view(t) {
        let v = "";
        let tip = t;

        if (valueSplit.length < 2) {
            v = e.target.value;
            tip = tip.replace("/", "");
        } else {
            for (let i = 0; i < valueSplit.length - 1; i++) {
                v += valueSplit[i] + " ";
            }
            let rxp = new RegExp("^" + valueSplit[valueSplit.length - 1]);
            tip = tip.replace(rxp, "");
        }
        // for (let i = 0; i < valueSplit[valueSplit.length - 1].length; i++) {
        //     if (t[i]!==valueSplit[valueSplit.length - 1][i]){
        //         tip="";
        //         return
        //     }else {
        //         tip = t.replace(valueSplit[valueSplit.length - 1], "")
        //         v+=valueSplit[valueSplit.length - 1];
        //     }
        //
        // }

        // inputView.innerHTML = `<span style="color: white;"><pre>${v}</pre></span>` + `<span style="color: hsl(0,0%,30%);">${tip}</span>`;
    }

    let selectedLi = document.getElementsByClassName("selected")[0];
    view(selectedLi.getAttribute("value"));
    document.body.onkeydown = (e) => {
        selectedLi = document.getElementsByClassName("selected")[0];
        switch (e.key) {
            case "ArrowDown":
                function down() {
                    if (selectedLi !== tipDisplayUl.lastElementChild) {
                        selectedLi.classList.remove("selected");
                        selectedLi.nextElementSibling.classList.add("selected");
                        view(selectedLi.nextElementSibling.getAttribute("value"));
                        tipDisplayUl.scrollTo(0, selectedLi.offsetTop - selectedLi.offsetHeight * 3);
                    } else {
                        selectedLi.classList.remove("selected");
                        tipDisplayUl.firstElementChild.classList.add("selected");
                        view(tipDisplayUl.firstElementChild.getAttribute("value"));
                        tipDisplayUl.scrollTo(0, tipDisplayUl.firstElementChild.offsetTop - tipDisplayUl.firstElementChild.offsetHeight * 2);
                    }
                }

                down();
                break;
            case "ArrowUp":
                function up() {
                    if (selectedLi !== tipDisplayUl.firstElementChild) {
                        selectedLi.classList.remove("selected");
                        selectedLi.previousElementSibling.classList.add("selected");
                        view(selectedLi.previousElementSibling.getAttribute("value"));
                        tipDisplayUl.scrollTo(0, selectedLi.offsetTop - selectedLi.offsetHeight * 5);
                        tipDisplayUl.scrollTo(0, selectedLi.offsetTop - selectedLi.offsetHeight * 5);
                    } else {
                        selectedLi.classList.remove("selected");
                        tipDisplayUl.lastElementChild.classList.add("selected");
                        view(tipDisplayUl.lastElementChild.getAttribute("value"));
                        tipDisplayUl.scrollTo(0, tipDisplayUl.lastElementChild.offsetTop - tipDisplayUl.lastElementChild.offsetHeight * 4);
                    }
                }

                up();
                break;
            case "Tab":
                if (selectedLi.getAttribute("completable") === "true") {
                    if (valueSplit.length < 2) {
                        document.querySelector(".autoOpenWiki>iframe").src = `https://wiki.biligame.com/mc/%E5%91%BD%E4%BB%A4/${selectedLi.getAttribute("value").replace("/", "")}`;
                        e.target.value = inputView.innerHTML = selectedLi.getAttribute("value");
                    } else {
                        let v = "";
                        for (let i = 0; i < valueSplit.length - 1; i++) {
                            v += valueSplit[i] + " ";
                        }
                        e.target.value = inputView.innerHTML = v + selectedLi.getAttribute("value");
                    }
                } else down();
                break;
        }
    };
});

document.getElementById("input").addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Tab") e.preventDefault();
});
