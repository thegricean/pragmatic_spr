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

	// function that creates picture - quantifier - colour combinations
	// returns a list of objects
	// every object contains num of black balls, num of all balls
	// and quantifier
	// the list of objects is shuffled
	var generatePQCComb = function() {
		var pictureTypes = generatePictureTypes();
		var combinations = [];
		var quantifiers = exp.quantifiers;

		for (var i = 0; i < pictureTypes.length; i++) {
			var colours = ["black", "white", "black", "white"];

			for (var j = 0; j < quantifiers.length; j++) {

				// adds the colours
				var chosenColour = colours[Math.floor(Math.random()*colours.length)];
				var forDeletion = colours.indexOf(chosenColour);
				if (forDeletion != -1) {
					colours.splice(forDeletion, 1)
				}
				combinations.push({
					all: pictureTypes[i].all,
					black: pictureTypes[i].black,
					quantifier: quantifiers[j],
					colour: chosenColour
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

	exp.data = generatePQCComb();
	exp.subjInfo = {};

	exp.addSubjInfo = function(info) {
		exp.subjInfo = info;
	};

	exp.addResponse = function(trialIndex, response, rt) {
		exp.data[trialIndex].response = response;
		exp.data[trialIndex].readingTimes = rt;
	};

	exp.getJSON = function() {
		return JSON.stringify({
			"results": exp.data,
			"subjectInfo": exp.subjInfo
		});
	};

	return exp;
};