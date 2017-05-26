var initExp = function() {
	var exp = {};
	exp.circleNumber = 10;
	exp.quantifierNumber = 4;
	exp.quantifiers = ["Some", "All", "None", "Most"];

	// func that returns the number of the pictures
	var getPictureNumber = function() {
		return exp.circleNumber;
	};

	// func that returns a list of objects representing every picture type
	var generatePictureTypes = function() {
		number = getPictureNumber();
		var types = [];
		for (var i=0; i<=number; i++) {
			types.push({black: i, all: number});
		}
		
		return types;
	};

	// fun that creates picture - quantifier combinations
	// returns a list of objects
	// every object contains num of black circles, num of all circles
	// and quantifier
	// the list of objects is shuffled
	var generatePQComb = function() {
		var pictureTypes = generatePictureTypes();
		var combinations = [];
		var quantifiers = exp.quantifiers;

		// picture - quantifier combination
		for (var i = 0; i < pictureTypes.length; i++) {
			for (var j = 0; j < quantifiers.length; j++) {
				combinations.push({
					all: pictureTypes[i].all,
					black: pictureTypes[i].black,
					quantifier: quantifiers[j]
				});
			}
		}

		return shuffleComb(combinations);
	};

	// func that takes a list and returns the same list shuffled
	var shuffleComb = function(comb) {
		var counter = comb.length;

		while (counter > 0) {
			let index = Math.floor(Math.random() * counter);
			counter--;

			let temp = comb[counter];
			comb[counter] = comb[index];
			comb[index] = temp;
		}

		return comb;
	};

	// func that adds targert colours to the trial object
	var addTargetColours = function() {
		combinations = generatePQComb();

		for (var i = 0; i < combinations.length; i++) {
			if (i < (combinations.length/2)) {
				combinations[i].colour = "black";
			} else {
				combinations[i].colour = "white";			
			}
		}

		return shuffleComb(combinations);
	};

	exp.data = addTargetColours();
	exp.data.subjInfo = {};

	exp.addSubjInfo = function(info) {
		exp.data.subjInfo = info;
	};

	exp.addResponse = function(trialIndex, response, rt) {
		exp.data[trialIndex].response = response;
		exp.data[trialIndex].readingTimes = rt;
	};

	exp.getJSON = function() {
		return JSON.stringify({
			"results": exp.data,
			"subject info": exp.data.subjInfo
		});
	};

	return exp;
};