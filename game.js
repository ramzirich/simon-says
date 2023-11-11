let numberOfClicks = -1;
let colors =["blue", "green" , "red", "yellow"];
let correctPattern =[]
let userClickPattern = [];
let level=0;

const bodyElement = document.getElementsByTagName('body');
const buttonsElement = document.getElementsByClassName('btn');
const titleElement = document.getElementsByTagName('h1');
const onlyTitleElement = titleElement[0];
const onlyBodyElement = bodyElement[0];

document.addEventListener("keydown",function(){
    if(level<=0){
        StartGame();
    }
})

function StartGame(){
    level++;
    onlyTitleElement.innerText = "Level " +level;
    let randomNumber = Math.floor(Math.random() * 4);
    let color = colors[randomNumber]
    correctPattern.push(color);
    playSound(color)
    diplayGrayColor(color)
}

const buttonsElementArray = [...buttonsElement];
buttonsElementArray.forEach(function(button) {
    button.addEventListener('click', function(){
        const color=button.id;
        numberOfClicks++;
        playSound(color);
        diplayGrayColor(color);
        userClickPattern.push(color);
        if(color==correctPattern[numberOfClicks]){
            if(userClickPattern.length == correctPattern.length){
                setTimeout(function(){
                    userClickPattern=[];
                    numberOfClicks =-1;
                    StartGame();
                }, 200);}}         
        else{
            playSound("wrong");
            onlyBodyElement.classList.add("game-over");
            onlyTitleElement.innerText = "Game Over, Press Any Key To Restart";
            setTimeout(function(){
                onlyBodyElement.classList.remove("game-over")    
            }, 300)
            userClickPattern = [];
            correctPattern = [];
            level=0;
            numberOfClicks = -1 
        }
    })
});

function playSound(color){
    let sourceSound =`./sounds/${color}.mp3`;
    let sound = new Audio(sourceSound);
    sound.play();
}

function diplayGrayColor(color){
    let colorElement = document.getElementById(color);
    colorElement.classList.add("pressed");

    setTimeout(function(){
        colorElement.classList.remove("pressed")
    },100)
}
