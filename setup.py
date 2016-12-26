import os
import csv

with open('.env') as envfile:
    rows = envfile.read().split('\n')
    for row in rows:
        try:
            rowsplit = row.split('=')
            env_var = rowsplit[0]
            env_value = rowsplit[1]
            print rowsplit
            os.environ[env_var] = env_value
        except:
            continue

os.system('python app.py')
