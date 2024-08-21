import json

j = None
with open('sample_response.json', 'r') as f:
    j = json.loads(f.read())

models_responses = j[0]["results"]["predictions"][0]["models"] # dict of models

l = []
for k in models_responses:
    # there is potential for duplicates of emotions* TODO: fix later
    l.extend(models_responses[k]["grouped_predictions"][0]["predictions"][0]["emotions"]) # emotions has more than 1 time-span for predictions.

sorted_l = sorted(l, key=lambda x: x["score"], reverse=True)

print(json.dumps(sorted_l[:3], indent=4))