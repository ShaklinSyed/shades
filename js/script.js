var block = {
	lane : [610,610,610,610],
	laneScore : [[],[],[],[]],
	currentLane : 1,
	dimension : {
		width: 256,
		height: 90
	},
	currentPosition : {
		top : 0,
		left : 256
	},
	colorPalette : [],
	currentColor : 0,
	movementInterval : "",
	score : 0
};

var paused = false;

$(document).ready(function(){

	loadMenu();

	// Event Listener
	$('body').on('keydown',function(event){
		if(event.which == 37){
			// console.log("Left");
			if(block.currentLane > 0 && block.lane[block.currentLane - 1] > block.currentPosition.top){
				block.currentLane -=1;
				block.currentPosition.left -= 256;
			}
		}else if(event.which == 39){
			// console.log("Right");
			if(block.currentLane <= 2 && block.lane[block.currentLane + 1] > block.currentPosition.top){
				block.currentLane += 1;
				block.currentPosition.left += 256;
			}
		}else if(event.which == 40){
			// console.log("Bottom");
		}else if(event.which == 32){
            if(paused == true){
                console.log("Play");
                block.movementInterval = setInterval(moveBlock, 5);
                $('#pauseButton').toggle();
                $('#playButton').toggle();
                paused = false;
			}else{
                console.log('paused');
                clearInterval(block.movementInterval);
                $('#pauseButton').toggle();
                $('#playButton').toggle();
                paused = true;
			}
		}
	});

	$('#startGame').on('click',function(){
        $('#mainMenu').slideToggle();

		setTimeout(function(){
            $('#wrapper').slideDown();
            setTimeout(function (){
                loadBlock();
                draw();
            },500);
		}, 500)
	});

	$('#pauseButton').on('click',function(){
		console.log('paused');
		clearInterval(block.movementInterval);
		$('#pauseButton').toggle();
        $('#playButton').toggle();
        paused = true;
	});

	$('#playButton').on('click',function(){
		console.log("Play");
        block.movementInterval = setInterval(moveBlock, 5);
        $('#pauseButton').toggle();
        $('#playButton').toggle();
        paused = false;
	});

	$('#playAgain').on('click', function(){
        $('#endMenu').slideToggle();

        block.laneScore[0].length = 0;
        block.laneScore[1].length = 0;
        block.laneScore[2].length = 0;
        block.laneScore[3].length = 0;

        block.score = 0;


        clearInterval(block.movementInterval);
        $('#wrapper').find('.block').remove();

        setTimeout(function () {
            $('#wrapper').slideToggle();
            $('#singleBlock').remove();

            setTimeout(function (){
                loadBlock();
                draw();
            },500);
        }, 500);
	});

	// startGame();
});

// Loads Main Menu
var loadMenu = function(){
    $('#playButton').hide();
    $('#wrapper').hide();
    $('#endMenu').hide();
};

var loadBlock = function(){
	$('#wrapper').append("<div id='singleBlock'></div>");
	selectColorPalette();
	block.movementInterval = setInterval(moveBlock, 5);
};

// creates a new block
var createNewBlock = function(){
	$('#wrapper').append("<div id='singleBlock'></div>");
	block.currentLane = 1;
	block.currentPosition.top = 0;
	block.currentPosition.left = 256;
	selectColor();
	block.movementInterval = setInterval(moveBlock, 5);
};

// function to move block
var moveBlock = function(){
	if(block.currentPosition.top < block.lane[block.currentLane]){
		++block.currentPosition.top;
		$('#singleBlock').css("top", block.currentPosition.top + "px");
		$('#singleBlock').css("left", block.currentPosition.left + "px");
	}else if(block.currentPosition.top == block.lane[block.currentLane]){
		clearInterval(block.movementInterval);
		if(checkGameStatus()){
            block.score += getScore() * 5;
			block.laneScore[block.currentLane].push(block.currentColor);
			$('#singleBlock').remove();
			calcBlockScore();
		}
	}

};

var checkGameStatus = function(){
	for(var i= 0;i<block.lane.length;i++){
		if(block.lane[i] < 0){
			console.log("Game ended");
            clearInterval(block.movementInterval);
            $('#wrapper').slideToggle();
            $('#gameScore').html('');
            setTimeout(function () {
                $('#endMenu').slideToggle();
            }, 500);
			return false;
		}
	}
	return true;
};


var draw = function(){

    // clearing blocks before redraw
    $('#wrapper').find('.block').remove();

	for(var i = 0;i<block.laneScore.length;i++){
		var top = 610,
			left = 0;

		switch(i){
			case 0:
				left = 0;
				break;
			case 1:
				left = block.dimension.width * (i);
				break;
			case 2:
				left = block.dimension.width * (i);
				break;
			case 3:
				left = block.dimension.width * (i);
				break;
		}

		for(var j =0 ; j<block.laneScore[i].length;j++){
			$('#wrapper').append("<div class='block' style='top: "+ top +"px; left:"+ left +"px;background-color:" + block.colorPalette[block.laneScore[i][j]] +"' >"+ block.laneScore[i][j]+"</div>");
			top-= block.dimension.height;
		}
		block.lane[i] = top;
	}

	console.log(block.score);

	$('#gameScore').html(block.score);
    $('#endMenuScore').html(block.score);
};


var verLaneAddition = function(){
	for(var i = 0;i<block.laneScore.length;i++){
		if(block.laneScore[i].length >= 2){
            block.laneScore[i] = sumVertBlocks(block.laneScore[i]);
		}
	}

    // console.log(block.laneScore[0],"0");
    // console.log(block.laneScore[1],"1");
    // console.log(block.laneScore[2],"2");
    // console.log(block.laneScore[3],"3");

};

var calcBlockScore = function(){
	var lowest = getLowestLaneScore();

	//Checks for vertical addition
    verLaneAddition();


	if(lowest >= 1){
        for(var i=0;i<=lowest;i++){
            if(block.laneScore[0][i] == block.laneScore[1][i] &&
                block.laneScore[0][i] == block.laneScore[2][i] &&
                block.laneScore[0][i] == block.laneScore[3][i]){

                var tempScore = (i+1) * 15;
				block.score += tempScore;

                block.laneScore[0].splice(i,1);
                block.laneScore[1].splice(i,1);
                block.laneScore[2].splice(i,1);
                block.laneScore[3].splice(i,1);

                block.lane[0] += block.dimension.height;
                block.lane[1] += block.dimension.height;
                block.lane[2] += block.dimension.height;
                block.lane[3] += block.dimension.height;

                console.log(block.laneScore);
            }
        }
	}

	draw();
	checkGameStatus();
	createNewBlock();

};

var getScore = function(){
	if(block.currentColor == 0){
		return 1;
	}else if(block.currentColor == 1){
		return 2;
	}else if(block.currentColor == 2){
		return 3;
	}else if(block.currentColor == 3){
		return 4;
	}
};