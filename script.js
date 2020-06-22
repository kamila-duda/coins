let pig = document.querySelector(".pig");
let startGame = false;
const easyButton = document.querySelector(".game__easyButton");
const mediumButton = document.querySelector(".game__mediumButton");
const hardButton = document.querySelector(".game__hardButton");
let coinsContainer = document.getElementById("coins__container");
let message = "";
let gameInfo = document.querySelector(".gameInfo");
let command = document.querySelector(".game__command");
let bubble = document.querySelector(".pig__bubble");
let image = coinsContainer.querySelectorAll("img");
const checkButton = document.querySelector(".game__checkButton");
const amountContainer = document.querySelector(".game__amount");
const promptButton = document.querySelector(".pig__promptButton");
let easyTile = document.querySelectorAll(".easy");
let mediumTile = document.querySelectorAll(".medium");
let hardTile = document.querySelectorAll(".hard");
let pigArray = [];
const pigGoodText = ["Brawo!", "Super :)", "Znakomicie!", "Tak trzymaj!", "Dla Ciebie to pestka :)"];
let x = 40;
let y = 1;
for (let i = 0; i < image.length; i++) {//tworzenie id monet
    image[i].id = i;
    image[i].setAttribute("dragaable", "true");
};
window.addEventListener("resize",function(){
    window.location.reload();
});
function drawTheAmount(x, y) {
    let number = Math.floor((Math.random() * (x)) + 1) / y;
    amountContainer.innerHTML = number.toFixed(2) + " zł";
    message.innerText = "";
    setTimeout(function () {
        promptButton.style.display = "unset";
    }, 15000);
};
function round(n, k) {
    let factor = Math.pow(10, k);
    return Math.round(n * factor) / factor;
};
//sprawdzam czy ekran jest dotykowy
if (window.matchMedia("(pointer: coarse)").matches) {
    if (window.matchMedia('(max-device-width: 600px)').matches) {
        pig.insertAdjacentElement("afterend", document.querySelector(".game__level"));
        amountContainer.insertAdjacentElement("afterend", checkButton);
    };

    let money = document.querySelectorAll(".coin");
    money.forEach(function (oneCoin) {
        oneCoin.addEventListener("touchstart", function (ev) {
            if (ev.cancelable) {
                ev.preventDefault();
                oneCoin.style.position = "fixed";
                oneCoin.style.width = "9vw";
                oneCoin.style.height = "9vw";
                pig.classList.add("shadow");
                pig.style.borderStyle = "dotted";
                pig.classList.add("alternativeText");
            }
        });
        oneCoin.addEventListener("touchcancel", function (ev) { alert(ev); }, false);
    });
    money.forEach(function (oneCoin) {
        oneCoin.addEventListener("touchmove", function (ev) {
            ev.preventDefault();
            let moveCoin = document.getElementById(ev.targetTouches[0].target.id);
            let path = ev.targetTouches[0];
            moveCoin.style.left = path.clientX + "px";
            moveCoin.style.top = path.clientY + "px";
            if (ev.originalEvent !== undefined && _.touchObject.swipeLength > 4 && ev.cancelable) { ev.preventDefault(); }
        });
    });
    let pigPosition = pig.getBoundingClientRect();
    let xStart = pigPosition.left;
    let yStart = pigPosition.top;
    let xEnd = pigPosition.width + xStart;
    let yEnd = pigPosition.height + yStart;
    money.forEach(function (oneCoin) {
        oneCoin.addEventListener("touchend", function (ev) {
            let targetPosition = ev.target.getBoundingClientRect();
            //ev.target to pozycja monety, a te drugie to diva pig
            if ((targetPosition.left > xStart) && (targetPosition.left < xEnd) && (targetPosition.top > yStart) && (targetPosition.top < yEnd)) {
                let howManyChild = pig.childElementCount;
                if (howManyChild < 18) {
                    oneCoin.classList.add("inPig");
                    oneCoin.style.position = "relative";
                    oneCoin.style.left = "unset";
                    oneCoin.style.top = "unset";
                    oneCoin.style.width = "5vw";
                    oneCoin.style.height = "5vw";
                    pig.appendChild(oneCoin);
                } else {
                    message = "Mam pełny brzuszek. Użyj mniej monet";
                    bubble.innerText = message;
                    bubble.classList.add("animation");
                    oneCoin.style.left = "unset";
                    oneCoin.style.top = "unset";
                };
            }
            return true;
        });
    });

    checkButton.addEventListener("click", function () {
        if (startGame) {
            let suma = 0;
            let moneyInPig = document.querySelectorAll(".inPig");
            moneyInPig.forEach(function (inPig) {
                let moneyPosition = inPig.getBoundingClientRect();

                if ((moneyPosition.left > xStart) && (moneyPosition.left < xEnd) && (moneyPosition.top > yStart) && (moneyPosition.top < yEnd)) {
                    pigArray.push(inPig.getAttribute("value"));
                }
            })
            for (let i = 0; i < pigArray.length; i++) {
                suma += parseFloat(pigArray[i]);
            };
            bubble.classList.remove("animation")
            bubble.offsetHeight;
            if (round(suma, 2) == parseFloat(amountContainer.innerHTML)) {
                let text = Math.floor(Math.random() * (pigGoodText.length));
                message = pigGoodText[text];
                bubble.innerText = message;
                bubble.classList.add("animation");
                promptButton.style.display = "none";
                setTimeout(function () {
                    drawTheAmount(x, y);
                    pigArray = [];
                    image.forEach(function (img) {
                        img.style.left = "unset";
                        img.style.top = "unset";
                        img.style.width = "9vw";
                        img.style.height = "9vw";
                        let imgValue = img.getAttribute('value');
                        let target = "";
                        if (imgValue == 0.01) {
                            target = document.querySelector(".js-1gr");
                        } else if (imgValue == 0.02) {
                            target = document.querySelector(".js-2gr");
                        } else if (imgValue == 0.05) {
                            target = document.querySelector(".js-5gr");
                        } else if (imgValue == 0.1) {
                            target = document.querySelector(".js-10gr");
                        } else if (imgValue == 0.2) {
                            target = document.querySelector(".js-20gr");
                        } else if (imgValue == 0.5) {
                            target = document.querySelector(".js-50gr");
                        } else if (imgValue == 1) {
                            target = document.querySelector(".js-1zl");
                        } else if (imgValue == 2) {
                            target = document.querySelector(".js-2zl");
                        } else if (imgValue == 5) {
                            target = document.querySelector(".js-5zl");
                        };
                        img.style.position = "absolute";
                        target.appendChild(img);
                    });
                    message = "";
                }, 4000);
            } else {
                message = "Źle. Spróbuj jeszcze raz " + pigArray.join("+");
                pigArray = [];
                bubble.innerText = message;
                bubble.classList.add("animation");
            };
        };
    });
} else {
    function drop(ev) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("money");
        ev.target.appendChild(document.getElementById(data));
    };

    pig.addEventListener("dragover", function (ev) {
        ev.preventDefault();
        pig.classList.add("shadow");
    });
    pig.addEventListener("dragleave", function () {
        pig.classList.remove("shadow");
    });
    pig.addEventListener("drop", function (ev) {
        if (startGame) {
            pig.classList.remove("shadow");
            pig.classList.add("shadow2");
            let data = ev.dataTransfer.getData("money");//transferowana moneta
            let imgs = document.getElementById(data);//uchwyt do monety
            let imgValue = imgs.getAttribute('value');//pobieramy ustawione value
            let howManyChild = this.childElementCount;
            if (window.matchMedia('(min-width: 995px)').matches) {
                if (howManyChild < 18) {
                    imgs.style.position = "relative";
                    this.appendChild(document.getElementById(data));
                    pigArray.push(imgValue);
                    imgs.style.width = "3vw";
                    imgs.style.height = "3vw";
                } else {
                    message = "Mam pełny brzuszek. Użyj mniej monet";
                    bubble.innerText = message;
                    bubble.classList.add("animation");
                };
            } else if (window.matchMedia('(min-width: 600px) and (max-width: 994px)').matches) {
                if (howManyChild < 14) {
                    imgs.style.position = "relative";
                    this.appendChild(document.getElementById(data));
                    pigArray.push(imgValue);
                    imgs.style.width = "3vw";
                    imgs.style.height = "3vw";
                } else {
                    message = "Mam pełny brzuszek. Użyj mniej monet";
                    bubble.innerText = message;
                    bubble.classList.add("animation");
                };
            };
        };
    });
    pig.addEventListener("dragstart", function (ev) {
        pig.classList.add("shadow");
        let data = ev.dataTransfer.getData("money");//transferowana moneta
        let imgs = document.getElementById(data);//uchwyt do monety
        imgs.style.width = "4vw";
        imgs.style.height = "4vw";
        imgs.style.position = "absolute";
        let imgValue = imgs.getAttribute('value');//pobieramy ustawione value
        if (pigArray.indexOf(imgValue) > -1) {//sprawdzamy czy wartość znajduje się w tablicy
            pigArray.splice(pigArray.indexOf(imgValue), 1);//usuwamy wartość z tablicy
        };
    });
    coinsContainer.addEventListener("dragover", function (ev) {
        ev.preventDefault();
    });

    coinsContainer.addEventListener("drop", function (ev) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("money");
        let imgs = document.getElementById(data);//uchwyt do monety
        let imgValue = imgs.getAttribute('value');//pobieramy ustawione value
        imgs.style.position = "fixed";
        let target = "";
        if (imgValue == 0.01) {
            target = document.querySelector(".js-1gr");
        } else if (imgValue == 0.02) {
            target = document.querySelector(".js-2gr");
        } else if (imgValue == 0.05) {
            target = document.querySelector(".js-5gr");
        } else if (imgValue == 0.1) {
            target = document.querySelector(".js-10gr");
        } else if (imgValue == 0.2) {
            target = document.querySelector(".js-20gr");
        } else if (imgValue == 0.5) {
            target = document.querySelector(".js-50gr");
        } else if (imgValue == 1) {
            target = document.querySelector(".js-1zl");
        } else if (imgValue == 2) {
            target = document.querySelector(".js-2zl");
        } else if (imgValue == 5) {
            target = document.querySelector(".js-5zl");
        };
        target.appendChild(document.getElementById(data));
    });
    image.forEach(function (img) {
        img.addEventListener("dragstart", function (ev) {
            ev.dataTransfer.setData("money", ev.target.id);
        });
    });

    checkButton.addEventListener("click", function () {
        if (startGame) {
            let suma = 0;
            for (let i = 0; i < pigArray.length; i++) {
                suma += parseFloat(pigArray[i]);
            };
            bubble.classList.remove("animation")
            bubble.offsetHeight;
            if (round(suma, 2) == parseFloat(amountContainer.innerHTML)) {
                let text = Math.floor(Math.random() * (pigGoodText.length));
                message = pigGoodText[text];
                bubble.innerText = message;
                bubble.classList.add("animation");
                promptButton.style.display = "none";
                setTimeout(function () {
                    drawTheAmount(x, y);
                    pigArray = [];
                    image.forEach(function (img) {
                        let imgValue = img.getAttribute('value');
                        let target = "";
                        if (imgValue == 0.01) {
                            target = document.querySelector(".js-1gr");
                        } else if (imgValue == 0.02) {
                            target = document.querySelector(".js-2gr");
                        } else if (imgValue == 0.05) {
                            target = document.querySelector(".js-5gr");
                        } else if (imgValue == 0.1) {
                            target = document.querySelector(".js-10gr");
                        } else if (imgValue == 0.2) {
                            target = document.querySelector(".js-20gr");
                        } else if (imgValue == 0.5) {
                            target = document.querySelector(".js-50gr");
                        } else if (imgValue == 1) {
                            target = document.querySelector(".js-1zl");
                        } else if (imgValue == 2) {
                            target = document.querySelector(".js-2zl");
                        } else if (imgValue == 5) {
                            target = document.querySelector(".js-5zl");
                        };
                        img.style.position = "absolute";
                        target.appendChild(img);
                    });
                    message = "";
                }, 4000);
            } else {
                message = "Źle. Spróbuj jeszcze raz " + pigArray.join("+");
                bubble.innerText = message;
                bubble.classList.add("animation");
            };
        };
    });
}

