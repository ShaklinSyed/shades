var colorSet = [
	["#ffb0ac","#ff6259","#ff3b30","#ff8982"], //red 
	["#ffd499","#ffaa32","#ff9500","#ffbf66"], //orange
	["#ffea99","#ffd632","#ffcc00","#ffe066"], //yellow
	["#4cd964","#6fe083","#93e8a2","#b7efc1"], //green
	["#bde9fd","#7ad3fb","#5ac8fa","#9cdefc"], //teal-blue
	["#99c9ff","#3294ff","#007aff","#66afff"], //blue
	["#bcbbee","#7977de","#5856d6","#9a99e6"], //purple
	["#ffabbb","#ff5676","#ff2d55","#ff8199"], //pink
];

// Returns a color Palette
var selectColorPalette = function(){
	block.colorPalette = colorSet[getRandomArbitrary(0,8)];
	selectColor();
}

// Random number Generator
var getRandomArbitrary = function(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

// return the lowest lane score
var getLowestLaneScore = function(){
	var lowest = block.laneScore[0].length;
	for(var i = 1;i<block.laneScore.length;i++){
		if(lowest > block.laneScore[i].length){
			lowest = block.laneScore[i].length;
		}
	}
	console.log(lowest);
	return lowest;
}

// Returns one color from selected color palette
var selectColor = function(){
	block.currentColor = getRandomArbitrary(0,4);
	$('#singleBlock').css("background", block.colorPalette[block.currentColor])
}

