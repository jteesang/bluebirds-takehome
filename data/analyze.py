# Playground for understanding test data 

import csv, json
# get headers - headers.json
with open('testdata/bluebirds-testdata.csv', 'r') as f:
    dict_reader = csv.DictReader(f)
    headers = dict_reader.fieldnames

    print(json.dumps(headers))
    f.close()
    

