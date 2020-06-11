let pig = document.querySelector(".pig");
let startGame = false;
const easyButton = document.querySelector(".easy__button");
const mediumButton = document.querySelector(".medium__button");
const hardButton = document.querySelector(".hard__button");
let coinsContainer = document.getElementById("coins__container");
let message = "";
let gameInfo = document.querySelector(".gameInfo");
let command = document.querySelector(".command");
let bubble = document.querySelector(".pig__bubble");
let image = coinsContainer.querySelectorAll("img");
const checkButton = document.querySelector(".check__button");
const amountContainer = document.querySelector(".amount__container");
const promptButton = document.querySelector(".prompt__button");
let easyTile = document.querySelectorAll(".easy");
let mediumTile = document.querySelectorAll(".medium");
let hardTile = document.querySelectorAll(".hard");
let pigArray = [];
const easyArray = ["3", "6", "7", "8", "9", "12", "13", "15", "16", "18", "25"];
const mediumArray = ["0.80", "1.20", "2.40", "3.50", "4.20", "5.50", "6.20", "7.70", "8.10", "11.60", "13.40", "15.80", "16.30", "18.90"];
const hardArray = ["0.23", "0.59", "1.19", "1.53", "2.21", "3.33", "4.19", "6.29", "8.11", "15.47", "16.55", "18.15"];
const pigGoodText = ["Brawo!", "Znakomicie!", "Tak trzymaj!", "Dla Ciebie to pestka :)"];
let x=[];
for (let i = 0; i < image.length; i++) {//tworzenie id monet
    image[i].id = i;
    image[i].setAttribute("dragaable", "true");
};

function drawTheAmount(x) {
    let index = Math.floor(Math.random() * (x.length));
    amountContainer.innerHTML = x[index]+"zł";
    message.innerText = "";
    setTimeout(function () {
        promptButton.style.display="unset";
    }, 15000);
};

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
        imgs.style.position = "unset";
        let imgValue = imgs.getAttribute('value');//pobieramy ustawione value
        this.appendChild(document.getElementById(data));
        pigArray.push(imgValue);
    };
});
pig.addEventListener("dragstart", function (ev) {
    pig.classList.add("shadow");
    let data = ev.dataTransfer.getData("money");//transferowana moneta
    let imgs = document.getElementById(data);//uchwyt do monety
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
    imgs.style.position = "absolute";
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
function round(n, k) {
    let factor = Math.pow(10, k);
    return Math.round(n * factor) / factor;
};
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
            promptButton.style.display="none";
            setTimeout(function () {
                drawTheAmount(x);
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
            message = "Liczba monet nie zgadza się z podaną kwotą. Spróbuj jeszcze raz";
            bubble.innerText = message;
            bubble.classList.add("animation");
        };

    };
});

promptButton.addEventListener("click", () => {
    let amount = parseFloat(document.querySelector(".amount__container").innerHTML);
    let promptArray = [];
    let posibbleMoney = [5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
    let remain = amount;
    bubble.classList.remove("animation");
    bubble.offsetHeight;
    for (i=0; i<posibbleMoney.length; i++){
        let coin = posibbleMoney[i];
            while((round(remain, 2)-coin)>=0){
                promptArray.push(coin);
                remain = remain-coin;
            }
    }
    let answer = "";
    for (i=0; i<promptArray.length-1; i++){
        answer += promptArray[i];
        answer += " + "
    }
    answer += promptArray[promptArray.length-1] + '= ' + amount;
    console.log(answer);
    //return answer;
    message="Spróbuj: "+answer;
    bubble.innerText = message;
    bubble.classList.add("animation");
});

easyButton.addEventListener("click", function () {
    startGame = true;
    x = easyArray;
    gameInfo.style.display="none";
    command.style.opacity="1";
    checkButton.style.opacity="1";
    drawTheAmount(easyArray);
    easyTile.forEach(function(easyBlock){
        easyBlock.classList.add("easy");
        easyBlock.offsetHeight;
        easyBlock.classList.remove("easy");
        
    });
    mediumTile.forEach(function(mediumBlock){
        mediumBlock.offsetHeight;
        mediumBlock.classList.add("medium");
        
    });
    hardTile.forEach(function(hardBlock){
        hardBlock.offsetHeight;
        hardBlock.classList.add("hard");
       
    });
});
mediumButton.addEventListener("click", function () {
    startGame = true;
    x = mediumArray;
    command.style.opacity="1";
    gameInfo.style.display="none";
    checkButton.style.opacity="1";
    drawTheAmount(mediumArray);
    easyTile.forEach(function(easyBlock){
        easyBlock.classList.add("easy");
        easyBlock.offsetHeight;
        easyBlock.classList.remove("easy");
    });
    mediumTile.forEach(function(mediumBlock){
        mediumBlock.classList.add("medium");
        mediumBlock.offsetHeight;
        mediumBlock.classList.remove("medium");
    });
    hardTile.forEach(function(hardBlock){
        hardBlock.offsetHeight;
        hardBlock.classList.add("hard");
    });
});
hardButton.addEventListener("click", function () {
    startGame = true;
    x = hardArray;
    gameInfo.style.display="none";
    checkButton.style.opacity="1";
    command.style.opacity="1";
    drawTheAmount(hardArray);
    easyTile.forEach(function(easyBlock){
        easyBlock.classList.add("easy");
        easyBlock.offsetHeight;
        easyBlock.classList.remove("easy");
    });
    mediumTile.forEach(function(mediumBlock){
        mediumBlock.classList.add("medium");
        mediumBlock.offsetHeight;
        mediumBlock.classList.remove("medium");
    });
    hardTile.forEach(function(hardBlock){
        hardBlock.classList.remove("hard");
    });
});

