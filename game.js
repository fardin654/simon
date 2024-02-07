var userClickedPattern = [];
var gamePattern =[];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keypress(function(){
    if (!started) {
        setTimeout(function(){
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;},100)
    }
});
$(document).click(function(){
    if (!started) {
        setTimeout(function(){
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;},100)
    }
});

$(".btn").click(function(event){

    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
   
})



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()}
                ,500);
        }
        
    }
    else{

        console.log("failure");

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();

    }

}

function nextSequence(){

    level++;
    $("h1").text("level "+level);
    userClickedPattern = [];

    var randomChosenNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomChosenNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}





function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();   
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")}
        ,100);
}

function startOver(){
    level = 0;
    gamePattern =[];
    started = false;

}






