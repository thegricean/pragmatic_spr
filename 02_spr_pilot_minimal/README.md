Project Structure
=================

Abbreviations

* TC - target colour
* OC - other colour

---

/js/* -- the code follows the MVC pattern.


* **main.js** - the controller - initialises the experiment when the jquery's ready event is fired, determines what view should be rendered, gives the view the trial info (number of TC balls, TC and quantifier) and sends the responses (reading times and answer) to the experiment object.

* **canvas.js** - the code to create pictures with 10 balls. The picture is a HTML canvas. The balls are positioned by generating random coordinates. For each ball the code checks whether that its coordinates are distant enough from the already generated coordinates so that there are no ball overlaps.

		initCanvas() creates a canvas object that has two public methods:
			1) canvas.draw - takes two arguments, the number of TC balls and the TC, and creates the picture
			2) canvas.hide - hides the picture


* **practice.js** - creates the practice trials. The practice trials are predefines - each subject sees the same picture - quantifier - TC combination.

		practice.init() - creates the practice trial.


* **exp.js** - generates the experiment's trials and collects the responses.

		initExp() creates and experiment object that has the following public methods:
			1) exp.data	- creates the picture-quantifier-colour combinations and returns them in random order. Each picture type is combined once with each quantifier. The colours are assigned randomly.
			2) exp.addResponse - collects the subject's reading times and response
			3) exp.addSubjInfo - collects the additional data (age, comments, education, gender)
			4) exp.getJSON() converts the data into JSON object

* **view.js** - creates the views.

---

* **index.html** - the html of the experiment is here. It contains [mustache templates](https://github.com/janl/mustache.js) which are used for rendering the views.

---

* **/css/style.css** - some styles that make the website pretty (fonts, sizes, centering, etc.)

---

* **/images/*** - contains the images that are displayed on the website (for example, the logo).

---

* **results/data/*** - contains the results from the experiment in csv format

* **results/scripts/extract_data.py** - turns the mturk's results into csv. The output file is results.csv

	python extract_data.py [filename]

This script creates csv only when the results are downloaded using [the submiterator](https://github.com/feste/Submiterator) because in that case the results come with extra quotes (and are not in json format).

* **results/scripts/json_to_csv.py** - turns json data into csv

* **results/rscripts/*** - contains R scripts for plotting and analysing the data
