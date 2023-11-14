let numberOfClicks = -1;
let colors =["blue", "green" , "red", "yellow"];
let correctPattern =[]
let userClickPattern = [];
let level=0;
let scoreArray=[];
let scoreUserMap=new Map();
let username = null

const bodyElement = document.getElementsByTagName('body');
const buttonsElement = document.getElementsByClassName('btn');
const titleElement = document.getElementsByTagName('h1');
const userInputElement = document.getElementById('username-input');
const leaderboardListElement = document.getElementById('leaderboard-list')
const onlyTitleElement = titleElement[0];
const onlyBodyElement = bodyElement[0];

function handleInputUsername(){
    if(username == null){
        document.addEventListener("keydown",function(){
            if(username == null){
                onlyTitleElement.innerText = "Enter Your Username"
            }
        userInputElement.addEventListener('change', function(){         
            if(username ==null){
                onlyTitleElement.innerText = "Press Any Key to Start"
                RealGameStart();
                }          
            })
        })
    }
}
handleInputUsername();

function RealGameStart(){
    document.addEventListener("keydown",function(){
        if(level<=0){
            username  = userInputElement.value;     
            StartGame();
        }
    })
}


function StartGame(){
    if(level <1){
        userInputElement.disabled = false;
    }
    username  = userInputElement.value;       
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
        userInputElement.disabled = true;
        username  = userInputElement.value;  
        const color=button.id;
        numberOfClicks++;
        playSound(color);
        diplayGrayColor(color);
        userClickPattern.push(color);
        handleClickedSquare(color);
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

function handleClickedSquare(color){
    if(color==correctPattern[numberOfClicks]){
        if(userClickPattern.length == correctPattern.length){
            setTimeout(function(){
                userClickPattern=[];
                numberOfClicks =-1;
                userInputElement.disabled = true;
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
        numberOfClicks = -1
        handleLeaderboards()
    }
}

function handleLeaderboards(){
    if(scoreUserMap.has(level)){
        let listOfSUsername= scoreUserMap.get(level);
        listOfSUsername.push(username);
    }else{
        scoreUserMap.set(level, [username]);
    }   
    scoreArray.push(level);
    scoreArray.sort(function(a, b){
        return b- a;
    })
    let scoreSet = new Set();
    scoreArray.forEach((score) =>scoreSet.add(score));
    leaderboardListElement.innerHTML = ""
    let ranking =1;
    scoreSet.forEach(score =>{
        let arrayFromMap = scoreUserMap.get(score);
        for(const usernameFromMap of arrayFromMap){
            if(ranking >3){
                break;
            }
            const createLiElement = document.createElement("li");
            createLiElement.innerHTML = ranking + " - " +usernameFromMap + " ( Level " + score + " )";
            leaderboardListElement.appendChild(createLiElement)
            ranking++;
        }
    })
    level=0;
}
