var practice = {};

// creates the practice trial
practice.init = function() {
	var practice = [];
	var quantifiers = ["All", "Some", "None", "None"];
	var colours = ["black", "white", "black", "white"];
	var blacks = [10, 5, 0, 2];

	for (var i = 0; i < quantifiers.length; i++) {
		practice.push({
			all: 10,
			black: blacks[i],
			colour: colours[i],		
			quantifier: quantifiers[i]
		});
	};

	return practice;
};