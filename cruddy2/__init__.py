import os
import psycopg2
import urlparse
from flask import Flask, render_template, request, redirect, url_for
from model.User import User
from model.DBSessionManager import DBSessionManager

app = Flask(__name__)


@app.route('/')
def index():
    sessionManager = DBSessionManager()
    user = User('Sam', 'Cohen')
    sessionManager.CommitToSession(user)
    return render_template('index.html')


@app.route('/databaseurl')
def dburl():
    print 'ah!'

    return 'dburl'
