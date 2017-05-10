var initSentence = function() {
	var sentence = {};
	var currentWord = -1;

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
			nextTrial.showContinueBtn();
		}
	};

	sentence.createWordList = function(quantifier, colour) {
		return quantifier.concat(" of the balls are ", colour, " in the picture.")
		.split(/[ ,]+/);

	};

	return sentence;
};

var nextTrial = {
	showContinueBtn: function () {
		$('input[name=answer]').one('change', function() {
			$('.continue-btn').removeClass('no-display');
			$('.continue-btn').addClass('display');
		});
	}
};
