$(document).ready(function(){
	spr.init();
});

var spr = {};

spr.getNextView = function() {
	if (this.view.name === "introduction") {
		this.view = initInstructionsView();
	} else if (this.view.name === "instructions") {
		this.view = initPracticeView();
	} else if (this.currentTrial < this.exp.length) {
		this.view = initTrialView(this.exp[this.currentTrial]);
		this.currentTrial++;
	} else if (this.view.name == "trial") {
		this.view = initSubjInfoView();
	} else {
		this.view = initThanksView();
	}
};

spr.init = function() {
	this.view = initIntroView();
	this.exp = exp.init();
	this.currentTrial = 0;
};