var initSentence = function() {
	var sentence = {};
	var currentWord = -1;

	// shows continue btn when one of the answers is selected
	showContinueBtn = function () {
		$('input[name=answer]').one('change', function() {
			$('.continue-btn').removeClass('no-display');
			$('.continue-btn').addClass('display');
		});
	}

	// picks the word that should be shown when space is clicked
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
			showContinueBtn();
		}
	};

	// creates a list from the words in the sentence
	sentence.createWordList = function(quantifier, colour) {
		return quantifier.concat(" of the balls are ", colour, " in the picture.")
		.split(/[ ,]+/);

	};

	return sentence;
};
