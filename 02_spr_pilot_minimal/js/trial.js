/*var picture = {
	hide: function() {
/*		$('#canvas').addClass("hidden");
*/		/*instructions.show();
		sentence.spaceClicked();*/
/*	},
	display: function(ms) {
		setTimeout(picture.hide, ms);
	}
};*/

var initImage = function(ms) {
	image = {};
	hide = function() {
		$('#canvas').addClass("hidden");
	};
	image.display = function(ms) {
		setTimeout(hide, ms);
	};

	return image;
};
/*
var instructions = {
	show: function() {
		$('.instructions').removeClass('hidden');
	},
	hide: function() {
		$('.instructions').addClass('hidden');
	}
};*/

var initSentence = function() {
	var sentence = {};
	var currentWord = -1;

	var createElem = function(text) {
		var element = '<span class="spr-word">'.concat(text, '</span>');
		var containter = $('#sentence-cont');
		$(element).appendTo($('#sentence-cont'));
	};


	sentence.pickTargetWord = function() {
		var words = $('.spr-word').toArray();

		currentWord++;
		if (currentWord < words.length){
			$(words[currentWord]).addClass('visible');
			$(words[currentWord -1]).removeClass('visible');
		}
		else {
			$(words[currentWord -1]).removeClass('visible');
			question.show();
		}
	};

	var createSentence = function(quantifier, colour) {
		var wordList = createWordList(quantifier, colour);
		for (var i = 0; i < wordList.length; i++) {
			wordList[i]
		}
	};

	var createWordList = function(quantifier, colour) {
		// a list of the sentence's words
		var sentence = (
			quantifier.concat(" of the balls are ", colour, " in the picture."))
		.split(/[ ,]+/);

		return sentence;
	};

	sentence.appendDOMElems = function(quantifier, colour) {
		var arr = createWordList(quantifier, colour);
		// crates a dom element for every item from that list
		for (var i = 0; i < arr.length; i++) {
			createElem(arr[i]);
		};
	};

	return sentence;
};

/**/


/*var sentence = {
	currentWord: -1,
	showWord: function() {
		instructions.hide();
		this.currentWord++;
		var words = $('.spr-word').toArray();
		if (this.currentWord < words.length){
			$(words[this.currentWord]).addClass('visible');
			$(words[this.currentWord -1]).removeClass('visible');
		}
		else {
			$(words[this.currentWord -1]).removeClass('visible');
			question.show();
		}
	}
};*/

var question = {
	show: function() {
		$('.question').removeClass('no-display');
		nextTrial.showContinueBtn();
		nextTrial.go();
	}
};

var nextTrial = {
	showContinueBtn: function () {
		$('input[name=answer]').one('change', function() {
			$('.continue-btn').removeClass('no-display');
		});
	},
	go: function() {
		$('.continue-btn').on('click', function() {
			$.get("templates/trial.html", function(templ) {
				var rendered = Mustache.render(templ, { type: "experiment" });
				$('main').html(rendered);

				picture.display();

			}, 'html');
		})
	}
};
