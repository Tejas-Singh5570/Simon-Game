// initializing array to analyse the game and user sequence.

let gameSeq = [];
let userSeq = [];

let color = ["yellow", "green", "blue", "pink"];

let gameStart = false;
let level = 0;

let h3 = document.querySelector("h3");
let startBtn = document.querySelector(".start_btn");

// Step - 1
// evet listener when any button is pressed then game will start
startBtn.addEventListener("click", function(){
    if(gameStart == false)
    {
        console.log("clicked");
        gameStart = true;

        setTimeout(  levelUp, 1000);
    }
});


let maxValue = 0;
// Step - 2
function levelUp()
{
    userSeq = [];
    level++;
    h3.innerText = `level ${level}`;

    // displaying curr score
    let currScr = document.querySelector(".curr_scr");
    currScr.innerText = `Current Score: ${(level*10) - 10}`;

    // displaying max score
    let maxScr = document.querySelector(".max_scr");
    if(maxValue<(level*10)-10)
    {
        maxValue = level*10-10;
        maxScr.innerText = `Max Score: ${maxValue}`;
    }

    // random button
    let randomIdx = Math.floor(Math.random()*4);
    let randomColor = color[randomIdx];

    // pushing the random color sequence in gameSeq
    gameSeq.push(randomColor);
    console.log(gameSeq);

    let randbtn = document.querySelector(`.${randomColor}`);

    btnFlash(randbtn);
}

function btnFlash(btn)
{
    
    btn.classList.add("flash")
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 150);
}


// step - 3

function checkAns(indx)
{
    // console.log("current leve", level);
    // let indx = level-1

    if(userSeq[indx] == gameSeq[indx])
    {
        if(userSeq.length == gameSeq.length)
        {
            setTimeout(levelUp, 1000);
        }
       
    }else{
        h3.innerHTML = `Game over, <b>You Score ${level*10 -10}<br> Click Start button to restart the game`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 120);
        gameReset();
    }
}

function btnPress()
{
    
    let btn = this;
    btnFlash(btn);

    let userCol = btn.getAttribute("id");
    userSeq.push(userCol);
    console.log(userSeq);
    checkAns(userSeq.length-1);
}


let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click", btnPress);
}

function gameReset() {
    gameStart = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}