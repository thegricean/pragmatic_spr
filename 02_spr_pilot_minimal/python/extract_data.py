import argparse
import csv
import json

# open the file given
parser = argparse.ArgumentParser()
parser.add_argument('file', type = argparse.FileType('r', encoding="utf-8"))
args = parser.parse_args()

header = []
body = []
worker_ids = []
assignment_ids = []
raw_results = []

# separate header from results
for line in args.file:
	if not header:
		header = line.strip().split('\t')
	else:
		body.append(line.strip().split('\t'))

# take workerid, assignmentid and results
for hit in range(0, len(body)):
	worker_ids.append(body[hit][header.index("\"assignmentid\"")])
	assignment_ids.append(body[hit][header.index("\"workerid\"")])
	# raw_results is a list of strings
	raw_results.append(body[hit][header.index("\"Answer.results\"")])

# func that takes a list of string items and strips the extra quotes
# returns a list of valid jsons
def remove_extra_quotes(li):
	valid_jsons = []

	for i in range(0, len(li)):
		new_s = ""

		for j in range(1, len(li[i])-1):
			if li[i][j] == "\"" and li[i][j+1] == "\"":
				continue
			else:
				new_s = new_s + li[i][j]

		valid_jsons.append(new_s)

	return valid_jsons


# creates a list of dictionaries with the responses
def create_li_of_dicts():	
	dicts = []
	li = remove_extra_quotes(raw_results)

	for i in li:
		dicts.append(json.loads(i))

	return dicts

res = create_li_of_dicts()

# crates csv
with open('results.csv', 'w', encoding="utf-8") as f:
	w = csv.writer(f)
	# for each hit
	for hit in range(0, len(res)):
		# for each trial
		for trial in res[hit]['results']:
			w.writerow([
				trial['all'],
				trial['black'],
				trial['quantifier'],
				trial['colour'],
				trial['response'] if 'response' in trial else '',
				trial['readingTimes'] if 'readingTimes' in trial else '',
				])
