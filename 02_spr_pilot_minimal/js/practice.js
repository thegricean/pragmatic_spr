var practice = {};

practice.init = function() {
	var practice = [];
	var quantifiers = ["All", "Some", "Some", "None", "Most"];
	var colours = ["black", "black", "white", "black", "white"];
	var blacks = [8, 3, 5, 0, 2];

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