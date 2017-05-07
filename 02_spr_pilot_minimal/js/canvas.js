var canvas = {};

canvas.draw = function(numBlack, width, height) {
	var coloursCollection = circles.generateColours(numBlack);
	var coords = circles.getPositions(width, height);
	for (var i=0; i<10; i++) {
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
		context.beginPath();
		context.fillStyle = coloursCollection[i];
		context.arc(coords[i]["xPos"], coords[i]["yPos"], 15, 0, 2*Math.PI);
		context.closePath();
		context.fill();
	};
};

var circles = {};

// func that takes the num of black and white circles
// and returns an array with 10 strings "black" and "white"
// colours does not need shuffling because
// the positions the circles are drawn is picked at randmon
circles.generateColours = function(numBlack) {
	var colours = [];
	for (var i=0; i<numBlack; i++) {
		colours.push("black");
	};
	for (var i=0; i<(10-numBlack); i++) {
		colours.push("white");
	};

	return colours;
};

// a list that contains circle positions.
circles.coordsCollection = [];

// func that takes the width and height of the canvas
// and returns an object with randomly generated x and y positions for a circle
circles.generateCoords = function(width, height) {
	var min = 40;
	var maxWidth = width - 40;
	var maxHeight = height - 40;
	var xPos = Math.floor(Math.random() * (maxWidth - min)) + min;
	var yPos = Math.floor(Math.random() * (maxHeight - min)) + min;
	return {xPos: xPos, yPos: yPos};
}

// checkes if the circle is too close to another circle
circles.checkCoords = function(xPos, yPos) {
	for (var i=0; i<circles.coordsCollection.length; i++) {
		if (((xPos + 50) > circles.coordsCollection[i]["xPos"])
			&& ((xPos - 50) < circles.coordsCollection[i]["xPos"])
			&& ((yPos + 50) > circles.coordsCollection[i]["yPos"])
			&& ((yPos - 50) < circles.coordsCollection[i]["yPos"])) {
			return false;
		};
	};
	return true;
};

// finds a position for a circle
circles.positionCircle = function(width, height) {
	var coords = circles.generateCoords(width, height);
	if (circles.checkCoords(coords["xPos"], coords["yPos"])) {
		circles.coordsCollection.push(coords);
	} else {
		circles.positionCircle(width, height);
	};
};


// generates circles positons
// width - the width of the canvas
// height - the hight of the canvas
circles.getPositions = function(width, height) {
	while (circles.coordsCollection.length <= 10) {
		circles.positionCircle(width, height);
	};
	return circles.coordsCollection;
};