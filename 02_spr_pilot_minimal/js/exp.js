var initExp = function() {
	var exp = {};
	exp.numOfAllBalls = 10;
	exp.NumOfQuantifiers = 4;
	exp.quantifiers = ["Some", "All", "None", "Most"];

	// function that returns the number of the pictures
	var getPictureNumber = function() {
		return exp.numOfAllBalls;
	};

	// func that returns a list of objects representing every picture type
	var generatePictureTypes = function() {
		var number = getPictureNumber();
		var types = [];

		for (var i = 0; i <= number; i ++) {
			types.push({
				TCBalls: i,
				OCBalls: number - i
			});
		}
		
		return types;
	};

	// function that creates all the possible picture - quantifier combinations
	// returns a shuffled list of objects
	// every object contains
	// TCBalls: number of target colour balls,
	// OCBalls: number of other colour balls
	// quantifier: quantifier
	var generatePQComb = function() {
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
					TCBalls: pictureTypes[i].TCBalls,
					OCBalls: pictureTypes[i].OCBalls,
					quantifier: quantifiers[j]
				});
			}
		}

		return shuffleComb(combinations);
	};

	// function that shuffles the items in a list
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

	// function that adds target colours to the objects generate PQComb creates
	// colour: "black" or "white" is added to the object
	// the returned list of objects is shuffled
	var addTargetColours = function() {
		var combinations = generatePQComb();

		for (var i = 0; i < combinations.length; i++) {
			if (i < (combinations.length/2)) {
				combinations[i].colour = "black";
			} else {
				combinations[i].colour = "white";			
			}
		}

		return shuffleComb(combinations);
	};

	// trail data contains the quantifier, colour and picture data
	exp.data = addTargetColours();
	exp.subjInfo = {};

	// function that collects the subject's info (comments, education, gernder, etc)
	exp.addSubjInfo = function(info) {
		exp.subjInfo = info;
	};

	// function that collects the subject's reading times and responses
	exp.addResponse = function(trialIndex, response, rt) {
		exp.data[trialIndex].trialNumber = trialIndex + 1;
		exp.data[trialIndex].response = response;
		exp.data[trialIndex].readingTimes = rt;
	};

	// functions that converts the data into JSON
	exp.getJSON = function() {
		return JSON.stringify({
			"results": exp.data,
			"subjectInfo": exp.subjInfo
		});
	};

	return exp;
};