let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#high-score");



let gameSeq=[];
let userSeq=[];
let btns = ["blue","plum","red","green"];

let level=0;
let started=false;

let highestScore = localStorage.getItem("highestScore") || 0;
highScoreDisplay.innerText = `Highest Score: ${highestScore}`;


document.addEventListener("keypress",function(){
    if(started ==false){
        console.log("game started");
        started = true;

        levelUp();
    }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function levelUp() {
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx= Math.floor(Math.random() * 4);
    let randColor= btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    console.log(randIdx);
    console.log(randColor);
    gameSeq.push(randColor);
    console.log(gameSeq);
    // console.log(randBtn);
    gameFlash(randBtn);
}
function checkAns(idx){
    console.log("current level is:",level);
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp, 1000)
        }
    }else{
        updateHighScore();
        h2.innerHTML=`Game over! <br> Your score is <b> ${level}</b>    <br> Press any key to start again`;
        reset();
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor="white";  
        },250);
}
}
function btnPress(btn){
    console.log ("button was pressed");
    console.log(this);
    gameFlash(this);
    let userColor = this.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length-1);
  
}
let allBtns =document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click" ,btnPress);
}
function reset(){
    level=0;
    started= false;
    gameSeq=[];
    userSeq=[];
   
}
function updateHighScore() {
    if (level > highestScore) {
        highestScore = level;
        localStorage.setItem("highestScore", highestScore); // Save to localStorage
        highScoreDisplay.innerText = `Highest Score: ${highestScore}`;
    }
}