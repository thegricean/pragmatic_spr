$(document).ready(function(){
	spr.init();
});

var spr = {};

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
	} else if ((this.view.name === "trial") && (this.currentTrial === this.exp.length)) {
		this.view = initSubjInfoView();
	} else if (this.view.name === "trial") {
		this.view = initPauseView(this.exp[this.currentTrial]);
	} else if (this.currentTrial < this.exp.length) {
		this.view = initTrialView(this.exp[this.currentTrial]);
		this.currentTrial++; 
	} else {
		this.view = initThanksView();
	}
};

spr.init = function() {
	this.view = initIntroView();
	this.exp = initExp();
	this.practice = practice.init();
	this.currentTrial = 0;
	this.currentPractice = 5;
};