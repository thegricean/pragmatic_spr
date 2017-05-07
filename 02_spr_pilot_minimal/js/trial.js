var picture = {
	hide: function() {
		$('#canvas').addClass("hidden");
		instructions.show();
		sentence.spaceClicked();
	},
	display: function(ms) {
		canvas.draw(4, 500, 350);
		setTimeout(picture.hide, 1000);
	}
};

var instructions = {
	show: function() {
		$('.instructions').removeClass('hidden');
	},
	hide: function() {
		$('.instructions').addClass('hidden');
	}
};

var sentence = {
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
	},
	spaceClicked: function() {
		$('body').on("keyup", function(e) {
			if (e.which == 32) {
				sentence.showWord();
			}
		});
	}
};

var question = {
	show: function() {
		$('.question').removeClass('no-display');
		console.log('question displayed!');
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
