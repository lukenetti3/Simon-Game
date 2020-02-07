// Initialize all variable
var randNum;
var compArr = [];
var userArr = [];
var colorsArr = ["green","red","yellow","blue"];
var selColor;
var audioGreen = $("#greenSound")[0];
var audioRed = $("#redSound")[0];
var audioYellow = $("#yellowSound")[0];
var audioBlue = $("#blueSound")[0];
var startButton = false;
var userTurn = false;
var max=1;

// Start can only be clicked if "on" is selected
  $("button").on("click", function() {
    if($("#opt1").is(":checked")) {
      startButton = true;
      // Once Start is clicked begin game
      fillCompArr();
      // This function contains the beginning of the game and will 
      // go through the compArr
      startGame();
    } else { stopGame(); }
  });

// When off is selected
$("#opt2").click(function(){
    stopGame();
  });

// Fill computer array
function fillCompArr() {
  for(var i = 0; i < 20; i++) {
    selColor = grabColors();
    compArr.push(selColor);
  }
}

function grabColors() {
  var num = randNumGen();
  return colorsArr[num];
}

function randNumGen() {
  // Grabs number between 0-3
  randNum = Math.floor(Math.random() * 4); 
  return randNum;
}

function startGame() {
  startButton = true;
  $("h1").text("Simon Game");
  $("#count").text(max.toString()).fadeIn();
   for (var j = 0; j < max; j++) {
      (function (j) {
        setTimeout(function () {
          playComp(compArr[j]);
        }, 1000*j);
      })(j);
    };
}

// Send user to soundFlash function and update array
$(".green").on("click", function() {
  if(startButton === true) {
    userArr.push($(this).text());
    soundFlashGreen();
    compareArrs();
  }
});

$(".red").on("click", function() {
  if(startButton === true) {
    userArr.push($(this).text());
    soundFlashRed();
    compareArrs();
  }
});

$(".yellow").on("click", function() {
  if(startButton === true) {
    userArr.push($(this).text());
    soundFlashYellow();
    compareArrs();
  }
});

$(".blue").on("click", function() {
  if(startButton === true) {
    userArr.push($(this).text());
    soundFlashBlue();
    compareArrs();
  }
});

function compareArrs() {
  for(var x = 0; x < userArr.length; x++) {
    if(userArr[x] === compArr[x]) {
      if(userArr.length === 20) {
        $("h1").text("You WIN!!!");
        stopGame();
        return;
      }
    } else {
      $("h1").fadeOut("slow", function() {
        $("h1").text("Try Again").fadeIn();
      });
      startButton = false;
      userArr=[];
      setTimeout(startGame,2500);
      //stopGame();
      //break;
      return;
    }
  }
  if(startButton === false) {
    return;
  } 
  if(userArr.length === max) {
    userArr = [];
    max++;
    setTimeout(startGame,1500);
  }
}

// Determine next color in array and set off flash and sound
// ***Change selColor to position in array***
function playComp(color) {
  switch (color) {
    case "green": 
      soundFlashGreen();
      break;
    case "red": 
      soundFlashRed();
      break;
    case "yellow":
      soundFlashYellow();
      break;
    case "blue":
      soundFlashBlue();
  }
}

// These functions set off the sound and flash once the colors are
// pressed or computer selects them 
function soundFlashGreen() {
  setTimeout(function(){
    audioGreen.load();     
  },500);
  audioGreen.play();
  $(".green").addClass("highlightGreen");
  setTimeout(function() {
    $(".green").removeClass("highlightGreen");
  },500);
}

function soundFlashRed() {
  setTimeout(function(){
    audioRed.load();     
  },500);
  audioRed.play();
  $(".red").addClass("highlightRed");
  setTimeout(function() {
    $(".red").removeClass("highlightRed");
  },500);
}

function soundFlashYellow() {
  setTimeout(function(){
    audioYellow.load();     
  },500);
  audioYellow.play();
  $(".yellow").addClass("highlightYellow");
  setTimeout(function() {
    $(".yellow").removeClass("highlightYellow");
  },500);
}

function soundFlashBlue() {
  setTimeout(function(){
    audioBlue.load();     
  },500);
  audioBlue.play();
  $(".blue").addClass("highlightBlue");
  setTimeout(function() {
    $(".blue").removeClass("highlightBlue");
  },500);
}

function stopGame() {
  compArr = []; 
  userArr = [];
  startButton = false;
}

