$(document).ready(function(){
	spr.init();
});

var spr = {};

spr.getNextView = function() {
	if (this.currentTrial < this.exp.length) {
		this.view = initTrialView(this.exp[this.currentTrial]);
		this.currentTrial++;
	} else {
		this.view = initThankYouView();
	}
};

spr.init = function() {
	this.view = initIntroView();
	this.exp = exp.init();
	this.currentTrial = 0;
};