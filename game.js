var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

function startGame() {

  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  $(document).one("keypress", function() {
    nextSequence();
    $("#level-title").text("Level " + level);
  });

}

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);

}

startGame();
$(".btn").click(function() { // can also use function(event)

  var userChosenColour = this.id; // this.id = event.target.id
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (userClickedPattern.length === gamePattern.length) {
    checkAnswer(userClickedPattern.length - 1);
  }

});

function playSound(colour) {

  var sound = new Audio("sounds/" + colour + ".mp3");
  sound.play();

}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("Success");
    userClickedPattern = [];
    setTimeout(function() {
      nextSequence();
    }, 1000);

  } else {
    // console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startGame();
  }
}
