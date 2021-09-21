var buttonColours=["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern = [];
var level =0;
var started=false;

$(document).on('keydown',function(){
  if (!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").on("click",function(){
  var userChosenColour= this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
  console.log(currentLevel);
  console.log(gamePattern);
  console.log(userClickedPattern);
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    if(gamePattern.length == userClickedPattern.length){
      console.log("match");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press any key to restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }

}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  flash(randomChosenColour);
}

function flash(element){
  $("#"+element).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(element){
  var audio = new Audio("sounds/"+element+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;

}
