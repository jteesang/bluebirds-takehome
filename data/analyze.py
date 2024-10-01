# Playground for understanding test data 

import csv, json, uuid
import pandas as pd


fname = 'testdata/bluebirds-testdata.csv' # local file path
# get headers - headers.json
with open(fname, 'r') as f:
    dict_reader = csv.DictReader(f)
    headers = dict_reader.fieldnames

    #print(json.dumps(headers))
    f.close()


## load into dataframe
df = pd.read_csv(fname)
# print(df.head())

# row_count = len(df)
# print(f'row_count before limit: {row_count}')

## limit df to 100 rows
# df = df.iloc[:100]

# rename cols to lowercase/underscore
df.columns = df.columns.str.lower().str.replace(' ', '_')
# print(df.columns)


company_ids_df = pd.read_csv('company_ids.csv')



# convert to csv to upload to db
person_df= df.merge(company_ids_df, on='company_linkedin_id', how='left')
person_df_info = person_df.iloc[:,0:10]
person_df_company = person_df.iloc[:,-1]
merge_person_df = pd.concat([person_df_info,person_df_company],axis=1).iloc[:367] # limited df earlier so it cut off at 100 people
# merge_person_df.to_csv('persons1.csv', sep=',') # write to csv


#unique_values = {col: df[col].unique() for col in df.columns}
## get unique values for particular column
# col = 'company_name'
# unique_values = df[col].unique()
# print(f'unique_values: {unique_values}')

company_df = df.iloc[:,10:21].drop_duplicates().iloc[:100] # read in only 100 companies
# company_df.to_csv('companies1.csv',sep=',')

# ignore
# melted_df = df.melt(var_name='Recent Hire Info', value_name='Value')
# print(melted_df.head())
# melted_df['Recent Hire Info'] = melted_df['Recent Hire Info'].fillna('')
# melted_df[['Hire', 'Type']] = melted_df['Recent Hire Info'].str.split(' - ', expand=True)
# recenthire_df = melted_df.pivot(index='Hire', columns='Type', values='Value').reset_index(drop=True)




recenthire_df = df.merge(company_ids_df, on='company_linkedin_id', how='left')
recenthire_info = pd.concat([recenthire_df.iloc[:,24:26], recenthire_df.iloc[:,47:93]],axis=1).drop_duplicates()
recenthire_company = recenthire_df.iloc[:,-1]
# print(list(merge_recenthire_df.columns))


#recenthire_personsdf = recenthire_df.iloc[:,50:91]
recenthire_info.columns = recenthire_info.columns.str.split('_-_', n=1).str[1]
recenthire_info = recenthire_info.dropna()
merge_recenthire_df = pd.concat([recenthire_info, recenthire_company], axis=1)[:367]
print(list(merge_recenthire_df.columns))

# rows= []
# num_repeats = 6  # Assuming we know there are 2 sets of repeated columns
# num_rows = len(recenthire_personsdf) // num_repeats

# for i in range(num_repeats):
#     for index, row in recenthire_personsdf.iterrows():
#         rows.append({
#             'first_name': row['first_name'],
#             'in_job_since': row['in_job_since'],
#             'last_name': row['last_name'],
#             'name': row['name'],
#             'persona_type': row['persona_type'],
#             'title': row['title'],
#             'url': row['url']
#         })

# # Create a new DataFrame from the consolidated data
# new_df = pd.DataFrame(rows)
# new_df = new_df.dropna()
# recenthire_info = pd.concat([recenthire_df.iloc[:,24:26], new_df],axis=1)

# merge_recenthire_df = pd.concat([recenthire_info, recenthire_company], axis=1)[:367]

#merge_recenthire_df.to_csv('recenthires.csv', sep=',')



# deal with job postings
jobposting_df = df.merge(company_ids_df, on='company_linkedin_id', how='left')
jobposting_df.columns = jobposting_df.columns.str.replace('_-_','_', regex=False)
jobposting_info = pd.concat([jobposting_df.iloc[:,34:46], jobposting_df.iloc[:,-1]],axis=1).drop_duplicates()
print(list(jobposting_info.columns))
jobposting_info.to_csv('jobpostings.csv', sep=',')


    

