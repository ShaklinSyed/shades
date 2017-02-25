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
	movementInterval : ""
};

$(document).ready(function(){

	loadMenu();
	
	// Event Listener
	$('body').on('keydown',function(event){
		if(event.which == 37){
			console.log("Left");
			if(block.currentLane > 0 && block.lane[block.currentLane - 1] > block.currentPosition.top){
				console.log();
				block.currentLane -=1;
				block.currentPosition.left -= 256;
			}
		}else if(event.which == 39){
			console.log("Right");
			if(block.currentLane <= 2 && block.lane[block.currentLane + 1] > block.currentPosition.top){
				block.currentLane += 1;
				block.currentPosition.left += 256;
			}
		}else if(event.which == 40){
			console.log("Bottom");
		}
	});

	$('#startGame').on('click',function(){
		$('#mainMenu').slideToggle();
		$('#wrapper').slideToggle();

		setTimeout(function(){
            loadBlock();
            draw();
		}, 500)
	});

	$('#pauseButton').on('click',function(){
		console.log('paused');
		clearInterval(block.movementInterval);
		$('#pauseButton').toggle();
        $('#playButton').toggle();
	});

	$('#playButton').on('click',function(){
		console.log("Play");
        block.movementInterval = setInterval(moveBlock, 5);
        $('#pauseButton').toggle();
        $('#playButton').toggle();
	});

	// startGame();
});

var loadMenu = function(){
    $('#playButton').hide();
    $('#wrapper').hide();
};

var loadBlock = function(){
	$('#wrapper').append("<div id='singleBlock' class='new-block'></div>");
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

var moveBlock = function(){
	if(block.currentPosition.top < block.lane[block.currentLane]){
		++block.currentPosition.top;
		$('#singleBlock').css("top", block.currentPosition.top + "px");
		$('#singleBlock').css("left", block.currentPosition.left + "px");
	}else if(block.currentPosition.top == block.lane[block.currentLane]){
		clearInterval(block.movementInterval);
		if(checkGameStatus()){
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
			return false;
		}
	}
	return true;
};


var draw = function(){
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
};

var calcBlockScore = function(){
	var lowest = getLowestLaneScore();

    //Add blocks

		console.log(block.laneScore);
		if(block.laneScore[block.currentLane][1] != undefined && block.laneScore[block.currentLane][block.laneScore[block.currentLane].length - 1] == block.currentColor && block.currentColor < 3){
            console.log(block.laneScore[block.currentLane],'before');
            var currentLane = block.laneScore[block.currentLane];
			block.laneScore[block.currentLane][currentLane.length - 1] += 1;
            block.laneScore[block.currentLane].length = block.laneScore[block.currentLane].length - 1;
            console.log(block.laneScore[block.currentLane],'after');
		}

	if(block.laneScore[0][0] != undefined && block.laneScore[1][0] != undefined && block.laneScore[2][0] != undefined && block.laneScore[3][0] != undefined){

		// check if row is has same value
		for(var i=0;i<lowest;i++){
            if(block.laneScore[0][i] == block.laneScore[1][i] == block.laneScore[2][i] == block.laneScore[3][i]){
                console.log("same data");
                // block.laneScore[0].pop();
                // block.laneScore[1].pop();
                // block.laneScore[2].pop();
                // block.laneScore[3].pop();

                console.log(block.laneScore);
            }
		}
	}
	draw();
	checkGameStatus();
	createNewBlock();

};