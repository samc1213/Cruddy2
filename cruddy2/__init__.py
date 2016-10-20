import os
import psycopg2
import urlparse
from flask import Flask, render_template, request, redirect, url_for
from model.User import User
from model.Thing import Thing
from model.DBSessionManager import DBSessionManager
from api import *

app = Flask(__name__)
api = api()

@app.route('/')
def index():
    sessionManager = DBSessionManager()
    user = User('Sam', 'Cohen')
    sessionManager.CommitToSession(user)
    return render_template('index.html')

@app.route('/creatething')
def createThing():

    return render_template('creatething.html')

@app.route('/submittedthing', methods=['POST'])
def submittedThing():
    name=request.form['thingname']
    api.createThing(name)
    return name


@app.route('/databaseurl')
def dburl():
    print 'ah!'

    return 'dburl'
