const main = document.querySelector(".main");
const play = document.querySelector(".play");
const hit = document.querySelector(".hit");
const stand = document.querySelector(".stand");
const items = document.querySelectorAll(".item");
const itemhide = document.querySelector(".item:nth-of-type(1) > span:nth-of-type(1)");
const control = document.querySelector(".control");
const showcountscore = document.querySelector(".count > h2");
const itemcpu = document.querySelectorAll(".item-cpu");
const showcountscorecpu = document.querySelector(".count-cpu");
const itemhidecpu = document.querySelector(".hideitem-cpu");


const arrnumber = ["A",2,3,4,5,6,7,8,9,10,10,10,10];
let countitem = 2;
let arrscore = [];
let countscore = 0;
let arrscorecpu = [];
let countscorecpu = 0;


//!script player
//first random
let random = Math.floor(Math.random() * 13) + 0;
arrscore.push(arrnumber[random]);
for (let i = 1 ; i < items.length ; i++) {
    random = Math.floor(Math.random() * 13) + 0;
    arrscore.push(arrnumber[random]);
}

//!script cpu
//random score cpu
for (let i = 0 ; i < itemcpu.length ; i++) {
    random = Math.floor(Math.random() * 13) + 0;
    arrscorecpu.push(arrnumber[random]);
}

//!script player and cpu
//count score first game
console.log(arrscore);
console.log(arrscorecpu);
for (let i = 0 ; i < 2 ; i++) {
    if (arrscore[i] == "A") {
        countscore += 11;
        if (countscore > 21) {
            countscore -= 11;
            countscore += 1;
        }
    }
    else {
        countscore += arrscore[i];
    }

    if (arrscorecpu[i] == "A") {
        countscorecpu += 11;
        if (countscorecpu > 21) {
            countscorecpu -= 11;
            countscorecpu += 1;
        }
    }
    else {
        countscorecpu += arrscorecpu[i];
    }
}
showcountscore.innerHTML = countscore;
itemhide.innerHTML = arrscore[0];
items[1].innerHTML = arrscore[1];
showcountscorecpu.children[0].innerHTML = countscorecpu;
itemhidecpu.innerHTML = arrscorecpu[0];
itemcpu[1].innerHTML = arrscorecpu[1];

//!script player and cpu
//new game
play.addEventListener("click",() => {
    setTimeout(() => {
        main.style.display = "flex";
        play.style.display = "none";
    },0)
    setTimeout(() => {
        items[0].classList.add("addani");
        itemcpu[0].classList.add("addani");
    },500);
    setTimeout(() => {
        items[1].classList.add("addani");
        itemcpu[1].classList.add("addani");
    },800);
    setTimeout(() => {
        control.style.transform = "translateX(0)";
        showcountscorecpu.style.transform = "translateX(0)";
    },1200);
    
    checkscoreplay();
});

//!script player

hit.addEventListener("click",() => {
    if (countscore < 21) {
        if (countitem >= 9) {
            countitem = 9;
        }
        if (arrscore[countitem] == "A") {
            countscore += 11;
            if (countscore > 21) {
                countscore -= 11;
                countscore += 1;
            }
        }
        else {
            countscore += arrscore[countitem];
        }
        items[countitem].classList.add("addani");
        items[countitem].innerHTML = arrscore[countitem];
        showcountscore.innerHTML = countscore;
        countitem++;
    }
});

//!script player and cpu

stand.addEventListener("click",() => {
    stand.style.pointerEvents = "none";
    hit.style.pointerEvents = "none";

    let counttemporary = 0;
    let countrandomcpu = 0;
    let checkrandomcpu = 0;
    let timepick;
    let countloop = 2;

    setTimeout(() => {
        //random cpu pick
        for (let i = 2 ; i < arrscorecpu.length ; i++) {
            if (i == 2) {
                counttemporary += countscorecpu;
            }
            else{
                if (arrscorecpu[i] == "A") {
                    counttemporary += 11;
                    if (counttemporary > 21) {
                        counttemporary -= 11;
                        counttemporary += 1;
                    }
                }
                else {
                    counttemporary += arrscorecpu[i];
                }
            }
            
            if (counttemporary <= 20) {
                countrandomcpu += 1;
            }
        }
        
        if (counttemporary > 23) {
            countrandomcpu -= 1;
        }
        timepick = setInterval(() => {
            if (countscorecpu >= 12 && countscorecpu <= 15) {
                countrandomcpu += 1;
            }
            if (checkrandomcpu < countrandomcpu) {
                itemcpu[countloop].classList.add("addani");
                if (arrscorecpu[countloop] == "A") {
                    countscorecpu += 11;
                    if (countscorecpu > 21) {
                        countscorecpu -= 11;
                        countscorecpu += 1;
                    }
                }
                else {
                    countscorecpu += arrscorecpu[countloop];
                }
                showcountscorecpu.children[0].innerHTML = countscorecpu;
                itemcpu[countloop].innerHTML = arrscorecpu[countloop];
            }
            else if (checkrandomcpu > countrandomcpu) {
                clearInterval(timepick);
            }
            checkrandomcpu++;
            countloop++;
        },800);
    },1000);
    setTimeout(() => {
        checkscorestand();
    },3500);
});

function checkscoreplay() {
    if (countscore >= 21 || countscorecpu >= 21) {
        stand.style.pointerEvents = "none";
        hit.style.pointerEvents = "none";

        if (countscore > countscorecpu) {
            console.log("player win");
        }
        else {
            console.log("cpu win");
        }
    }
}

function checkscorestand() {
    if (countscore <= 21 || countscorecpu <= 21) {
        if (countscore == countscorecpu) {
            console.log("equal")
        }
    
        if (countscore <= 21) {
            if (countscore > countscorecpu) {
                console.log("player win");
            }
        }
        if (countscorecpu <= 21) {
            if (countscore < countscorecpu) {
                console.log("cpu win");
            }
        }
        else {
            console.log("player win");
        }
    }
}