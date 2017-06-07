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
	}, 2000);

	var handleKeyUp = function(e) {
		if (e.which == 32) {
			sentence.showNextWord();
		}
	};

	$('input[name=answer]').on('change', function() {
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
	view.deltas = [];
	view.response = [];

	// reading times
	var rt = [];

	var canvas = initCanvas();
	var sentence = initSentence();
	var sentenceList =  sentence.createWordList(
		trialInfo["quantifier"], 
		trialInfo["colour"]);
	var rtCount = sentenceList.length;

	var rendered = Mustache.render(view.template, {
		type: "trial",
		sentence: sentenceList });

	$('#main').html(rendered);

	canvas.draw(trialInfo["black"]);

	// after 2000 ms the canvas is hidden and the subject can start reading
	setTimeout(function() {
		canvas.hide();
		$('.instructions').removeClass('hidden');
		$('body').on('keyup', handleKeyUp);
		$('body').one('keyup', function(e) {
			if (e.which == 32) {
				$('.instructions').addClass('hidden');
			}
		});
	}, 2000);
	
	// when space bar is pressed, next word shows and the rt is saved
	var handleKeyUp = function(e) {
		if (e.which == 32) {
			sentence.showNextWord();
			collectReadingTimes();
		}
	};

	// func that collects rt in ms since 1 Jan 1970 
	var collectReadingTimes = function() {
		if (rtCount >= 0) {
			rt.push(Date.now());
		}
		rtCount--;
	};

	// func that returns a list of rt in ms of each word
	var getDeltas = function() {
		var deltas = [];

		for (var i = 0; i < rt.length - 1; i++) {
			view.deltas[i] = rt[i+1] - rt[i];
		};

		return deltas;
	};

	// when the subject answers, the rt deltas and response are
	// pushed back to the exp model and next view is shown
	$('input[name=answer]').on('change', function() {
		view.response.push($('input[name=answer]:checked').val());
		view.response.push(Date.now() - rt[rt.length - 1]);
		view.deltas = getDeltas();
		$('body').off('keyup', handleKeyUp);
		spr.getNextView();
	});

	return view;
};

var initPauseView = function(trialInfo) {
	var view = {};
	view.name = "pause";
	view.template = $('#pause-templ').html();

	var fillProgressBar = function(elem){
		var width = $('.progress-bar-container').width();
		var filled = ((width / spr.exp.data.length) * spr.currentTrial);
		return elem.width(filled);
	};

	view.rendered = Mustache.render(view.template, { type: "pause" });

	$('#main').html(view.rendered);

	if (spr.currentTrial !== 0) {
		fillProgressBar($('.filled'));
	} else {
		$('aside').addClass('no-display');
	}

	$('#continue-btn').on('click', function() {
		spr.getNextView();
	});


	return view;
};

var initSubjInfoView = function(sendData) {
	var view = {};
	
	view.name = "subjInfo";
	view.template = $('#subj-info-templ').html();
	view.rendered = Mustache.render(view.template, { type: "personalData" });
	$('#main').html(view.rendered);


	$('#continue-btn').on('click', function() {
		sendData({
			age: $('#age').val(),
			gender: $('#gender').val(),
			education: $('#education').val(),
			languages: $('#languages').val(),
			comments: $('#comments').val()
		});
		spr.getNextView();
	});

	return view;
};

var initThanksView = function() {
	var view = {};

	// func that returns the assignmentId that must be sent with the results
	var getAssignmentId = function() {
		var url = window.location.search.substring(1);
		var qArray = url.split('&');
		for (var i = 0; i < qArray.length; i++) {
			var pArr = qArray[i].split('=');
			if (pArr[0] === "assignmentId") {
				return pArr[1];
			}
		}
	};

	view.name = "thankYou";
	view.template = $('#thanks-templ').html();
	view.rendered = Mustache.render(view.template, {
		type: "thankYou",
		assignmentId: getAssignmentId(),
		results: spr.exp.getJSON()
	});
	$('#main').html(view.rendered);

	return view;
};
