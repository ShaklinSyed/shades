var colorSet = [
	["#ffb0ac","#ff8982","#ff6259","#ff3b30"], //red
	["#ffd499","#ffbf66","#ffaa32","#ff9500"], //orange
	["#ffea99","#ffe066","#ffd632","#ffcc00"], //yellow
	["#b7efc1","#93e8a2","#6fe083","#4cd964"], //green
	["#bde9fd","#9cdefc","#7ad3fb","#5ac8fa"], //teal-blue
	["#99c9ff","#66afff","#3294ff","#007aff"], //blue
	["#bcbbee","#9a99e6","#7977de","#5856d6"], //purple
	["#ffabbb","#ff8199","#ff5676","#ff2d55"], //pink
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

