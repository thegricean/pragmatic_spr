var exp  = {
	trialNumber: 44,
	circleNumber: 10,
	quantifierNumber: 4,
	sentence: {
		part1: " of the balls are ",
		part2: " in the picture",
		quantifier: ["Some", "All", "None", "Most"]
	}
};

// func that returns the number of the pictures
exp.getPictureNumber = function() {
	return exp.circleNumber;
};

exp.generatePictureTypes = function() {
	number = exp.getPictureNumber();
	var types = [];
	for (var i=0; i<=number; i++) {
		types.push({black: i, all: number});
	};
	return types;
};

// make picture - quantifier - colour combinations
// returns a list of objects
// every object contains num of black circles, num of all circles
// target colour and quantifier
exp.generatePQCComb = function() {
	var pictureTypes = exp.generatePictureTypes();
	var combinations = [];
	var quantifiers = exp.sentence.quantifier;
	// picture - quantifier
	for (var i = 0; i < pictureTypes.length; i++) {
		for (var j = 0; j < quantifiers.length; j++) {
			combinations.push({
				all: pictureTypes[i].all,
				black: pictureTypes[i].black,
				quantifier: quantifiers[j]
			});
		};
	};
	// add the colours 
	for (var i = 0; i < combinations.length; i++) {
		var step = 4; // exp.circleNumber / exp.quantifierNumber
		if (i < (combinations.length/2)) {
			if ((i % step === 0) || (((i - 1) % step) === 0)) {
				combinations[i].colour = "black";
			} else {
				combinations[i].colour = "white";
			};
		} else {
			if ((i % step === 0) || (((i - 1) % step) === 0)) {
				combinations[i].colour = "white";
			} else {
				combinations[i].colour = "black";
			};
		}
	};
	return combinations;
};


// func shuffles the list of PQC objects
exp.shufflePQCComb = function() {
	var arr = exp.generatePQCComb();
	var counter = arr.length;

	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);
		counter--;

		let temp = arr[counter];
		arr[counter] = arr[index];
		arr[index] = temp;
	};

	return arr;
};

// func that creates the exp
exp.init = function() {
	return exp.shufflePQCComb();
};