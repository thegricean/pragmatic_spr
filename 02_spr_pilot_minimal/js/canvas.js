var initCanvas = function() {
	var canvas = {};

	// a list that contains circle positions.
	var coordsCollection = [];

	// function that takes
	// numTCBalls: number of target colour balls (int), 
	// TC: the target colour (string)
	// OC: the other colour (string)
	// and returns an array with 10 colour word where
	// the TC appears numTCBalls times and
	// the OC 10 - numTCBalls times
	//
	// Note: the items in the list are ordered however there is
	// no need to shuffle the items because
	// they are drawn at random positions
	var generateColours = function(numTCBalls, TC, OC) {
		var colours = [];

		for (var i = 0; i < numTCBalls; i++) {
			colours.push(TC);
		};

		for (var i = 0; i < (10-numTCBalls); i++) {
			colours.push(OC);
		};

		return colours;
	};

	// func that takes the width and height of the canvas
	// and returns an object with randomly generated x and y positions for a circle
	var generateCoords = function() {
		var min = 40;
		var maxWidth = $('#canvas').width() - 40;
		var maxHeight = $('#canvas').height() - 40;
		var xPos = Math.floor(Math.random() * (maxWidth - min)) + min;
		var yPos = Math.floor(Math.random() * (maxHeight - min)) + min;
		return {xPos: xPos, yPos: yPos};
	}

	// checkes if the circle is too close to another circle
	var checkCoords = function(xPos, yPos) {
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
	var positionCircle = function() {
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
	var getPositions = function() {
		while (coordsCollection.length <= 10) {
			positionCircle();
		};
		return coordsCollection;
	};


	// function that creates the image on the canvas
	// takes two arguments - the number of target colour balls and the target colour
	canvas.draw = function(numTCBalls, TC) {
		var coords = getPositions();

		if (TC == "white") {
			var colours = generateColours(numTCBalls, "white", "black");
		} else {
			var colours = generateColours(numTCBalls, "black", "white");
		}

		for (var i = 0; i < 10; i++) {
			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");

			context.beginPath();
			context.fillStyle = colours[i];
			context.arc(coords[i]["xPos"], coords[i]["yPos"], 15, 0, 2*Math.PI);
			context.closePath();
			context.fill();
		}
	};

	canvas.hide = function() {
		$('#canvas').addClass("hidden");
	};

	return canvas;
};