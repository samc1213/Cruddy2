import os
import psycopg2
import urlparse
from flask import Flask, render_template, request, redirect, url_for
from model.Model import *
from model.DBSessionManager import DBSessionManager
from api import *

app = Flask(__name__)
api = api()

@app.route('/')
def index():
    sessionManager = DBSessionManager()
    user = User('Sam', 'Cohen')
    sessionManager.CommitToSession([user])
    return render_template('index.html')

@app.route('/creatething')
def createThing():
    return render_template('creatething.html')

@app.route('/submittedthing', methods=['POST'])
def submittedThing():
    thingname=request.form['thingname']
    thingattributename=request.form['thingattributename']
    thingattributetypeid = request.form['thingattributetypeid']
    api.createThing(thingname, [{'name': thingattributename, 'typeid': thingattributetypeid}])
    return thingname


@app.route('/databaseurl')
def dburl():
    print 'ah!'

    return 'dburl'
