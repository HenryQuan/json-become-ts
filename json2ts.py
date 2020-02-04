import sys, json

file_path = sys.argv[1]

try:
    with open(file_path) as json_file:
        json_object = json.load(json_file)
        for every in json_object:
            print(every, type(every))
except (FileNotFoundError, ValueError):
    exit(1)

