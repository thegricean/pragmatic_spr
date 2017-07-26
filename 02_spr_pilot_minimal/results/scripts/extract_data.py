import argparse
import csv
import json


def main(raw_data):

	responses, assignment_ids = prepare_data(raw_data)
	create_csv(responses, assignment_ids)


def prepare_data(raw_data):
	"""
	Takes mturk's file to prepare the data for csv
	Returns a list with responses and a list with assignment ids
	"""
	responses = []

	def get_data():
		"""
		Returns one list with the assignment ids and another one with the responses

		"""
		assignment_ids = []
		raw_results = []
		header = []
		body = []

		for line in raw_data:
			if not header:
				header = line.strip().split('\t')
			else:
				body.append(line.strip().split('\t'))

		for hit in range(0, len(body)):
			assignment_ids.append(body[hit][header.index("\"assignmentid\"")])
			# raw_results is a list of strings
			# each string contains the results of one assignment
			raw_results.append(body[hit][header.index("\"Answer.results\"")])

		return assignment_ids, raw_results

	def remove_extra_quotes(li):
		"""
		Takes a list of string items and strips the extra quotes
		Returns a list of valid jsons
		"""
		valid_jsons = []

		for i in range(0, len(li)):
			new_s = ""
			quotes_counter = 0
			skip = False

			for j in range(0, len(li[i])):
				if skip:
					skip = False
					continue

				if j < len(li[i]) -1 and li[i][j] == "\"" and li[i][j+1] == "\"":
					new_s += "\""
					skip = True
				else:
					new_s += li[i][j]

			valid_jsons.append(new_s[1:-1])

		return valid_jsons

	assignment_ids, raw_results = get_data()
	results = remove_extra_quotes(raw_results)

	for result in results:
		responses.append(json.loads(result))

	return responses, assignment_ids


def create_csv(li, assignment_ids):
	"""
	Takes a list with data and a list with assignment ids
	Creates a results.csv with the results
	"""

	with open('results.csv', 'w', encoding="utf-8") as f:
		w = csv.writer(f)

		"""
		Headers
		"""
		w.writerow(['assignment_id', 'subject', 'trial_number', 'white_balls', 'black_balls', 'quantifier', 'colour',
			'QUANT', 'of', 'the1', 'balls', 'are', 'TGW', 'IN', 'the2', 'picture',
			'answer', 'answer_time',
			'age', 'gender', 'languages', 'education', 'comments'])

		# for each assignment
		for assignment in range(0, len(li)):

			# for each trial
			for trial in li[assignment]['results']:
				assignment_id = assignment_ids[assignment][1:-1]
				age = li[assignment]['subjectInfo']['age']
				gender = li[assignment]['subjectInfo']['gender']
				languages = li[assignment]['subjectInfo']['languages']
				education = li[assignment]['subjectInfo']['education']
				comments = li[assignment]['subjectInfo']['comments']

				if (trial['colour'] == "white"):
					w.writerow([
						assignment_id,
						assignment + 1,
						trial['trialNumber'],
						trial['TCBalls'],
						trial['OCBalls'],
						trial['quantifier'],
						trial['colour'],
						trial['readingTimes'][0],
						trial['readingTimes'][1],
						trial['readingTimes'][2],
						trial['readingTimes'][3],
						trial['readingTimes'][4],
						trial['readingTimes'][5],
						trial['readingTimes'][6],
						trial['readingTimes'][7],
						trial['readingTimes'][8],
						trial['response'][0],
						trial['response'][1],
						age,
						gender,
						languages,
						education,
						comments
						])
				else:
					w.writerow([
						assignment_id,
						assignment + 1,
						trial['trialNumber'],
						trial['OCBalls'],
						trial['TCBalls'],
						trial['quantifier'],
						trial['colour'],
						trial['readingTimes'][0],
						trial['readingTimes'][1],
						trial['readingTimes'][2],
						trial['readingTimes'][3],
						trial['readingTimes'][4],
						trial['readingTimes'][5],
						trial['readingTimes'][6],
						trial['readingTimes'][7],
						trial['readingTimes'][8],
						trial['response'][0],
						trial['response'][1],
						age,
						gender,
						languages,
						education,
						comments
						])


"""
The cli
"""
if __name__ == '__main__':
	parser = argparse.ArgumentParser(description=(
		'turns mturk\'s data into csv'
		))

	parser.add_argument('file',
		help = 'path to mturk\'s output file',
		type = argparse.FileType('r', encoding="utf-8"))

	args = parser.parse_args()

	main(args.file)