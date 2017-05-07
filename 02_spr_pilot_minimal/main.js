$(document).ready(function(){
	spr.init();
});

var spr = {};

spr.nextView = function() {

};

spr.init = function() {
	/*$.get("templates/introduction.mst", function(templ) {
		var rendered = Mustache.render(templ, { type: "introduction" });
		$('main').html(rendered);
		spr.startExperiment();
	}, 'text');*/

	var template = $('#intro-templ').html();
	var rendered = Mustache.render(template, { type: "introduction" });
	$('#main').html(rendered);
	this.startExperiment();
};

spr.startExperiment = function() {
	$('#start-exp-btn').on('click', function() {
		/*$.get("templates/trial.mst", function(templ) {
			var rendered = Mustache.render(templ, { type: "experiment" });
			$('main').html(rendered);

			var currentTrial = 0;
			var anExp = exp.init();

			var black = anExp[currentTrial]["black"];	
			var white = anExp[currentTrial]["all"] - anExp[currentTrial]["black"];
			var sentence = anExp[currentTrial]["quantifier"] + anExp[currentTrial].sentence.part1
						   + anExp[currentTrial][colour] + anExp[currentTrial].sentence.part2; 

			picture.display();

		}, 'text');*/
		var template = $('#trial-templ').html();
		var rendered = Mustache.render(template, { type: "trial" });
		$('#main').html(rendered);

		picture.display();
	});
};