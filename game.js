var buttonColours = ["red", "blue", "green", "yellow"];

//colect game random buttons
var gamePattern = [];

//collect users clicked buttons so you can compare it with random
var userClickedPattern = [];

var isGameStarted = false;
var level = 0;

$(document).keydown(function (event) {
    if (!isGameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        isGameStarted = true;
    }
});

//Event listener when player clicked on button
$('.btn').click(function () {

    //figure out what button is pressed than add it to a list
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    //call function to play a sound
    playSound(userChosenColour);

    //call function that add css class to pressed buton
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('točno');
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                // check that they have finished their sequence, if yes call next after 1 sec
                nextSequence();
            }, 1000);
        }

    } else {
        console.log('netočno');

        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function () {
            // remove that class after 0.1 sec
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').html('Level ' + level);

    var randomNumber = Math.floor(Math.random() * 4); //Numbers between 1-3
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}



//play sound that is located in sounds folder. Which sound? Depend which one is passed!
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    //Button that is pressed add effect that is given by class pressed in css
    $('#' + currentColour).addClass("pressed");
    setTimeout(function () {
        // remove that class after 0.1 sec
        $('#' + currentColour).removeClass("pressed");
    }, 100);

}

function startOver() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}

