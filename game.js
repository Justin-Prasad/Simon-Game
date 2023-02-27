var buttonColours = ["red", "blue", "green", "yellow"];

// This array houses the overall game pattern that accumlates as the game goes on
var gamePattern = [];

// This array houses the pattern of which the user inputted at some given point
var userClickedPattern = [];

// Initialize game start status and Level
var started = false;
var level = 0;

// Activate the game upon the initial keypress from the starting screen
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Trigger the button animation, sound, add the user click to an array, and checkAnswer() upon clicks on the buttons
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// Check the player answer against the game answer.
// If correct, call nextSequence()
// Otherwise, activate a game over sequence if incorrect and trigger a restart by pressing any key
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// Trigger a new sequence and increment the level by 1
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  // Add the new randomly chosen colour to the game pattern array
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Animate a button press when one of the 4 buttons is clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Play a sound when clicking a specific button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Reset the user to the beginning
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