promptButton.addEventListener("click", () => {
    let amount = parseFloat(document.querySelector(".game__amount").innerHTML);
    let promptArray = [];
    let posibbleMoney = [5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
    let remain = amount;
    bubble.classList.remove("animation");
    bubble.offsetHeight;
    for (i = 0; i < posibbleMoney.length; i++) {
        let coin = posibbleMoney[i];

        while ((round(remain, 2) - coin) >= 0) {
            promptArray.push(coin);
            remain = remain - coin;
        };
    }
    let answer = "";
    for (i = 0; i < promptArray.length - 1; i++) {
        answer += promptArray[i];
        answer += " + "
    }
    answer += promptArray[promptArray.length - 1] + '= ' + amount;
    message = "Spróbuj: " + answer;
    bubble.innerText = message;
    bubble.classList.add("animation");
});

easyButton.addEventListener("click", function () {
    startGame = true;
    gameInfo.style.display = "none";
    command.style.opacity = "1";
    checkButton.style.opacity = "1";
    x = 40;
    y = 1;
    drawTheAmount(x, y);
    image.forEach(function (img) {
        img.style.left = "unset";
        img.style.top = "unset";
        img.style.position = "absolute";
    });
    easyTile.forEach(function (easyBlock) {
        easyBlock.classList.add("easy");
        easyBlock.offsetHeight;
        easyBlock.classList.remove("easy");
    });
    mediumTile.forEach(function (mediumBlock) {
        mediumBlock.offsetHeight;
        mediumBlock.classList.add("medium");
    });
    hardTile.forEach(function (hardBlock) {
        hardBlock.offsetHeight;
        hardBlock.classList.add("hard");
    });
});
mediumButton.addEventListener("click", function () {
    startGame = true;
    command.style.opacity = "1";
    gameInfo.style.display = "none";
    checkButton.style.opacity = "1";
    x = 200;
    y = 10;
    drawTheAmount(x, y);
    image.forEach(function (img) {
        img.style.left = "unset";
        img.style.top = "unset";
        img.style.position = "absolute";
    });
    easyTile.forEach(function (easyBlock) {
        easyBlock.classList.add("easy");
        easyBlock.offsetHeight;
        easyBlock.classList.remove("easy");
    });
    mediumTile.forEach(function (mediumBlock) {
        mediumBlock.classList.add("medium");
        mediumBlock.offsetHeight;
        mediumBlock.classList.remove("medium");
    });
    hardTile.forEach(function (hardBlock) {
        hardBlock.offsetHeight;
        hardBlock.classList.add("hard");
    });
});
hardButton.addEventListener("click", function () {
    startGame = true;
    gameInfo.style.display = "none";
    checkButton.style.opacity = "1";
    command.style.opacity = "1";
    x = 2000;
    y = 100;
    drawTheAmount(x, y);
    image.forEach(function (img) {
        img.style.left = "unset";
        img.style.top = "unset";
        img.style.position = "absolute";
    });
    easyTile.forEach(function (easyBlock) {
        easyBlock.classList.add("easy");
        easyBlock.offsetHeight;
        easyBlock.classList.remove("easy");
    });
    mediumTile.forEach(function (mediumBlock) {
        mediumBlock.classList.add("medium");
        mediumBlock.offsetHeight;
        mediumBlock.classList.remove("medium");
    });
    hardTile.forEach(function (hardBlock) {
        hardBlock.classList.remove("hard");
    });
});
