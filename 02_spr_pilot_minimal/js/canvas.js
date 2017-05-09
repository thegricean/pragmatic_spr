var initCanvas = function() {
	var canvas = {};

	// a list that contains circle positions.
	var coordsCollection = [];

	// func that takes the num of black and white circles
	// and returns an array with 10 strings "black" and "white"
	// colours does not need shuffling because
	// the positions the are drawn is picked at randmon
	generateColours = function(numBlack) {
		var colours = [];
		for (var i=0; i<numBlack; i++) {
			colours.push("black");
		};
		for (var i=0; i<(10-numBlack); i++) {
			colours.push("white");
		};

		return colours;
	};

	// func that takes the width and height of the canvas
	// and returns an object with randomly generated x and y positions for a circle
	generateCoords = function() {
		var min = 40;
		var maxWidth = $('#canvas').width() - 40;
		var maxHeight = $('#canvas').height() - 40;
		var xPos = Math.floor(Math.random() * (maxWidth - min)) + min;
		var yPos = Math.floor(Math.random() * (maxHeight - min)) + min;
		return {xPos: xPos, yPos: yPos};
	}

	// checkes if the circle is too close to another circle
	checkCoords = function(xPos, yPos) {
		for (var i=0; i<coordsCollection.length; i++) {
			if (((xPos + 50) > coordsCollection[i]["xPos"])
				&& ((xPos - 50) < coordsCollection[i]["xPos"])
				&& ((yPos + 50) > coordsCollection[i]["yPos"])
				&& ((yPos - 50) < coordsCollection[i]["yPos"])) {
				return false;
			};
		};
		return true;
	};

	// func finds a circle position
	positionCircle = function() {
		var coords = generateCoords();
		if (checkCoords(coords["xPos"], coords["yPos"])) {
			coordsCollection.push(coords);
		} else {
			positionCircle();
		};
	};


	// generates positons
	// width - the width of the canvas
	// height - the hight of the canvas
	getPositions = function() {
		while (coordsCollection.length <= 10) {
			positionCircle();
		};
		return coordsCollection;
	};

	canvas.draw = function(numBlack) {
		var coloursCollection = generateColours(numBlack);
		var coords = getPositions();
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

	return canvas;
};