
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];


var started = false;
var keyStarted = false;

var level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})



$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
})



function stopKey () {
  $(document).keydown(function() {
      if (true) {

      }
  })
}



function checkAnswer (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length  === userClickedPattern.length ) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 500);
    $("#level-title").text("게임오버, A키로 재시작")
    startOver();
  }
}


function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}



function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
  playSound(randomChosenColor);

}


function playSound (name) {
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var animateColor = $("#" + currentColor);
  animateColor.addClass("pressed");
  setTimeout(function() {
    animateColor.removeClass("pressed");
  }, 100);
}
