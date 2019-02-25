/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

  
let randomNumber = Math.floor(Math.random()*100);
let count = 0; 
console.log(randomNumber);
let difference,temp = 0;

function addGuess(){
    //document.getElementById('submit').disabled = true;
    let ul = document.getElementById('guessesMade');
    let guessElement = document.getElementById('guesses');
    let guess = guessElement.value;
    let span = document.getElementById('myPopup');
    span.textContent = guessHints(guess);
    if(!span.classList.contains('show')){
        span.classList.add("show");
    }
    guessElement.value = "";
    //console.log(guess);
    
    if(guess != "" && !((/[\D\s]+/gi).test(guess))){
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(guess));
        ul.appendChild(li);
        count += 1;
        let p = document.getElementById('guessCount');
        p.textContent = remainingGuess(count,guess);
    } 
    
    
}

function guessHints(guess){
    difference = Math.abs(randomNumber-guess);
    let mouth = document.getElementById('mouth');
    if(difference == 0){
        if(mouth.classList.contains('cssMouth1')){
            mouth.classList.replace('cssMouth1','cssMouth');
        }
        return `Hurraaaay!`;
    }else if(difference > 10){
        if(mouth.classList.contains('cssMouth')){
            mouth.classList.replace('cssMouth','cssMouth1');
        }
        return `You are far from the answer`;
    }else{
        if(temp!=0 && difference>temp){
            if(mouth.classList.contains('cssMouth')){
                mouth.classList.replace('cssMouth','cssMouth1');
            }
            return `you are moving away from the guess`;
        }else if(temp!=0 && difference<temp){
            if(mouth.classList.contains('cssMouth1')){
                mouth.classList.replace('cssMouth1','cssMouth');
            }
            return `Nice Guess! Moving closer`
        }else if(temp == 0){
            temp = difference;
            if(mouth.classList.contains('cssMouth1')){
                mouth.classList.replace('cssMouth1','cssMouth');
            }
            return `You are moving closer to the answer`;
        }else{
            return `Try another guess`;
        }
    }
}

document.getElementById('submit').addEventListener("click",addGuess);
    
function remainingGuess(count,guess){
    if(count == 6){
        document.getElementById('submit').disabled = true;
        document.getElementById('guesses').disabled = true;
        return `You Lost! Play Again`;
    }else if(count < 6 && guess==randomNumber){
        document.getElementById('submit').disabled = true;
        document.getElementById('guesses').disabled = true;
        document.getElementById('hint').disabled = true;
        if(document.getElementById('message').hasChildNodes()){
            document.getElementById('message').removeChild(document.getElementById('message').firstChild);
        }
        document.getElementById('cssHead').classList.replace('cssHeadRotate','jump');
        return `You Win! Play Again`;
    }else{
        return `You have ${6-count} remaining guesses`;
    }

}

function playAgain(){
    let ul = document.getElementById('guessesMade');
    let p = document.getElementById('guessCount');
    p.textContent = "You have 6 guesses.";
    if(document.getElementById('cssHead').classList.contains('jump')){
        document.getElementById('cssHead').classList.replace('jump','cssHeadRotate');
    }
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }
    let mouth = document.getElementById('mouth');
    if(mouth.classList.contains('cssMouth1')){
        mouth.classList.replace('cssMouth1','cssMouth');
    }
    document.getElementById('submit').disabled = false;
    document.getElementById('guesses').disabled = false;
    document.getElementById('hint').disabled = false;
    randomNumber = Math.floor(Math.random()*100)+1;
    count = 0;
    let span = document.getElementById('myPopup');
    span.classList.replace("show","hide");
}
    
document.getElementById('playAgain').addEventListener("click",playAgain);

function displayHint(){
    let p = document.getElementById('message');
    p.appendChild(document.createTextNode(`The number is in the range of ${randomNumber-2} - ${randomNumber+2}`));
}
document.getElementById('hint').addEventListener("click",displayHint);

