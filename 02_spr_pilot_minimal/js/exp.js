var exp  = {
	circleNumber: 10,
	quantifierNumber: 4,
	sentence: {
		quantifier: ["Some", "All", "None", "Most"]
	}
};

// func that returns the number of the pictures
exp.getPictureNumber = function() {
	return exp.circleNumber;
};

// func that returns a list of objects representing every picture type
exp.generatePictureTypes = function() {
	number = exp.getPictureNumber();
	var types = [];
	for (var i=0; i<=number; i++) {
		types.push({black: i, all: number});
	};
	return types;
};

// fun that creates picture - quantifier - colour combinations
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
		if ((i % 2) === 0) {
			combinations[i].colour = "black";
		} else {
			combinations[i].colour = "white";			
		}
	};
	return combinations;
};


// func shuffles the list of PQC objects
// returns a shuffled list of PQC objects
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

// func creates an exp
exp.init = function() {
	return exp.shufflePQCComb();
};