var initIntroView = function() {
	var view = {};
	view.name = "introduction";
	view.template = $('#intro-templ').html();

	var rendered = Mustache.render(view.template, { type: "introduction" });
	$('#main').html(rendered);

	$('#start-exp-btn').on('click', function() {
		spr.getNextView();
	});

	return view;
};

var initInstructionsView = function() {
	var view = {};
	view.name = "instructions";
	var canvas = initCanvas();
	view.template = $('#instructions-templ').html();
	view.rendered = Mustache.render(view.template, { type: "practice" });
	$('#main').html(view.rendered);

	canvas.draw(4);

	$('#continue-btn').on('click', function() {
		spr.getNextView();
	});

	return view;
};

var initPracticeView = function() {
	var view = {};
	view.name = "practice";
	view.template = $('#practice-templ').html();


	var canvas = initCanvas();
	var sentence = initSentence();
	var sentenceList =  sentence.createWordList(
		spr.practice[spr.currentPractice]["quantifier"], 
		spr.practice[spr.currentPractice]["colour"]);

	var rendered = Mustache.render(view.template, {
		type: "practice",
		sentence: sentenceList });

	$('#main').html(rendered);

	canvas.draw(spr.practice[spr.currentPractice]["black"]);
	setTimeout(function() {
		canvas.hide();
		$('.instructions').removeClass('hidden');
		$('body').on('keyup', handleKeyUp);
		$('body').one('keyup', function(e) {
			if (e.which == 32) {
				$('.instructions').addClass('hidden');
			}
		});
	}, 1000);

	var handleKeyUp = function(e) {
		if (e.which == 32) {
			sentence.showNextWord();
		}
	};

	$('#continue-btn').on('click', function() {
		$('body').off('keyup', handleKeyUp);
		spr.getNextView();
	});

	return view;
};

var initBeginExpView = function() {
	var view = {};
	view.name = "begin";
	view.template = $('#begin-templ').html();

	var rendered = Mustache.render(view.template, {
		type: "begin" });

	$('#main').html(rendered);

	$('#continue-btn').on('click', function() {
		spr.getNextView();
	});

	return view;
};

var initTrialView = function(trialInfo) {
	var view = {};
	view.name = "trial";
	view.template = $('#trial-templ').html();

	var canvas = initCanvas();
	var sentence = initSentence();
	var sentenceList =  sentence.createWordList(
		spr.exp[spr.currentTrial]["quantifier"], 
		spr.exp[spr.currentTrial]["colour"]);

	var rendered = Mustache.render(view.template, {
		type: "trial",
		sentence: sentenceList });

	$('#main').html(rendered);

	canvas.draw(spr.exp[spr.currentTrial]["black"]);
	setTimeout(function() {
		canvas.hide();
		$('.instructions').removeClass('hidden');
		$('body').on('keyup', handleKeyUp);
		$('body').one('keyup', function(e) {
			if (e.which == 32) {
				$('.instructions').addClass('hidden');
			}
		});
	}, 1000);
	
	var handleKeyUp = function(e) {
		if (e.which == 32) {
			sentence.showNextWord();
		}
	};

	$('#continue-btn').on('click', function() {
		$('body').off('keyup', handleKeyUp);
		spr.getNextView();
	});

	return view;
};

var initSubjInfoView = function() {
	var view = {};
	view.name = "subjInfo";
	view.template = $('#subj-info-templ').html();
	view.rendered = Mustache.render(view.template, { type: "personalData" });
	$('#main').html(view.rendered);

	$('#continue-btn').on('click', function() {
		spr.getNextView();
	});

	return view;
};

var initThanksView = function() {
	var view = {};
	view.name = "thankYou";
	view.template = $('#thanks-templ').html();
	view.rendered = Mustache.render(view.template, { type: "thankYou" });
	$('#main').html(view.rendered);

	return view;
};
