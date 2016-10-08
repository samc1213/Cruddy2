import os
import psycopg2
import urlparse
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
print os.environ['DATABASE_URL']
try:

    urlparse.uses_netloc.append("postgres")
    print os.environ["DATABASE_URL"]
    url = urlparse.urlparse(os.environ["DATABASE_URL"])
    print os.environ["DATABASE_URL"]
    conn = psycopg2.connect(
        database=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
    )
except:
    print "Error connecting to db"

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/databaseurl')
def dburl():
  return 'dburl'

if __name__ == '__main__':
  port = int(os.environ.get('PORT',5000))
  app.run(host='0.0.0.0', port=port)
