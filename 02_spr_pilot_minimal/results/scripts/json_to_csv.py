import json
import csv

with open("data/test_results.json") as f:
	data = json.load(f)["results"]

with open("data/test_results.csv", "w") as f:
	writer = csv.writer(f)

	writer.writerow(["white_balls", "black_balls", "quantifier", "colour"])

	for line in data:

		if (line["colour"] == "white"):
			writer.writerow([
				line["TCBalls"],
				line["OCBalls"],
				line["quantifier"],
				line["colour"]])
		else:
			writer.writerow([
				line["OCBalls"],
				line["TCBalls"],
				line["quantifier"],
				line["colour"]])
