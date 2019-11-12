var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButtom = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpModeButtons(){
    for(var i = 0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click",function(){
            //Removes class of .selected from all mode buttons
            modeButtons[0].classList.remove("selected")
            modeButtons[1].classList.remove("selected")
            modeButtons[2].classList.remove("selected")
            modeButtons[3].classList.remove("selected")
            //Adds class of .selected from the mode button that the user has clicked
            this.classList.add("selected")
            //Sets numSquares based on difficulty level chosen
            if(this.textContent === "Easy"){
                numSquares = 3; 
            }
            else if(this.textContent === "Hard"){
                numSquares = 6;
            }
            else if (this.textContent === "Super"){
                numSquares = 9;
            }
            else if(this.textContent ==="Impossible"){
                numSquares = 12;
            }
            reset();
        })
    }
}
function setUpSquares(){
    for(var i = 0; i<squares.length; i++){
        
        //Adds Click Listeneer to squares
        squares[i].addEventListener("click", function(){
        var clickedColor =  this.style.backgroundColor
        if(clickedColor === pickedColor){
            //Displays correct if proper color is picked
            messageDisplay.textContent = "Correct";
            //change text content of reset button
            resetButtom.textContent = "Play again?";
            //changes color of all squares to clickedColor
            changeColor(clickedColor);
            //changes h1 background to clickedColor
            h1.style.backgroundColor = clickedColor;
    
        }else{
            //fades away squares that do not match RGB values
            this.style.backgroundColor = "#232323";
            //displays a message of "Try Again"
            messageDisplay.textContent = "Try Again";
        }
    })
    }
}
function reset(){
    //Creates random colors based on numSquares value that is set by mode button
    colors = generateRandomColors(numSquares);
    //sets picked color as one of those random colors
    pickedColor=pickColor();
    //changes h1 to display the RGB value of pickedColor
    colorDisplay.textContent = pickedColor;
    //change color of squares
    for(var i = 0; i<squares.length; i++){
        //If there is an RGB value at colors[i] it will display as "block"
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } 
        //If there is no RGB value at colors[i] it will display as "none"
        else{
            squares[i].style.display = "none";
        }
        //loops through square[] and sets random background color for each square
        squares[i].style.backgroundColor = colors[i]
    }
    //changes h1 back to original color 
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    resetButtom.textContent = "new colors"
}


resetButtom.addEventListener("click",function(){
   reset();
}
)

function changeColor(color){
    //Loop all squares
    for(var i = 0; i<squares.length; i++){
    //changes all color of all squares 
    squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    //picks random number 1-num
   var random = Math.floor(Math.random()*colors.length);
   //picks array index 1-num to set as the RGB value to match
   return colors[random];
}
function generateRandomColors(num){ 
    //Make an array
    var arr = [];
    //repeat num times
    for(var i= 0; i<num; i++){
    //get random color and push into array
        arr.push(randomColor())
    }
    //return array
    return arr;
}
function randomColor(){
    //pick red from 0-255
    var r = Math.floor(Math.random()*256);
    //pick green from 0-255
    var g =  Math.floor(Math.random()*256);
    //pick blue from 0-255
    var b =  Math.floor(Math.random()*256);
    //Creates the string for the RGB value 
    return "rgb(" + r + ", " + g + ", " + b + ")";
}