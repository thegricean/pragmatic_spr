$(document).ready(function(){
	spr.init();
});

var spr = {};

// view handler
spr.getNextView = function() {
	if (this.view.name === "introduction") {
		this.view = initInstructionsView();
	} else if ((this.view.name === "practice") && (this.currentPractice === this.practice.length)) {
		this.view = initBeginExpView();
	} else if (this.view.name === "practice") {
		this.view = initPauseView();
	} else if (this.currentPractice < this.practice.length) {
		this.view = initPracticeView();
		this.currentPractice++;
	} else if ((this.view.name === "trial") && (this.currentTrial === this.exp.data.length)) {
		this.view = initSubjInfoView(this.exp.addSubjInfo);
	} else if (this.view.name === "trial") {
		this.view = initPauseView(this.exp.data[this.currentTrial]);
	} else if (this.currentTrial < this.exp.data.length) {
		this.view = initTrialView(this.exp.data[this.currentTrial]);
		this.exp.addResponse(this.currentTrial, this.view.response, this.view.deltas);
		this.currentTrial++; 
	} else {
		this.view = initThanksView();
	}
};

spr.init = function() {
	this.exp = initExp();
	this.view = initIntroView();
	this.practice = practice.init();
	this.currentTrial = 40;
	this.currentPractice = 4;
};