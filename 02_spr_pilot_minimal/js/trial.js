var initSentence = function() {
	var sentence = {};
	var currentWord = -1;

	// picks the word that should be shown when space is clicked
	// when there are no more words to show, the question appears
	sentence.showNextWord = function() {
		var words = $('.spr-word').toArray();

		currentWord++;
		if (currentWord < words.length){
			$(words[currentWord]).addClass('visible');
			$(words[currentWord -1]).removeClass('visible');
		}
		else {
			$(words[currentWord -1]).removeClass('visible');
			$('.question').removeClass('no-display');
		}
	};

	// creates a list from the words in the sentence
	sentence.createWordList = function(quantifier, colour) {
		return quantifier.concat(" of the balls are ", colour, " in the picture.")
		.split(/[ ,]+/);

	};

	return sentence;
};
