var initIntroView = function() {
	var view = {};
	view.name = "introduction";
	view.template = $('#intro-templ').html();

	var rendered = Mustache.render(view["template"], { type: "introduction" });
	$('#main').html(rendered);

	$('#start-exp-btn').on('click', function() {
		spr.getNextView();
	});

	return view;
};

/*var initPracticeView = function() {
	var view = {};
	view.name = "practice";
	view.template = $('#practice-templ').html();
	view.rendered = Mustache.render(view["template"], { type: "practice" });
	$('#main').html(view.rendered);
};*/

var initTrialView = function(trialInfo) {
	var view = {};
	view.name = "trial";
	view.template = $('#trial-templ').html();

	var rendered = Mustache.render(view["template"], { type: "trial" });
	$('#main').html(rendered);

	var canvas = initCanvas();
	var image =  initImage();
	var sentence = initSentence();
	sentence.appendDOMElems(
		spr.exp[spr.currentTrial]["quantifier"], 
		spr.exp[spr.currentTrial]["colour"]
		);
	console.log(spr.exp[spr.currentTrial]);
	image.display(1000);
	canvas.draw(spr.exp[spr.currentTrial]["black"]);
	

	var handleKeyUp = function(e) {
		if (e.which == 32) {
			sentence.pickTargetWord();
		}
	};



	$('body').on('keyup', handleKeyUp);

	$('#continue-btn').on('click', function() {
		$('body').off('keyup', handleKeyUp);
		spr.getNextView();
	});

	return view;
};

/*var initPersonalDataView = function() {
	var view = {};
	view.name = "personalData";
	view.template = $('#personal-data-templ').html();
	view.rendered = Mustache.render(view["template"], { type: "personalData" });
	$('#main').html(view.rendered);
};*/

/*var initThankYouView = function() {
	var view = {};
	view.name = "thankYou";
	view.template = $('#thank-you-templ').html();
	view.rendered = Mustache.render(view["template"], { type: "thankYou" });
	$('#main').html(view.rendered);
};
*/